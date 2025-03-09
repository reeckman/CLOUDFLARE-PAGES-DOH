# 🚀 Cloudflare Encrypted DNS pages Setup Guide 🚀

## ⚠ Important Notice ⚠

🔹 **This is an open-source project designed to provide a DNS over HTTPS (DoH) forwarding service using Cloudflare pages.**  
🔹 **Its primary goal is to improve network security and privacy by offering a safer DNS resolution option.**  

📌 However, please take note of the following disclaimers:

1️⃣ **This project is strictly for research and personal use only.** It must not be used for unlawful activities or any actions that infringe on others' rights.

2️⃣ **Cloudflare’s Worker infrastructure is used, but this project is NOT affiliated with or officially supported by Cloudflare.** Any consequences arising from its use are solely the user’s responsibility.

3️⃣ **The project authors and contributors hold no liability for any issues, including but not limited to:**
   - Data loss
   - Service disruptions
   - Security vulnerabilities

4️⃣ **Users must comply with all relevant laws and regulations** and bear full responsibility for their usage.

5️⃣ **If anyone misuses this project in a way that violates Cloudflare's terms of service,** the responsibility lies solely with them, not with the project maintainers.

📢 **By using this project, you acknowledge and accept these terms. Proceed at your own discretion.**

---

# 📖 Step-by-Step Guide: Deploying Your Encrypted DNS pages

## 1️⃣ Fork the Repository

✅ **Go to** the project’s GitHub page.  
✅ **Click** the `Fork` button in the top-right corner to copy the repository to your account.  
✅ Once forked, you will have your own version of the project under your GitHub account.

---

## 2️⃣ Deploy via Cloudflare Pages

✅ **Log in** to your Cloudflare account and navigate to `Cloudflare Pages`.  
✅ **Click** `Create a Project`.  
✅ **Select** GitHub as the version control provider.  
✅ **Authorize** Cloudflare to access your repositories and pick the forked project.  
✅ **Follow** the instructions to complete deployment; Cloudflare Pages will handle the build and publish automatically.

---

## 3️⃣ Configure DOH_SERVERS Environment Variable

✅ **Open** the `Cloudflare Pages` dashboard and go to your project’s settings.  
✅ **Locate** the `Environment Variables` section.  
✅ **Add** a new variable named `DOH_SERVERS`, setting its value to the DoH server addresses you want to use. Example:
```bash
https://dns.google/dns-query, https://cloudflare-dns.com/dns-query, https://dns.quad9.net/dns-query
```
✅ **Save** the settings. The system will automatically select the fastest responding server.

---

## 4️⃣ Access Your DNS Resolver via Cloudflare Pages

✅ **Default Cloudflare Pages domain**: `https://your-cloudflare-pages-name.pages.dev/dns-query`  
✅ **Custom domain (if configured)**: `https://yourdomain.com/dns-query`  
✅ **Ensure you append** `/dns-query` to perform DNS requests properly.

---

# ⚠ Additional Considerations

1️⃣ **This tutorial is provided for educational purposes only. Users assume all risks associated with its use.**
2️⃣ **Be mindful when choosing DoH servers.** Review their privacy policies before using them.
3️⃣ **Cloudflare Pages and GitHub workflows may change over time.** Adjustments to these instructions may be required.
4️⃣ **If using a custom domain, ensure compliance with domain regulations.**
5️⃣ **Do not use this project for any illegal, malicious, or unethical purposes.**
6️⃣ **The authors and contributors are NOT responsible for any damage or legal consequences resulting from misuse.**
7️⃣ **Third-party links or services mentioned are used at your own risk.**
8️⃣ **This guide is provided "as is," with no guarantees regarding accuracy or functionality.**

---

📢 **If you found this project helpful, consider giving it a ⭐ on GitHub to show your support!** 🚀



