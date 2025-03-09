   # 🚀 Cloudflare Encrypted DNS PAGES Setup Guide 🚀

## ⚠ Disclaimer ⚠

🔹 **This project is an open-source initiative designed to build a DNS over HTTPS (DoH) forwarding service using Cloudflare's PAGES functionality.**

🔹 **The goal is to enhance network privacy and security, providing users with a more secure and privacy-protected DNS resolution service.**

📌 However, users must acknowledge the following disclaimers:

1️⃣ **This project is strictly for technical research and personal use.** It must not be used for any activities that violate laws, regulations, or infringe on others' rights.

2️⃣ **This project utilizes Cloudflare's Worker functionality as infrastructure but is NOT officially maintained or endorsed by Cloudflare.** Cloudflare bears no responsibility for any damages caused by its use.

3️⃣ **The authors and contributors disclaim liability for any issues arising from this project,** including but not limited to:
   - Data loss
   - Service interruptions
   - Network security vulnerabilities

4️⃣ **Users must comply with all applicable internet-related laws and regulations** and take full responsibility for their actions.

5️⃣ **If any individual or organization misuses this project to harm Cloudflare’s interests or violate its terms of service,** the authors and contributors bear no responsibility. All legal liabilities rest solely on the perpetrators.

📢 **Users should carefully read and understand this disclaimer before using the project. By proceeding, you agree to abide by all its provisions.**

---

# 📖 User Guide: Creating an Encrypted DNS Worker on Cloudflare

## 1️⃣ Fork to Your Own Repository

✅ **Visit** the original project’s GitHub repository page.  
✅ **Click** the `Fork` button in the upper-right corner to fork the repository to your own GitHub account.  
✅ After forking, you will see the repository under your GitHub account.

---

## 2️⃣ Link Cloudflare Pages to GitHub for Deployment

✅ **Log in** to your Cloudflare account and go to the Cloudflare Pages section.  
✅ **Click** `Create a Project` in the upper-right corner.  
✅ **Select** GitHub as the version control service.  
✅ **Authorize** Cloudflare to access your GitHub repositories and select the repository you forked.  
✅ **Follow** the prompts to complete the configuration. Cloudflare Pages will automatically read your repository, build, and deploy it.

---

## 3️⃣ Set the DOH_SERVERS Variable

✅ **In Cloudflare Pages dashboard**, find your project and go to project settings.  
✅ **Select** `Environment Variables`.  
✅ **Create** a new variable named `DOH_SERVERS` and set its value to the DoH server addresses. Example:
```bash
  https://dns.google/dns-query, https://cloudflare-dns.com/dns-query, https://dns.quad9.net/dns-query
```
✅ **Save** the settings. The system will automatically poll the DoH servers and use the fastest responding one.

---

## 4️⃣ Use Cloudflare Pages Domain or Custom Domain + /dns-query Path

✅ **Default domain**: `https://your-cloudflare-pages-name.pages.dev/dns-query`  
✅ **Custom domain**: If your domain is `yourdomain.com`, access it via `https://yourdomain.com/dns-query`  
✅ **Ensure** `/dns-query` is appended to perform DNS queries.

---

# ⚠ Additional Disclaimer

1️⃣ **All operations and configurations described in this tutorial are for personal or organizational reference only. Users assume all risks and responsibilities.**
2️⃣ **Ensure the DoH servers used are secure and trustworthy.** This tutorial does not guarantee the stability, security, or privacy of any third-party DoH servers.
3️⃣ **Steps provided are based on current Cloudflare Pages and GitHub API info.** Adjustments may be needed as platforms update.
4️⃣ **Custom domain users must comply with domain registrar and legal regulations.**
5️⃣ **This project should NOT be used for illegal or malicious purposes.** Users must comply with internet laws.
6️⃣ **The authors and contributors are NOT responsible for any direct or indirect losses from using this tutorial.**
7️⃣ **Third-party links or services mentioned carry their own risks.**
8️⃣ **This tutorial is provided "as is." No guarantees are made regarding accuracy, completeness, or applicability.**

---

📌 **If you find this project helpful, please consider giving it a ⭐ on GitHub to support further development!** 🚀

