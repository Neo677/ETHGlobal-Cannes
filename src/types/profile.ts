// Types pour la gestion des profils Self.ID

export interface BasicProfile {
  name?: string;
  email?: string;
  insurance?: string;
  ethAddress?: string;
  publicName?: boolean;
  role?: UserRole;
  vehicleID?: string;
  nftId?: string;
  history?: string[];
}

// Types pour les rôles utilisateur
export type UserRole = 'owner' | 'seller' | 'insurer' | 'admin';

export interface UserPermissions {
  canMintNFTs: boolean;        // Vendeur
  canTransferNFTs: boolean;     // Propriétaire
  canUpdateInsurance: boolean;  // Assureur
  canViewAllProfiles: boolean;  // Admin
  canVerifyProfiles: boolean;   // Admin/Assureur
}

export interface RoleConfig {
  role: UserRole;
  label: string;
  description: string;
  color: string;
  icon: string;
  permissions: UserPermissions;
}

export interface VerificationStatus {
  emailVerified: boolean;
  emailVerificationDate?: string;
  trustLevel: 'unverified' | 'basic' | 'verified' | 'premium';
  verificationScore: number; // 0-100
  badges: VerificationBadge[];
  roleVerified: boolean;     // Vérification du rôle
  roleVerificationDate?: string;
}

export interface VerificationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  verified: boolean;
}

export interface ExtendedProfile extends BasicProfile {
  verification: VerificationStatus;
  did: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  roleMetadata?: {
    companyName?: string;      // Pour vendeur/assureur
    licenseNumber?: string;    // Numéro de licence
    businessAddress?: string;  // Adresse professionnelle
    verifiedBy?: string;       // DID de celui qui a vérifié
  };
}

export interface ProfileViewerProps {
  did: string;
  onProfileLoad?: (profile: ExtendedProfile) => void;
  showVerification?: boolean;
}

export interface TrustBadgeProps {
  level: VerificationStatus['trustLevel'];
  score: number;
  showDetails?: boolean;
}

export interface VerificationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

export interface VerificationFlow {
  steps: VerificationStep[];
  currentStep: number;
  completed: boolean;
}

// Configuration des rôles
export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  owner: {
    role: 'owner',
    label: 'Owner',
    description: 'Vehicle owner',
    color: 'bg-blue-500',
    icon: '🚗',
    permissions: {
      canMintNFTs: false,
      canTransferNFTs: true,
      canUpdateInsurance: false,
      canViewAllProfiles: false,
      canVerifyProfiles: false
    }
  },
  seller: {
    role: 'seller',
    label: 'Seller',
    description: 'Vehicle seller',
    color: 'bg-green-500',
    icon: '🏢',
    permissions: {
      canMintNFTs: true,
      canTransferNFTs: false,
      canUpdateInsurance: false,
      canViewAllProfiles: true,
      canVerifyProfiles: false
    }
  },
  insurer: {
    role: 'insurer',
    label: 'Insurer',
    description: 'Insurance company',
    color: 'bg-purple-500',
    icon: '🛡️',
    permissions: {
      canMintNFTs: false,
      canTransferNFTs: false,
      canUpdateInsurance: true,
      canViewAllProfiles: true,
      canVerifyProfiles: true
    }
  },
  admin: {
    role: 'admin',
    label: 'Administrator',
    description: 'System manager',
    color: 'bg-red-500',
    icon: '⚙️',
    permissions: {
      canMintNFTs: true,
      canTransferNFTs: true,
      canUpdateInsurance: true,
      canViewAllProfiles: true,
      canVerifyProfiles: true
    }
  }
}; 