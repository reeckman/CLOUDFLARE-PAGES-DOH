# Detailed Steps Instructions

## 1. Fork to Your Own Repository
First, you need to create your own copy of the original project. The steps are as follows:
- Visit the original project’s GitHub repository page.
- Click the "Fork" button in the upper-right corner to fork the repository to your own GitHub account.
- After forking, you will see the repository under your GitHub account.

## 2. Link Cloudflare Pages to GitHub for Deployment
Next, you need to link your GitHub repository with Cloudflare Pages and deploy the project. The steps are as follows:
- Log in to your Cloudflare account and go to the Cloudflare Pages section.
- Click the "Create a Project" button in the upper-right corner.
- In the pop-up window, select GitHub as the version control service.
- Authorize Cloudflare to access your GitHub repositories and select the repository you forked earlier.
- Follow the prompts to complete the configuration and choose the deployment settings. Cloudflare Pages will automatically read your repository, build, and deploy it.

## 3. Set the DOH_SERVERS Variable
After Cloudflare Pages has deployed the project, you need to set the DOH_SERVERS environment variable. The steps are as follows:
- In the Cloudflare Pages dashboard, find your project and click into the project settings page.
- Select the "Environment Variables" section.
- Create a new environment variable with the name `DOH_SERVERS` and set its value to the address of your own DoH (DNS over HTTPS) server. You can use multiple DoH servers separated by commas. For example:
```bash
  https://dns.google/dns-query, https://cloudflare-dns.com/dns-query, https://dns.quad9.net/dns-query
```
- After setting this, the system will automatically poll these DoH servers and prioritize using the fastest responding server.

## 4. Use Cloudflare Pages Domain or Custom Domain + /dns-query Path
Once the deployment is complete, you can use the default domain provided by Cloudflare Pages or your own custom domain for DNS queries. Usage is as follows:
- Default domain: `https://your-cloudflare-pages-name.pages.dev/dns-query`
- Custom domain: If your custom domain is `yourdomain.com`, then the access method would be `https://yourdomain.com/dns-query`
- You can append the `/dns-query` path to the domain to perform DNS queries.

---

# Disclaimer:

1. All operations and configurations described in this tutorial are for personal or organizational reference only. Users assume all risks and responsibilities related to the process.
2. When using DoH (DNS over HTTPS) services, ensure that the DoH servers you choose are secure and trustworthy, and understand their privacy policies. This tutorial does not guarantee the stability, security, or privacy of any third-party DoH servers.
3. The deployment steps provided are based on the current Cloudflare Pages and GitHub API information. These steps may change with software updates or platform adjustments, so users need to adjust based on actual circumstances.
4. If you choose to use a custom domain, ensure that you comply with domain registrar and relevant legal regulations, avoiding illegal uses.
5. The project and its usage should not be applied for any illegal or malicious purposes. Users must comply with local internet laws and regulations to ensure the operations are legal and compliant.
6. This tutorial and its related content are for technical reference only. The authors and related parties are not responsible for any direct or indirect losses arising from its use.
7. This tutorial may contain links to third-party websites or services. Users should assess and bear any risks involved.
8. All content in this tutorial is provided "as is," and the authors do not provide any express or implied guarantees regarding the accuracy, completeness, or applicability of the content.
