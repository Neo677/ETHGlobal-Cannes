import { BasicProfile, ExtendedProfile, VerificationStatus, UserRole } from '@/types/profile';

export class SelfIDService {
  private static instance: SelfIDService;
  private account: string | null = null;
  private did: string | null = null;

  static getInstance(): SelfIDService {
    if (!SelfIDService.instance) {
      SelfIDService.instance = new SelfIDService();
    }
    return SelfIDService.instance;
  }

  // Connexion via Privy uniquement
  async connectWallet(): Promise<{ account: string; did: string }> {
    // Cette méthode sera remplacée par Privy
    // Pour le moment, on simule une connexion
    const account = '0x' + Math.random().toString(16).substr(2, 40);
    const did = `did:ethr:${account}`;
    
    this.account = account;
    this.did = did;

    return { account, did };
  }

  // Récupération du profil depuis localStorage (pour MVP)
  async getProfile(did: string): Promise<ExtendedProfile | null> {
    try {
      const profileData = localStorage.getItem(`profile_${did}`);
      if (profileData) {
        return JSON.parse(profileData);
      }
      return null;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  }

  // Sauvegarde du profil
  async saveProfile(profile: ExtendedProfile): Promise<void> {
    try {
      localStorage.setItem(`profile_${profile.did}`, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }

  // Création d'un nouveau profil avec rôle par défaut
  async createProfile(did: string, basicProfile: BasicProfile, role: UserRole = 'owner'): Promise<ExtendedProfile> {
    const verification: VerificationStatus = {
      emailVerified: false,
      trustLevel: 'unverified',
      verificationScore: 0,
      badges: [],
      roleVerified: false
    };

    const newProfile: ExtendedProfile = {
      ...basicProfile,
      verification,
      did,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.saveProfile(newProfile);
    return newProfile;
  }

  // Mise à jour du profil
  async updateProfile(did: string, updates: Partial<ExtendedProfile>): Promise<ExtendedProfile> {
    const currentProfile = await this.getProfile(did);
    if (!currentProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile: ExtendedProfile = {
      ...currentProfile,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.saveProfile(updatedProfile);
    return updatedProfile;
  }

  // RÉINITIALISATION COMPLÈTE - Supprime le profil et en crée un nouveau
  async resetProfile(did: string, newRole?: UserRole): Promise<ExtendedProfile> {
    try {
      // Supprimer l'ancien profil
      localStorage.removeItem(`profile_${did}`);
      
      // Créer un nouveau profil vide
      const verification: VerificationStatus = {
        emailVerified: false,
        trustLevel: 'unverified',
        verificationScore: 0,
        badges: [],
        roleVerified: false
      };

      const resetProfile: ExtendedProfile = {
        did,
        role: newRole || 'owner',
        verification,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await this.saveProfile(resetProfile);
      return resetProfile;
    } catch (error) {
      console.error('Error resetting profile:', error);
      throw error;
    }
  }

  // RÉINITIALISATION PARTIELLE - Garde le rôle mais réinitialise les autres infos
  async resetProfileData(did: string): Promise<ExtendedProfile> {
    try {
      const currentProfile = await this.getProfile(did);
      if (!currentProfile) {
        throw new Error('Profile not found');
      }

      const resetProfile: ExtendedProfile = {
        did,
        role: currentProfile.role, // Garde le rôle actuel
        verification: {
          emailVerified: false,
          trustLevel: 'unverified',
          verificationScore: 0,
          badges: [],
          roleVerified: false
        },
        createdAt: currentProfile.createdAt, // Garde la date de création
        updatedAt: new Date().toISOString()
      };

      await this.saveProfile(resetProfile);
      return resetProfile;
    } catch (error) {
      console.error('Error resetting profile data:', error);
      throw error;
    }
  }

  // RÉINITIALISATION DE VÉRIFICATION - Garde les infos mais réinitialise la vérification
  async resetVerification(did: string): Promise<ExtendedProfile> {
    try {
      const currentProfile = await this.getProfile(did);
      if (!currentProfile) {
        throw new Error('Profile not found');
      }

      const resetProfile: ExtendedProfile = {
        ...currentProfile,
        verification: {
          emailVerified: false,
          trustLevel: 'unverified',
          verificationScore: 0,
          badges: [],
          roleVerified: false
        },
        updatedAt: new Date().toISOString()
      };

      await this.saveProfile(resetProfile);
      return resetProfile;
    } catch (error) {
      console.error('Error resetting verification:', error);
      throw error;
    }
  }

  // SUPPRESSION COMPLÈTE - Supprime définitivement le profil
  async deleteProfile(did: string): Promise<boolean> {
    try {
      localStorage.removeItem(`profile_${did}`);
      this.account = null;
      this.did = null;
      return true;
    } catch (error) {
      console.error('Error deleting profile:', error);
      return false;
    }
  }

  // Vérification d'un profil
  async verifyProfile(did: string): Promise<ExtendedProfile | null> {
    try {
      const profile = await this.getProfile(did);
      if (!profile) return null;

      // Simulation de vérification
      const verifiedProfile = { ...profile };
      return verifiedProfile;
    } catch (error) {
      console.error('Error verifying profile:', error);
      return null;
    }
  }

  // Vérification d'un rôle
  async verifyRole(did: string, role: UserRole, verifiedBy: string): Promise<ExtendedProfile | null> {
    try {
      const profile = await this.getProfile(did);
      if (!profile) return null;

      const updatedProfile: ExtendedProfile = {
        ...profile,
        verification: {
          ...profile.verification,
          roleVerified: true,
          roleVerificationDate: new Date().toISOString()
        },
        roleMetadata: {
          ...profile.roleMetadata,
          verifiedBy
        },
        updatedAt: new Date().toISOString()
      };

      await this.saveProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error verifying role:', error);
      return null;
    }
  }

  // Récupération de tous les profils
  async getAllProfiles(): Promise<ExtendedProfile[]> {
    try {
      const profiles: ExtendedProfile[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('profile_')) {
          const profileData = localStorage.getItem(key);
          if (profileData) {
            profiles.push(JSON.parse(profileData));
          }
        }
      }
      return profiles;
    } catch (error) {
      console.error('Error loading all profiles:', error);
      return [];
    }
  }

  // Récupération des profils par rôle
  async getProfilesByRole(role: UserRole): Promise<ExtendedProfile[]> {
    try {
      const allProfiles = await this.getAllProfiles();
      return allProfiles.filter(profile => profile.role === role);
    } catch (error) {
      console.error('Error loading profiles by role:', error);
      return [];
    }
  }

  // Méthodes utilitaires
  getCurrentAccount(): string | null {
    return this.account;
  }

  getCurrentDID(): string | null {
    return this.did;
  }

  disconnect(): void {
    this.account = null;
    this.did = null;
  }
} 