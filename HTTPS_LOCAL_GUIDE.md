# 🔒 Guide HTTPS Local pour Privy

## 🎯 Objectif

Configurer HTTPS local pour faire fonctionner Privy en développement.

## 📋 Prérequis

- ✅ macOS (ou Linux)
- ✅ Node.js 18+
- ✅ mkcert installé

## 🛠️ Configuration Étape par Étape

### 1. Installer mkcert

```bash
# macOS
brew install mkcert
mkcert -install

# Linux
sudo apt-get install mkcert
mkcert -install
```

### 2. Créer les certificats SSL

```bash
# Dans le dossier du projet
mkcert -key-file ./localhost-key.pem -cert-file ./localhost.pem localhost 127.0.0.1
```

### 3. Créer le fichier .env.local

```bash
# Créer .env.local dans le dossier racine
cat > .env.local << EOF
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id

# Self.ID Configuration
NEXT_PUBLIC_SELF_CERAMIC_API_URL=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_SELF_CERAMIC_NETWORK=testnet-clay

# Environment
NODE_ENV=development
EOF
```

### 4. Configurer Privy Console

1. Aller sur [console.privy.io](https://console.privy.io)
2. Créer une nouvelle app
3. Copier l'**App ID**
4. Dans les paramètres, ajouter les domaines :
   - `https://localhost:3000`
   - `https://127.0.0.1:3000`

### 5. Lancer en HTTPS

#### Option A : Script automatique
```bash
npm run dev:https
```

#### Option B : Manuel
```bash
HTTPS=true SSL_CRT_FILE=./localhost.pem SSL_KEY_FILE=./localhost-key.pem npm run dev
```

#### Option C : Serveur personnalisé
```bash
npm run dev:https-server
```

## 🧪 Test

### 1. Vérifier HTTPS
```bash
curl -k https://localhost:3000
```

### 2. Ouvrir dans le navigateur
```
https://localhost:3000/profile
```

### 3. Tester Privy
1. Cliquer sur "Connect with Privy"
2. Utiliser email ou SMS
3. Vérifier l'authentification

## 🔧 Debug

### Erreurs Communes

**"Certificate not trusted"**
```bash
# Réinstaller mkcert
mkcert -install
```

**"Connection refused"**
```bash
# Vérifier le port
lsof -i :3000
# Tuer les processus
pkill -f "next"
```

**"Privy not configured"**
- Vérifier `.env.local`
- Vérifier `NEXT_PUBLIC_PRIVY_APP_ID`

## 📱 Alternative : ngrok

Si HTTPS local ne fonctionne pas :

```bash
# Installer ngrok
brew install ngrok

# Lancer Next.js en HTTP
npm run dev

# Dans un autre terminal
ngrok http 3000
```

Puis utiliser l'URL HTTPS de ngrok dans Privy Console.

## 🎯 Recommandation

**Pour le développement :** HTTPS local avec mkcert
**Pour les tests rapides :** ngrok
**Pour la production :** Vercel

## 📞 Support

- **mkcert** : [github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)
- **Privy** : [docs.privy.io](https://docs.privy.io)
- **Next.js HTTPS** : [nextjs.org/docs](https://nextjs.org/docs) 