# 🚗 MetaCarTag - Privy + Self.ID Setup

## Vue d'ensemble

Cette partie de MetaCarTag gère l'identité utilisateur avec :
- **Privy React Auth** : Wallet onboarding (email/SMS)
- **Self.ID** : Profils décentralisés sur Ceramic
- **Ethers.js** : Signer pour les transactions

## 🛠️ Installation

### 1. Dépendances
```bash
npm install @privy-io/react-auth @self.id/web @self.id/framework ethers
```

### 2. Variables d'environnement
Créer un fichier `.env.local` :
```env
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id

# Self.ID / Ceramic Configuration
NEXT_PUBLIC_SELF_CERAMIC_API_URL=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_SELF_CERAMIC_NETWORK=testnet-clay
```

### 3. Configuration Privy
1. Aller sur [console.privy.io](https://console.privy.io)
2. Créer une nouvelle app
3. Copier l'App ID dans `.env.local`

## 📁 Structure des Fichiers

```
src/
├── hooks/
│   └── usePrivySelfProfile.ts    # Hook principal Privy + Self.ID
├── providers/
│   ├── PrivyProvider.tsx         # Provider Privy React
│   └── PrivySelfProvider.tsx     # Provider Self.ID
└── app/
    ├── layout.tsx                 # Layout avec providers
    └── profile/
        └── page.tsx              # Page de profil
```

## 🔧 Utilisation

### 1. Hook Principal
```typescript
import { usePrivySelf } from '@/providers/PrivySelfProvider';

const {
  isConnected,
  isAuthenticated,
  account,
  did,
  profile,
  readProfile,
  writeProfile,
} = usePrivySelf();
```

### 2. Connexion Privy
```typescript
import { usePrivy } from '@privy-io/react-auth';

const { login, logout, authenticated, user } = usePrivy();

// Connexion via email/SMS
await login();

// Vérifier l'état
console.log('Authenticated:', authenticated);
console.log('User:', user);
```

### 3. Gestion du Profil
```typescript
// Lire le profil
const profile = await readProfile();

// Écrire le profil
await writeProfile({
  name: 'John Doe',
  email: 'john@example.com',
  insurance: 'AXA',
  publicName: true,
});
```

## 🎯 Fonctionnalités

### ✅ Implémenté
- [x] Connexion Privy React (email/SMS)
- [x] Authentification Self.ID avec signer Privy
- [x] Lecture/écriture basicProfile
- [x] Interface utilisateur complète
- [x] Gestion d'erreurs
- [x] État de chargement
- [x] Affichage des informations utilisateur Privy

### 🔄 Flux Utilisateur
1. **Connexion** : Clic sur "Connect with Privy"
2. **Authentification** : Email/SMS via Privy React
3. **Self.ID** : Authentification automatique avec signer Privy
4. **Profil** : Lecture/édition du basicProfile
5. **Sauvegarde** : Écriture sur Ceramic

## 🚀 Démarrage Rapide

### 1. Cloner et installer
```bash
git clone <repo>
cd metacartag
npm install
```

### 2. Configurer l'environnement
```bash
cp env.example .env.local
# Éditer .env.local avec vos clés Privy
```

### 3. Lancer l'application
```bash
npm run dev
```

### 4. Tester
- Aller sur `http://localhost:3000/profile`
- Cliquer sur "Connect with Privy"
- Tester la lecture/écriture du profil

## 🔍 Debug

### Vérifier la configuration
```typescript
// Dans la console du navigateur
console.log('PRIVY_APP_ID:', process.env.NEXT_PUBLIC_PRIVY_APP_ID);
console.log('CERAMIC_URL:', process.env.NEXT_PUBLIC_SELF_CERAMIC_API_URL);
```

### Erreurs communes
- **"Privy not configured"** : Vérifier NEXT_PUBLIC_PRIVY_APP_ID
- **"Self.ID not authenticated"** : Attendre l'authentification
- **"Connection failed"** : Vérifier la configuration Privy

## 🔮 Intégration Future

### Avec Flow (Asma)
```typescript
// Utiliser le signer pour les transactions Flow
const { signer } = usePrivySelf();
// Intégrer avec les smart contracts Flow
```

### Avec Oasis (Adir)
```typescript
// Utiliser le DID pour l'authentification Oasis
const { did } = usePrivySelf();
// Intégrer avec les services Oasis Sapphire
```

## 📋 Checklist de Test

- [ ] Connexion Privy React fonctionne
- [ ] Self.ID s'authentifie automatiquement
- [ ] Lecture du profil fonctionne
- [ ] Écriture du profil fonctionne
- [ ] Interface responsive
- [ ] Gestion d'erreurs
- [ ] État de chargement
- [ ] Affichage des informations utilisateur Privy

## 🎯 Prochaines Étapes

1. **Tests complets** : Validation de tous les cas d'usage
2. **Intégration Flow** : Connexion avec les NFTs véhicules
3. **Intégration Oasis** : Chiffrement des données sensibles
4. **Production** : Déploiement sur mainnet 