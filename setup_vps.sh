#!/bin/bash

# Credit Expert India - VPS Proxy Setup Script
# Run this script on your fresh Ubuntu VPS as root.
# 
# Usage:
# 1. SSH into your VPS
# 2. Copy this file to the VPS (e.g. using scp, or just copy-paste into a new file)
# 3. chmod +x setup_vps.sh
# 4. ./setup_vps.sh

set -e

# ==========================================
# CONFIGURATION - EDIT THESE BEFORE RUNNING!
# ==========================================
DOMAIN="api.creditexpertindia.com"
APP_DIR="/var/www/surepass-proxy"
SUREPASS_TARGET="https://sandbox.surepass.tech" # Change to production API URL when ready
# ==========================================

# 1. Check root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (e.g., sudo ./setup_vps.sh)"
  exit 1
fi

echo "Starting deployment setup for $DOMAIN..."

# 2. Update and install dependencies
echo "Updating packages..."
apt update
apt upgrade -y
apt install -y curl ufw

# 3. Configure Firewall
echo "Configuring firewall..."
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# 4. Install Node.js 22
echo "Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# 5. Create application directory and initialize Node project
echo "Setting up proxy application..."
mkdir -p $APP_DIR
cd $APP_DIR

# Initialize project
npm init -y
npm install express http-proxy-middleware dotenv

# 6. Create proxy server code
cat > server.js <<'EOF'
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const INTERNAL_SECRET = process.env.INTERNAL_PROXY_SECRET;
const SUREPASS_SECRET = process.env.SUREPASS_API_KEY;
const SUREPASS_URL = process.env.SUREPASS_URL || 'https://sandbox.surepass.tech';

if (!INTERNAL_SECRET || !SUREPASS_SECRET) {
  console.error("CRITICAL: Missing INTERNAL_PROXY_SECRET or SUREPASS_API_KEY.");
  process.exit(1);
}

// Health check for Caddy/system monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'surepass-proxy' });
});

// Middleware to protect the proxy with the internal secret
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${INTERNAL_SECRET}`) {
    console.warn(`Unauthorized request blocked from ${req.ip}`);
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Proxy logic to Surepass
app.use('/', createProxyMiddleware({
  target: SUREPASS_URL,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      // Swap out the internal secret for the real Surepass secret
      proxyReq.setHeader('Authorization', `Bearer ${SUREPASS_SECRET}`);
    }
  }
}));

app.listen(PORT, () => {
  console.log(`VPS Proxy running on port ${PORT}`);
});
EOF

# 7. Create .env template if it doesn't exist
if [ ! -f "$APP_DIR/.env" ]; then
    echo "Creating empty .env file..."
    cat > $APP_DIR/.env <<EOL
PORT=3000
SUREPASS_URL=$SUREPASS_TARGET

# Generate a random UUID for this or make one up, put this exact same string in your Vercel Environment Variables.
INTERNAL_PROXY_SECRET=Shashidabral410@

# Put your real Surepass Token here.
SUREPASS_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc4OTIyMzQ5NywianRpIjoiNmY0OWQ5ZDYtNGVhNy00ZjJmLWJlZmUtODExNjg2MGE0ZjQzIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmNyZWRpdGV4cGVydGluZGlhQHN1cmVwYXNzLmlvIiwibmJmIjoxNzg5MjIzNDk3LCJleHAiOjIxMDQ1ODM0OTcsImVtYWlsIjoiY3JlZGl0ZXhwZXJ0aW5kaWFAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.zOfjOTG1XrixzmUowCWgSADg281qLkI_asb-t7M_0dg"
EOL
    chmod 600 $APP_DIR/.env
fi

# 8. Setup systemd service
echo "Configuring systemd service..."
cat > /etc/systemd/system/surepass-proxy.service <<EOL
[Unit]
Description=Surepass API Proxy
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$APP_DIR
EnvironmentFile=$APP_DIR/.env
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOL

systemctl daemon-reload
systemctl enable surepass-proxy

# 9. Install Caddy
echo "Installing Caddy..."
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy -y

# 10. Configure Caddy
echo "Configuring Caddy..."
cat > /etc/caddy/Caddyfile <<EOL
$DOMAIN {
    reverse_proxy localhost:3000
}
EOL

caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy || systemctl start caddy
systemctl enable caddy

# 11. Final Instructions
echo "================================================================"
echo "✅ Proxy Setup script completed successfully!"
echo ""
echo "Please follow these final manual steps:"
echo "1. Edit your secrets in the .env file:"
echo "   nano $APP_DIR/.env"
echo "   (Make sure you set a strong INTERNAL_PROXY_SECRET and put your real SUREPASS_API_KEY)"
echo ""
echo "2. Start the proxy service:"
echo "   systemctl start surepass-proxy"
echo "   (Check status: systemctl status surepass-proxy)"
echo ""
echo "3. Ensure your DNS A record for $DOMAIN points to this server's IP:"
echo "   Your server IP is: \$(curl -s4 ifconfig.me)"
echo "================================================================"
