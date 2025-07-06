# 🚗 Système de Rôles MetaCarTag

## Vue d'ensemble

MetaCarTag utilise un système de rôles pour différencier les acteurs du système de gestion de véhicules décentralisé :

- **Propriétaire** : Détenteur du véhicule
- **Concessionnaire** : Vendeur de véhicules  
- **Assureur** : Compagnie d'assurance
- **Administrateur** : Gestionnaire système

## 🎯 Rôles et Permissions

### 1. Propriétaire (`owner`) 🚗
**Permissions :**
- ✅ Transférer des véhicules (NFTs)
- ❌ Mint des NFTs
- ❌ Mettre à jour l'assurance
- ❌ Voir tous les profils
- ❌ Vérifier des profils

**Fonctionnalités :**
- Gestion de son profil personnel
- Consultation de ses véhicules
- Transfert de propriété

### 2. Concessionnaire (`dealer`) 🏢
**Permissions :**
- ✅ Mint des NFTs véhicules
- ❌ Transférer des véhicules
- ❌ Mettre à jour l'assurance
- ✅ Voir tous les profils
- ❌ Vérifier des profils

**Fonctionnalités :**
- Création de NFTs pour les véhicules
- Consultation des profils clients
- Gestion du stock de véhicules

### 3. Assureur (`insurer`) 🛡️
**Permissions :**
- ❌ Mint des NFTs
- ❌ Transférer des véhicules
- ✅ Mettre à jour l'assurance
- ✅ Voir tous les profils
- ✅ Vérifier des profils

**Fonctionnalités :**
- Mise à jour des informations d'assurance
- Vérification des profils utilisateurs
- Consultation de tous les profils

### 4. Administrateur (`admin`) ⚙️
**Permissions :**
- ✅ Mint des NFTs
- ✅ Transférer des véhicules
- ✅ Mettre à jour l'assurance
- ✅ Voir tous les profils
- ✅ Vérifier des profils

**Fonctionnalités :**
- Accès complet au système
- Gestion des utilisateurs
- Vérification des rôles

## 🔐 Système de Vérification

### Vérification des Rôles
- Seuls les **admins** et **assureurs** peuvent vérifier les rôles
- La vérification ajoute un badge de confiance
- Traçabilité : enregistrement du DID du vérificateur

### Métadonnées des Rôles
```typescript
roleMetadata: {
  companyName?: string;      // Pour concessionnaire/assureur
  licenseNumber?: string;    // Numéro de licence
  businessAddress?: string;  // Adresse professionnelle
  verifiedBy?: string;       // DID de celui qui a vérifié
}
```

## 🎨 Interface Utilisateur

### Sélection de Rôle
- Interface intuitive avec icônes
- Affichage des permissions par rôle
- Validation avant création du profil

### Badges de Rôle
- Couleurs distinctives par rôle
- Indicateur de vérification
- Affichage des permissions

### Actions Spécifiques
- Boutons d'action selon les permissions
- Interface adaptative selon le rôle
- Gestion des accès restreints

## 🔄 Flux Utilisateur

### 1. Création de Profil
```
Connexion Wallet → Sélection Rôle → Remplissage Formulaire → Création Profil
```

### 2. Vérification de Rôle
```
Admin/Assureur → Consultation Profils → Vérification Rôle → Badge Ajouté
```

### 3. Actions Spécifiques
```
Propriétaire → Transfert Véhicule
Concessionnaire → Mint NFT Véhicule  
Assureur → Mise à jour Assurance
Admin → Gestion Complète
```

## 🛠️ Intégration Technique

### Services
- `SelfIDService` : Gestion des profils et rôles
- `VerificationService` : Vérification des rôles
- `ProfileList` : Affichage des profils multiples

### Hooks
- `useSelfID` : Gestion des états et actions
- Permissions dynamiques selon le rôle

### Composants
- `RoleSelector` : Sélection de rôle
- `RoleBadge` : Affichage du badge de rôle
- `ProfileList` : Liste des profils avec filtres

## 🔮 Évolutions Futures

### Intégration avec Flow (Asma)
- NFTs de véhicules avec métadonnées de rôle
- Smart contracts pour les permissions
- Vérification on-chain des rôles

### Intégration avec Oasis (Adir)
- Chiffrement des données sensibles par rôle
- Partage sélectif des informations
- Privacy-preserving verification

### Améliorations
- Système de badges avancé
- Vérification multi-facteurs
- Intégration avec des autorités externes
- Système de réputation par rôle

## 📋 Checklist de Test

- [ ] Création de profil avec différents rôles
- [ ] Affichage correct des permissions
- [ ] Vérification des rôles par admin/assureur
- [ ] Actions spécifiques selon le rôle
- [ ] Filtrage des profils par rôle
- [ ] Métadonnées des rôles
- [ ] Badges de vérification
- [ ] Interface responsive

## 🚀 Prochaines Étapes

1. **Intégration Flow** : NFTs avec métadonnées de rôle
2. **Intégration Oasis** : Chiffrement des données sensibles
3. **Tests complets** : Validation du système de rôles
4. **Documentation API** : Pour les équipes Flow et Oasis
5. **Déploiement** : Testnet et mainnet 