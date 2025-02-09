export async function onRequest(context) {
  const { request, env } = context; // 使用 context.env 访问环境变量

  // 处理 CORS 预检请求
  if (request.method === "OPTIONS") {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
    return new Response(null, { status: 204, headers });
  }

  // 读取 DOH 服务器列表，使用 context.env 代替 process.env
  const dohServersEnv = env.DOH_SERVERS || env.DOH_SERVER || "https://dns.google/dns-query";
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

      fetchPromises = dohServers.map(server => {
        const serverUrl = new URL(server);
        serverUrl.search = url.search;
        return fetch(serverUrl.toString(), {
          method: "GET",
          headers: { "Accept": "application/dns-message" }
        }).then(response => response.ok ? response : Promise.reject(new Error(`服务器 ${server} 返回状态 ${response.status}`)));
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

      fetchPromises = dohServers.map(server => {
        return fetch(server, {
          method: "POST",
          headers: {
            "Content-Type": "application/dns-message",
            "Accept": "application/dns-message"
          },
          body,
        }).then(response => response.ok ? response : Promise.reject(new Error(`服务器 ${server} 返回状态 ${response.status}`)));
      });

    } else {
      return new Response(
        JSON.stringify({ error: "不支持的方法" }),
        { status: 405, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const fastestResponse = await Promise.any(fetchPromises);
    const responseBody = await fastestResponse.arrayBuffer();

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/dns-message");
    responseHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(responseBody, { status: 200, headers: responseHeaders });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "服务器内部错误", details: err.toString() }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
}
