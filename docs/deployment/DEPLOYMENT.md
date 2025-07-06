# 🚀 Déploiement MetaCarTag sur Vercel

## Vue d'ensemble

Ce guide explique comment déployer MetaCarTag sur Vercel avec HTTPS pour faire fonctionner Privy.

## 📋 Prérequis

1. **Compte GitHub** avec le repository MetaCarTag
2. **Compte Vercel** (gratuit) : [vercel.com](https://vercel.com)
3. **Clé Privy** : [console.privy.io](https://console.privy.io)

## 🛠️ Étapes de Déploiement

### 1. Créer une App Privy

1. Aller sur [console.privy.io](https://console.privy.io)
2. Créer une nouvelle app
3. Copier l'**App ID**
4. Configurer les domaines autorisés :
   - `https://your-app.vercel.app`
   - `https://localhost:3000` (pour le développement local)

### 2. Déployer sur Vercel

#### Option A : Via l'Interface Web (Recommandé)

1. **Connecter GitHub**
   - Aller sur [vercel.com](https://vercel.com)
   - Se connecter avec GitHub
   - Cliquer sur "New Project"

2. **Importer le Repository**
   - Sélectionner `ETHGlobal-Cannes`
   - Cliquer sur "Import"

3. **Configurer le Projet**
   - **Framework Preset** : Next.js
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`

4. **Variables d'Environnement**
   - Cliquer sur "Environment Variables"
   - Ajouter :
     ```
     NEXT_PUBLIC_PRIVY_APP_ID = your-privy-app-id
     NEXT_PUBLIC_SELF_CERAMIC_API_URL = https://ceramic-clay.3boxlabs.com
     ```

5. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre 2-3 minutes

#### Option B : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions
```

### 3. Configuration Post-Déploiement

1. **Vérifier l'URL HTTPS**
   - L'URL sera : `https://your-app.vercel.app`
   - HTTPS est automatiquement activé

2. **Tester Privy**
   - Aller sur `/profile`
   - Cliquer sur "Connect with Privy"
   - Devrait fonctionner avec HTTPS

## 🔧 Configuration Avancée

### Variables d'Environnement Vercel

```bash
# Via CLI
vercel env add NEXT_PUBLIC_PRIVY_APP_ID
vercel env add NEXT_PUBLIC_SELF_CERAMIC_API_URL

# Ou via l'interface web
# Settings > Environment Variables
```

### Domains Personnalisés

1. Aller dans **Settings > Domains**
2. Ajouter votre domaine
3. Configurer les DNS
4. Mettre à jour Privy avec le nouveau domaine

## 🧪 Test du Déploiement

### 1. Test de Base
- ✅ L'application se charge
- ✅ La page d'accueil s'affiche
- ✅ Navigation vers `/profile`

### 2. Test Privy
- ✅ Bouton "Connect with Privy" visible
- ✅ Modal Privy s'ouvre
- ✅ Connexion email/SMS fonctionne
- ✅ Self.ID s'authentifie

### 3. Test Self.ID
- ✅ Lecture du profil
- ✅ Écriture du profil
- ✅ Affichage du DID

## 🔍 Debug

### Erreurs Communes

1. **"Privy not configured"**
   - Vérifier `NEXT_PUBLIC_PRIVY_APP_ID`
   - Redéployer après modification

2. **"Connection failed"**
   - Vérifier le domaine dans Privy Console
   - S'assurer que HTTPS est activé

3. **"Build failed"**
   - Vérifier les dépendances dans `package.json`
   - Consulter les logs de build

### Logs Vercel

```bash
# Voir les logs
vercel logs

# Voir les logs en temps réel
vercel logs --follow
```

## 🚀 Déploiement Automatique

### GitHub Actions (Optionnel)

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main, thomas]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

- **Vercel** : [vercel.com/support](https://vercel.com/support)
- **Privy** : [docs.privy.io](https://docs.privy.io)
- **Self.ID** : [developers.ceramic.network](https://developers.ceramic.network)

## 🎯 Prochaines Étapes

1. **Tester le déploiement**
2. **Configurer les domaines personnalisés**
3. **Intégrer avec Flow et Oasis**
4. **Optimiser les performances** 