# 🔄 Options de Réinitialisation MetaCarTag

## Vue d'ensemble

MetaCarTag offre plusieurs options de réinitialisation pour gérer les profils utilisateurs selon différents besoins :

## 🎯 Types de Réinitialisation

### 1. 🔄 Réinitialisation Complète
**Action :** Supprime tout et crée un nouveau profil
- ✅ Supprime toutes les données personnelles
- ✅ Supprime la vérification et les badges
- ✅ Permet de changer de rôle
- ✅ Crée un profil complètement vide

**Utilisation :**
- Changement de rôle (propriétaire → concessionnaire)
- Recommencer complètement
- Tests et développement

### 2. 📝 Réinitialisation des Données
**Action :** Garde le rôle, supprime les infos personnelles
- ✅ Conserve le rôle actuel
- ✅ Supprime nom, email, assurance
- ✅ Supprime les métadonnées du rôle
- ✅ Réinitialise la vérification

**Utilisation :**
- Changer d'identité sans changer de rôle
- Supprimer les infos personnelles
- Tests avec le même rôle

### 3. ✅ Réinitialisation de Vérification
**Action :** Garde les infos, supprime la vérification
- ✅ Conserve toutes les données personnelles
- ✅ Conserve le rôle et les métadonnées
- ✅ Supprime les badges de vérification
- ✅ Remet le score à 0

**Utilisation :**
- Retester la vérification
- Supprimer les badges obtenus
- Recommencer la vérification

### 4. 🗑️ Suppression Complète
**Action :** Supprime définitivement le profil
- ✅ Supprime complètement le profil
- ✅ Supprime toutes les données
- ✅ Nécessite de recréer un profil

**Utilisation :**
- Suppression définitive
- Tests complets
- Nettoyage du système

## 🛠️ Implémentation Technique

### Services
```typescript
// SelfIDService
async resetProfile(did: string, newRole?: UserRole): Promise<ExtendedProfile>
async resetProfileData(did: string): Promise<ExtendedProfile>
async resetVerification(did: string): Promise<ExtendedProfile>
async deleteProfile(did: string): Promise<boolean>
```

### Hooks
```typescript
// useSelfID
const resetProfile = useCallback(async (newRole?: UserRole) => { ... })
const resetProfileData = useCallback(async () => { ... })
const resetVerification = useCallback(async () => { ... })
const deleteProfile = useCallback(async () => { ... })
```

### Composants
```typescript
// ProfileReset
interface ProfileResetProps {
  onResetComplete: (newRole?: UserRole) => Promise<void>;
  onResetData: () => Promise<void>;
  onResetVerification: () => Promise<void>;
  onDeleteProfile: () => Promise<void>;
  loading?: boolean;
  currentRole?: UserRole;
}
```

## 🔄 Flux Utilisateur

### 1. Accès aux Options
```
Profil Connecté → Section "Réinitialisation du Profil" → "Options de Reset"
```

### 2. Sélection du Type
```
4 Options Disponibles → Sélection → Configuration (si nécessaire)
```

### 3. Confirmation
```
Avertissement → Confirmation → Exécution → Retour à l'état initial
```

## ⚠️ Sécurité et Confirmation

### Avertissements
- **Réinitialisation Complète** : "Supprime toutes les données et crée un profil vide"
- **Réinitialisation des Données** : "Conserve le rôle mais supprime les infos personnelles"
- **Réinitialisation de Vérification** : "Conserve les données mais supprime la vérification"
- **Suppression Complète** : "Supprime définitivement le profil du système"

### Confirmation Requise
- Toutes les actions nécessitent une confirmation
- Bouton de confirmation avec couleur selon le type
- Possibilité d'annuler à tout moment

## 🎨 Interface Utilisateur

### Design
- **Couleurs distinctives** par type de réinitialisation
- **Icônes explicites** pour chaque option
- **Descriptions détaillées** des actions
- **Interface intuitive** avec sélection visuelle

### Responsive
- **Mobile** : Grille 1 colonne
- **Desktop** : Grille 2 colonnes
- **Tablette** : Adaptation automatique

## 🔧 Cas d'Usage

### Développement et Tests
```typescript
// Test avec différents rôles
await resetProfile('dealer'); // Propriétaire → Concessionnaire
await resetProfile('insurer'); // Concessionnaire → Assureur
```

### Gestion des Erreurs
```typescript
// Réinitialisation après erreur de vérification
await resetVerification(); // Recommencer la vérification
```

### Nettoyage
```typescript
// Suppression complète pour tests
await deleteProfile(); // Supprime tout
```

## 🚀 Intégration Future

### Avec Flow (Asma)
- Réinitialisation des NFTs associés
- Mise à jour des smart contracts
- Gestion des permissions on-chain

### Avec Oasis (Adir)
- Chiffrement des données supprimées
- Gestion de la confidentialité
- Audit trail des réinitialisations

## 📋 Checklist de Test

- [ ] Réinitialisation complète avec changement de rôle
- [ ] Réinitialisation des données (garde le rôle)
- [ ] Réinitialisation de vérification
- [ ] Suppression complète
- [ ] Confirmation et annulation
- [ ] Gestion des erreurs
- [ ] Interface responsive
- [ ] Intégration avec le système de rôles

## 🔮 Améliorations Futures

1. **Historique des réinitialisations**
2. **Sauvegarde avant réinitialisation**
3. **Réinitialisation partielle (champs spécifiques)**
4. **Templates de réinitialisation**
5. **Intégration avec des autorités externes** 