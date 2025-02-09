/**
 * Cloudflare Pages Function: DOH 代理服务（多服务器版本）
 *
 * 支持：
 *  - GET：要求 URL 中包含 "dns" 参数（base64url 编码后的 DNS 查询报文）
 *  - POST：要求 Content-Type 为 "application/dns-message"，请求体为二进制 DNS 查询报文
 *  - OPTIONS：用于 CORS 预检请求
 *
 * 上游 DOH 服务器列表由环境变量 DOH_SERVERS 指定（多个服务器用逗号分隔），
 * 若未配置则回退到 DOH_SERVER 或默认使用 Google 的 DOH 服务。
 *
 * 实现原理：对所有配置的 DOH 服务器并行发起相同请求，选取最快响应且状态码 OK 的服务器返回结果。
 */

export async function onRequest(context) {
  const { request } = context;

  // 处理 CORS 预检请求
  if (request.method === "OPTIONS") {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
    return new Response(null, { status: 204, headers });
  }

  // 从环境变量中读取 DOH 服务器列表：
  // 优先使用 DOH_SERVERS（多个服务器用逗号分隔），否则回退到 DOH_SERVER 或默认值
  const dohServersEnv = process.env.DOH_SERVERS || process.env.DOH_SERVER || "https://dns.google/dns-query";
  const dohServers = dohServersEnv.split(",").map(s => s.trim()).filter(Boolean);

  try {
    let fetchPromises = [];

    if (request.method === "GET") {
      const url = new URL(request.url);
      if (!url.searchParams.has("dns")) {
        return new Response(
          JSON.stringify({ error: "缺少 'dns' 参数" }),
          { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }

      // 针对每个 DOH 服务器，构造新的请求 URL（附带原始查询字符串）并发起 GET 请求
      fetchPromises = dohServers.map(server => {
        const serverUrl = new URL(server);
        serverUrl.search = url.search;
        return fetch(serverUrl.toString(), {
          method: "GET",
          headers: { "Accept": "application/dns-message" }
        }).then(response => {
          if (!response.ok) {
            return Promise.reject(new Error(`服务器 ${server} 返回状态 ${response.status}`));
          }
          return response;
        });
      });

    } else if (request.method === "POST") {
      const contentType = request.headers.get("content-type") || "";
      if (!contentType.includes("application/dns-message")) {
        return new Response(
          JSON.stringify({ error: "无效的 Content-Type，必须为 application/dns-message" }),
          { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }
      const body = await request.arrayBuffer();

      // 针对每个 DOH 服务器，发起 POST 请求
      fetchPromises = dohServers.map(server => {
        return fetch(server, {
          method: "POST",
          headers: {
            "Content-Type": "application/dns-message",
            "Accept": "application/dns-message"
          },
          body,
        }).then(response => {
          if (!response.ok) {
            return Promise.reject(new Error(`服务器 ${server} 返回状态 ${response.status}`));
          }
          return response;
        });
      });

    } else {
      return new Response(
        JSON.stringify({ error: "不支持的方法" }),
        { status: 405, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // 并行等待，选择第一个成功响应的服务器
    const fastestResponse = await Promise.any(fetchPromises);
    const responseBody = await fastestResponse.arrayBuffer();

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/dns-message");
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "Content-Type");

    return new Response(responseBody, { status: 200, headers: responseHeaders });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "服务器内部错误", details: err.toString() }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
}
