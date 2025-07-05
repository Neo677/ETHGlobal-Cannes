# 🚀 Quick Start - MetaCarTag avec Privy

## 🎯 Objectif

Faire fonctionner Privy avec HTTPS pour l'authentification wallet.

## 📋 Options Disponibles

### **Option 1 : Déploiement Vercel (Recommandé) ⭐**

**Avantages :**
- ✅ HTTPS automatique
- ✅ Gratuit
- ✅ Déploiement en 5 minutes
- ✅ Certificat SSL valide

**Étapes :**
1. Aller sur [vercel.com](https://vercel.com)
2. Connecter avec GitHub
3. Importer le repository `ETHGlobal-Cannes`
4. Ajouter les variables d'environnement
5. Déployer

**Variables d'environnement Vercel :**
```
NEXT_PUBLIC_PRIVY_APP_ID = your-privy-app-id
NEXT_PUBLIC_SELF_CERAMIC_API_URL = https://ceramic-clay.3boxlabs.com
```

### **Option 2 : HTTPS Local (Développement)**

**Avantages :**
- ✅ Développement local
- ✅ Pas de déploiement
- ✅ Contrôle total

**Étapes :**
```bash
# Installer mkcert (macOS)
brew install mkcert
mkcert -install

# Lancer en HTTPS
npm run dev:https
```

## 🛠️ Configuration Privy

### 1. Créer une App Privy

1. Aller sur [console.privy.io](https://console.privy.io)
2. Créer une nouvelle app
3. Copier l'**App ID**

### 2. Configurer les Domaines

**Pour Vercel :**
```
https://your-app.vercel.app
```

**Pour développement local :**
```
https://localhost:3000
```

## 🧪 Test

### Test de Base
```bash
# Vercel
https://your-app.vercel.app/profile

# Local HTTPS
https://localhost:3000/profile
```

### Test Privy
1. Cliquer sur "Connect with Privy"
2. Utiliser email ou SMS
3. Vérifier l'authentification Self.ID

## 🔧 Debug

### Erreurs Communes

**"Privy not configured"**
- Vérifier `NEXT_PUBLIC_PRIVY_APP_ID`
- Redéployer après modification

**"Connection failed"**
- Vérifier HTTPS
- Vérifier le domaine dans Privy Console

**"Build failed"**
- Vérifier les dépendances
- Consulter les logs

## 📞 Support

- **Vercel** : [vercel.com/support](https://vercel.com/support)
- **Privy** : [docs.privy.io](https://docs.privy.io)
- **Self.ID** : [developers.ceramic.network](https://developers.ceramic.network)

## 🎯 Recommandation

**Pour le développement rapide :** Utiliser Vercel
**Pour le développement local :** Utiliser HTTPS local

Les deux options fonctionnent parfaitement avec Privy ! 🚀 