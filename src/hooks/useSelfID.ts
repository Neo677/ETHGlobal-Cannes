import { useState, useEffect, useCallback } from 'react';
import { SelfIDService } from '@/services/selfIDService';
import { VerificationService } from '@/services/verificationService';
import { ExtendedProfile, BasicProfile, UserRole } from '@/types/profile';

export const useSelfID = () => {
  const [account, setAccount] = useState<string>('');
  const [did, setDid] = useState<string>('');
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const selfIDService = SelfIDService.getInstance();
  const verificationService = VerificationService.getInstance();

  // Connexion wallet
  const connectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const { account, did } = await selfIDService.connectWallet();
      setAccount(account);
      setDid(did);

      // Charger le profil existant ou en créer un nouveau
      const existingProfile = await selfIDService.getProfile(did);
      if (existingProfile) {
        setProfile(existingProfile);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  }, []);

  // Création d'un nouveau profil avec rôle
  const createProfile = useCallback(async (basicProfile: BasicProfile, role: UserRole = 'owner') => {
    if (!did) return;

    try {
      setLoading(true);
      setError('');

      const newProfile = await selfIDService.createProfile(did, basicProfile, role);
      setProfile(newProfile);

      return newProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [did]);

  // Mise à jour du profil
  const updateProfile = useCallback(async (updates: Partial<ExtendedProfile>) => {
    if (!did || !profile) return;

    try {
      setLoading(true);
      setError('');

      const updatedProfile = await selfIDService.updateProfile(did, updates);
      setProfile(updatedProfile);

      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [did, profile]);

  // RÉINITIALISATION COMPLÈTE
  const resetProfile = useCallback(async (newRole?: UserRole) => {
    if (!did) return;

    try {
      setLoading(true);
      setError('');

      const resetProfile = await selfIDService.resetProfile(did, newRole);
      setProfile(resetProfile);

      return resetProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [did]);

  // RÉINITIALISATION PARTIELLE (garde le rôle)
  const resetProfileData = useCallback(async () => {
    if (!did) return;

    try {
      setLoading(true);
      setError('');

      const resetProfile = await selfIDService.resetProfileData(did);
      setProfile(resetProfile);

      return resetProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset profile data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [did]);

  // RÉINITIALISATION DE VÉRIFICATION
  const resetVerification = useCallback(async () => {
    if (!did) return;

    try {
      setLoading(true);
      setError('');

      const resetProfile = await selfIDService.resetVerification(did);
      setProfile(resetProfile);

      return resetProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset verification');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [did]);

  // SUPPRESSION COMPLÈTE
  const deleteProfile = useCallback(async () => {
    if (!did) return;

    try {
      setLoading(true);
      setError('');

      const success = await selfIDService.deleteProfile(did);
      if (success) {
        setProfile(null);
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete profile');
      return false;
    } finally {
      setLoading(false);
    }
  }, [did]);

  // Vérification du profil
  const verifyProfile = useCallback(async () => {
    if (!profile) return;

    try {
      setLoading(true);
      setError('');

      const verifiedProfile = await verificationService.verifyProfile(profile);
      await selfIDService.saveProfile(verifiedProfile);
      setProfile(verifiedProfile);

      return verifiedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [profile]);

  // Vérification du rôle
  const verifyRole = useCallback(async (targetDid: string, role: UserRole) => {
    if (!did) return null;

    try {
      setLoading(true);
      setError('');

      const verifiedProfile = await selfIDService.verifyRole(targetDid, role, did);
      return verifiedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify role');
      return null;
    } finally {
      setLoading(false);
    }
  }, [did]);

  // Lecture d'un profil par DID
  const loadProfileByDID = useCallback(async (targetDid: string) => {
    try {
      setLoading(true);
      setError('');

      const loadedProfile = await verificationService.verifyProfileByDID(targetDid);
      return loadedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupération de tous les profils (pour admin/assureur)
  const getAllProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const profiles = await selfIDService.getAllProfiles();
      return profiles;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupération des profils par rôle
  const getProfilesByRole = useCallback(async (role: UserRole) => {
    try {
      setLoading(true);
      setError('');

      const profiles = await selfIDService.getProfilesByRole(role);
      return profiles;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles by role');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Signature de données
  const signData = useCallback(async (data: any) => {
    try {
      setLoading(true);
      setError('');

      const signature = await selfIDService.signData(data);
      return signature;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Vérification de signature
  const verifySignature = useCallback(async (data: any, signature: string, address: string) => {
    try {
      const isValid = await selfIDService.verifySignature(data, signature, address);
      return isValid;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify signature');
      return false;
    }
  }, []);

  // Déconnexion
  const disconnect = useCallback(() => {
    selfIDService.disconnect();
    setAccount('');
    setDid('');
    setProfile(null);
    setError('');
  }, []);

  // Chargement initial
  useEffect(() => {
    const currentAccount = selfIDService.getCurrentAccount();
    const currentDID = selfIDService.getCurrentDID();
    
    if (currentAccount && currentDID) {
      setAccount(currentAccount);
      setDid(currentDID);
      
      // Charger le profil
      selfIDService.getProfile(currentDID).then(profile => {
        if (profile) {
          setProfile(profile);
        }
      });
    }
  }, []);

  return {
    // État
    account,
    did,
    profile,
    loading,
    error,
    
    // Actions
    connectWallet,
    createProfile,
    updateProfile,
    resetProfile,
    resetProfileData,
    resetVerification,
    deleteProfile,
    verifyProfile,
    verifyRole,
    loadProfileByDID,
    getAllProfiles,
    getProfilesByRole,
    signData,
    verifySignature,
    disconnect,
    
    // Utilitaires
    isConnected: !!account,
    hasProfile: !!profile,
    trustLevel: profile?.verification.trustLevel || 'unverified',
    verificationScore: profile?.verification.verificationScore || 0,
    userRole: profile?.role || 'owner'
  };
}; 