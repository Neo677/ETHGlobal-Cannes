const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../localhost.pem')),
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('🚀 Serveur HTTPS démarré sur https://localhost:3000');
    console.log('🔒 HTTPS activé pour Privy');
    console.log('📱 Prêt pour l'authentification wallet');
  });
}); 