# Credit Expert India — VPS Backend Deployment Guide

## 1. Architecture

The frontend is already completely client-side rendered (CSR) and hosted on GitHub Pages.

The VPS will be used only for the secure backend/API.

```text
                         INTERNET
                            │
                            ▼
                 ┌─────────────────────┐
                 │   GitHub Pages      │
                 │                     │
                 │ creditexpertindia   │
                 │      .com           │
                 │                     │
                 │   CSR Frontend      │
                 └──────────┬──────────┘
                            │
                     HTTPS API Requests
                            │
                            ▼
                 ┌─────────────────────┐
                 │ api.creditexpert    │
                 │ india.com            │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      VPS Server     │
                 │                     │
                 │ Ubuntu              │
                 │ Node.js             │
                 │ Backend API         │
                 │ Caddy               │
                 │ Static IPv4         │
                 └──────────┬──────────┘
                            │
                            ▼
                       Surepass API
```

---

# 2. Requirements

You should have:

* VPS with Ubuntu
* Static public IPv4 address
* SSH access
* GitHub repository containing the backend
* Domain: `creditexpertindia.com`
* DNS management access
* Surepass API credentials
* Firebase credentials if used
* Upstash Redis credentials if used

Recommended backend domain:

```text
api.creditexpertindia.com
```

---

# 3. Connect to the VPS

From your local Linux machine:

```bash
ssh root@YOUR_SERVER_IP
```

Example:

```bash
ssh root@103.xxx.xxx.xxx
```

If your provider gave you another username:

```bash
ssh USERNAME@YOUR_SERVER_IP
```

---

# 4. Update Ubuntu

```bash
apt update
apt upgrade -y
```

Install basic packages:

```bash
apt install -y git curl unzip ufw
```

---

# 5. Configure Firewall

Allow SSH:

```bash
ufw allow OpenSSH
```

Allow HTTP:

```bash
ufw allow 80/tcp
```

Allow HTTPS:

```bash
ufw allow 443/tcp
```

Enable firewall:

```bash
ufw enable
```

Check:

```bash
ufw status
```

Expected:

```text
22/tcp   ALLOW
80/tcp   ALLOW
443/tcp  ALLOW
```

Do NOT expose your Node.js application port directly to the internet.

For example, if Node runs on port `3000`, keep port `3000` private.

---

# 6. Verify Static IP

From the VPS:

```bash
curl -4 ifconfig.me
```

The result should be your VPS public IPv4.

Example:

```text
103.xxx.xxx.xxx
```

This is the IP that can be provided to Surepass for IP allowlisting.

---

# 7. Configure DNS

Go to the DNS provider where `creditexpertindia.com` is managed.

Create:

```text
Type: A
Name: api
Value: YOUR_VPS_STATIC_IP
TTL: Auto
```

Example:

```text
api.creditexpertindia.com → 103.xxx.xxx.xxx
```

Verify:

```bash
dig api.creditexpertindia.com
```

or:

```bash
ping api.creditexpertindia.com
```

---

# 8. Install Node.js

Install Node.js 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

Expected:

```text
v22.x.x
```

---

# 9. Create Application Directory

```bash
mkdir -p /var/www
cd /var/www
```

---

# 10. Clone Backend Repository

Clone your backend repository:

```bash
git clone YOUR_BACKEND_REPOSITORY_URL creditexpertindia-backend
```

Example:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_BACKEND_REPO.git creditexpertindia-backend
```

Enter the directory:

```bash
cd /var/www/creditexpertindia-backend
```

---

# 11. Install Dependencies

```bash
npm install
```

If the application requires a production build:

```bash
npm run build
```

---

# 12. Environment Variables

Create the environment file:

```bash
nano /var/www/creditexpertindia-backend/.env
```

Example:

```env
NODE_ENV=production
PORT=3000

SUREPASS_API_KEY=YOUR_SUREPASS_SECRET

UPSTASH_REDIS_REST_URL=YOUR_REDIS_URL
UPSTASH_REDIS_REST_TOKEN=YOUR_REDIS_TOKEN

FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_CLIENT_EMAIL=YOUR_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY="YOUR_PRIVATE_KEY"
```

Add every other backend-only secret required by your application.

Save the file.

Secure it:

```bash
chmod 600 /var/www/creditexpertindia-backend/.env
```

## IMPORTANT

Never put secret API keys in the CSR frontend.

Do NOT use:

```text
NEXT_PUBLIC_SUREPASS_API_KEY
```

or:

```text
REACT_APP_SUREPASS_API_KEY
```

Anything exposed to the browser should be considered public.

The Surepass token must remain on the VPS.

---

# 13. Test Backend

Start the backend manually:

```bash
cd /var/www/creditexpertindia-backend
npm start
```

If your application uses another command, use the command defined in `package.json`.

For example:

```bash
npm run start
```

If it listens on port `3000`, test from the VPS:

```bash
curl http://localhost:3000
```

Stop the application with:

```text
CTRL+C
```

---

# 14. Create systemd Service

Create:

```bash
nano /etc/systemd/system/creditexpert-backend.service
```

Use:

```ini
[Unit]
Description=Credit Expert India Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/creditexpertindia-backend
EnvironmentFile=/var/www/creditexpertindia-backend/.env
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Save the file.

Reload systemd:

```bash
systemctl daemon-reload
```

Enable the service:

```bash
systemctl enable creditexpert-backend
```

Start it:

```bash
systemctl start creditexpert-backend
```

Check:

```bash
systemctl status creditexpert-backend
```

---

# 15. View Backend Logs

Live logs:

```bash
journalctl -u creditexpert-backend -f
```

Last 100 lines:

```bash
journalctl -u creditexpert-backend -n 100
```

Restart:

```bash
systemctl restart creditexpert-backend
```

Stop:

```bash
systemctl stop creditexpert-backend
```

---

# 16. Install Caddy

Caddy will handle:

* HTTPS
* TLS certificates
* Certificate renewal
* Reverse proxy
* Forwarding requests to Node.js

Install:

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
```

Add Caddy repository:

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor \
  -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
```

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | tee /etc/apt/sources.list.d/caddy-stable.list
```

Install:

```bash
apt update
apt install caddy -y
```

---

# 17. Configure Caddy

Open:

```bash
nano /etc/caddy/Caddyfile
```

Use:

```text
api.creditexpertindia.com {
    reverse_proxy localhost:3000
}
```

Save the file.

Validate:

```bash
caddy validate --config /etc/caddy/Caddyfile
```

Reload:

```bash
systemctl reload caddy
```

Check:

```bash
systemctl status caddy
```

---

# 18. HTTPS

Once DNS is correctly pointing to the VPS, Caddy automatically obtains a Let's Encrypt TLS certificate.

Your backend should now be available at:

```text
https://api.creditexpertindia.com
```

Caddy will automatically renew the certificate.

---

# 19. Frontend API URL

Your GitHub Pages frontend should call:

```text
https://api.creditexpertindia.com
```

For example:

```javascript
const API_URL = "https://api.creditexpertindia.com";
```

Instead of:

```javascript
const API_URL = "http://localhost:3000";
```

or:

```javascript
const API_URL = "http://YOUR_SERVER_IP:3000";
```

The browser should use the HTTPS domain.

---

# 20. CORS

Because the frontend and backend are on different origins, configure CORS in your backend.

Allow only your production frontend.

Example:

```text
https://creditexpertindia.com
```

If you also use:

```text
https://www.creditexpertindia.com
```

allow that explicitly as well.

Do NOT use this for sensitive production APIs:

```text
Access-Control-Allow-Origin: *
```

---

# 21. Recommended API Structure

Your frontend:

```text
creditexpertindia.com
```

Your backend:

```text
api.creditexpertindia.com
```

Example endpoints:

```text
POST /api/auth/login
POST /api/auth/signup
POST /api/credit-report
GET  /api/credit-report/:id
POST /api/eligibility
```

The frontend calls:

```text
https://api.creditexpertindia.com/api/credit-report
```

The backend calls:

```text
Surepass API
```

---

# 22. Surepass API Security

The correct flow is:

```text
Browser
   │
   │ PAN + mobile + required data
   ▼
Credit Expert India Backend
   │
   │ SUREPASS_API_KEY
   ▼
Surepass
```

The incorrect flow is:

```text
Browser
   │
   │ SUREPASS_API_KEY ❌
   ▼
Surepass
```

Never expose the Surepass API token to the browser.

---

# 23. Surepass IP Whitelisting

Check the server's public IP:

```bash
curl -4 ifconfig.me
```

Example:

```text
103.xxx.xxx.xxx
```

Give this IP to Surepass if they require IP allowlisting.

The expected flow is:

```text
Credit Expert India Backend
          │
          ▼
      VPS Static IP
          │
          ▼
       Surepass
```

The VPS should make the outbound API request.

---

# 24. Health Check

Create a backend health endpoint:

```text
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

Then test:

```bash
curl https://api.creditexpertindia.com/health
```

Expected:

```json
{
  "status": "ok"
}
```

---

# 25. Automatic Restart

Because systemd is configured with:

```ini
Restart=always
RestartSec=5
```

if the backend crashes, systemd will restart it.

Check:

```bash
systemctl status creditexpert-backend
```

---

# 26. Automatic Start After Server Reboot

Because:

```bash
systemctl enable creditexpert-backend
```

was used, the backend automatically starts after a VPS reboot.

Test:

```bash
reboot
```

After reconnecting:

```bash
systemctl status creditexpert-backend
```

---

# 27. Deploying Updates

When you push changes to GitHub:

```bash
cd /var/www/creditexpertindia-backend
```

Pull:

```bash
git pull
```

Install new dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

Restart:

```bash
systemctl restart creditexpert-backend
```

Check:

```bash
systemctl status creditexpert-backend
```

---

# 28. Recommended GitHub Actions Deployment

Eventually automate deployment:

```text
Developer
   │
   ▼
GitHub
   │
   │ Push
   ▼
GitHub Actions
   │
   ▼
VPS
   │
   ├── git pull
   ├── npm install
   ├── npm run build
   └── systemctl restart
```

This eliminates manual SSH deployments.

---

# 29. Security Checklist

Before production, verify:

* [ ] SSH password login disabled
* [ ] SSH key authentication enabled
* [ ] Root SSH login restricted/disabled where practical
* [ ] UFW enabled
* [ ] Only ports 22, 80 and 443 exposed
* [ ] Node.js port 3000 NOT publicly exposed
* [ ] `.env` is not committed to GitHub
* [ ] Surepass API key exists only on VPS
* [ ] Firebase private credentials exist only on VPS
* [ ] Redis credentials exist only on VPS
* [ ] CORS restricted to your frontend
* [ ] HTTPS enabled
* [ ] Health endpoint working
* [ ] Automatic backend restart enabled
* [ ] Automatic startup after reboot enabled
* [ ] VPS backups configured
* [ ] Server monitoring configured
* [ ] API rate limiting enabled
* [ ] Authentication enabled for protected endpoints
* [ ] Request validation enabled
* [ ] Sensitive logs do not contain PAN/API keys/tokens

---

# 30. Final Production Architecture

```text
                         USER
                           │
                           ▼
              ┌────────────────────────┐
              │ creditexpertindia.com  │
              │                        │
              │ GitHub Pages           │
              │ CSR Frontend           │
              └───────────┬────────────┘
                          │
                          │ HTTPS
                          ▼
              ┌────────────────────────┐
              │ api.creditexpertindia  │
              │        .com            │
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │         Caddy          │
              │                        │
              │ HTTPS / Reverse Proxy  │
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │   Node.js Backend      │
              │                        │
              │ Auth                   │
              │ Rate Limiting          │
              │ Idempotency            │
              │ Credit Reports         │
              │ Eligibility            │
              │ Firebase               │
              │ Redis                  │
              └───────────┬────────────┘
                          │
                          │ Static Public IPv4
                          ▼
              ┌────────────────────────┐
              │       Surepass         │
              │    Credit Report API   │
              └────────────────────────┘
```

---

# 31. Important Principle

The GitHub Pages application is **public**.

The VPS backend is **private infrastructure exposed only through HTTPS**.

```text
Frontend:
PUBLIC
   ↓
GitHub Pages

Backend:
PRIVATE
   ↓
VPS
   ↓
HTTPS
   ↓
api.creditexpertindia.com

Secrets:
PRIVATE
   ↓
VPS .env
```

This is the architecture to use for the Credit Expert India production system.
