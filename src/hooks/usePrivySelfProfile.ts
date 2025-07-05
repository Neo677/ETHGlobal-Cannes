/**
 * usePrivySelfProfile.ts
 * 
 * Hook pour gérer l'authentification Privy + Self.ID
 * 
 * Setup:
 * 1. npm install @privy-io/react-auth @self.id/web @self.id/framework ethers
 * 2. Configurer les variables d'environnement (PRIVY_APP_ID, SELF_CERAMIC_API_URL)
 * 3. Wrapper l'app avec PrivyProvider + PrivySelfProvider
 * 
 * Usage:
 * const { connect, signer, self, profile, readProfile, writeProfile } = usePrivySelfProfile();
 */

import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { UserRole } from '@/types/profile';

export interface BasicProfile {
  name?: string;
  email?: string;
  insurance?: string;
  publicName?: boolean;
  role?: UserRole;
  vehicleID?: string;
  nftId?: string;
  history?: string[];
  roleMetadata?: {
    companyName?: string;
    licenseNumber?: string;
    businessAddress?: string;
    verifiedBy?: string;
  };
  vehicleInfo?: {
    vehicleID?: string;
    NFT_ID?: string;
    insuranceHistory?: string[];
  };
}

export interface ProfileState {
  isConnected: boolean;
  isAuthenticated: boolean;
  account?: string;
  did?: string;
  profile?: BasicProfile;
  loading: boolean;
  error?: string;
}

// Hook de fallback pour Privy
const usePrivyFallback = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const login = async () => {
    setAuthenticated(true);
    setUser({ id: 'fallback-user', email: { address: 'test@example.com' } });
  };

  const logout = async () => {
    setAuthenticated(false);
    setUser(null);
  };

  return {
    login,
    logout,
    authenticated,
    user,
    ready,
  };
};

export const usePrivySelfProfile = () => {
  // Essayer d'utiliser Privy, sinon utiliser le fallback
  let usePrivyHook;
  try {
    const { usePrivy } = require('@privy-io/react-auth');
    usePrivyHook = usePrivy;
  } catch (error) {
    console.warn('Privy not available, using fallback:', error);
    usePrivyHook = usePrivyFallback;
  }

  const {
    login,
    logout,
    authenticated,
    user,
    ready,
  } = usePrivyHook();

  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [state, setState] = useState<ProfileState>({
    isConnected: false,
    isAuthenticated: false,
    loading: false,
  });

  // Mettre à jour l'état quand Privy change
  useEffect(() => {
    if (ready && authenticated && user) {
      handlePrivyAuthenticated();
    } else if (ready && !authenticated) {
      setState(prev => ({
        ...prev,
        isConnected: false,
        isAuthenticated: false,
        account: undefined,
        did: undefined,
      }));
    }
  }, [ready, authenticated, user]);

  // Gérer l'authentification Privy
  const handlePrivyAuthenticated = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: undefined }));

      // Créer un provider ethers basique pour le développement
      const provider = new ethers.BrowserProvider(window.ethereum || {});
      
      // Créer le signer
      const signerInstance = await provider.getSigner();
      setSigner(signerInstance);

      // Récupérer l'adresse du compte
      const address = await signerInstance.getAddress();

      // Pour le développement, on simule un DID
      const did = `did:ethr:${address}`;

      setState(prev => ({
        ...prev,
        isConnected: true,
        isAuthenticated: true,
        account: address,
        did,
        loading: false,
      }));

    } catch (error) {
      console.error('Error during Privy authentication:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      }));
    }
  }, []);

  // Connexion via Privy
  const connect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: undefined }));
      await login();
    } catch (error) {
      console.error('Error connecting with Privy:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      }));
    }
  }, [login]);

  // Déconnexion
  const disconnect = useCallback(async () => {
    try {
      await logout();
      setSigner(null);
      setState({
        isConnected: false,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  }, [logout]);

  // Lire le profil (simulation pour le développement)
  const readProfile = useCallback(async (targetDid?: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: undefined }));

      // Simulation d'un profil pour le développement
      const mockProfile = {
        name: 'John Doe',
        email: 'john@example.com',
        insurance: 'AXA',
        publicName: true,
        role: 'owner' as UserRole,
        vehicleID: 'VIN123456789',
        nftId: 'NFT_001',
        history: ['Vehicle registered - 2023', 'Insurance updated - 2024'],
        roleMetadata: {
          companyName: 'John Doe Auto',
          licenseNumber: 'LIC123456',
          businessAddress: '123 Main St, City',
        },
        vehicleInfo: {
          vehicleID: 'VIN123456789',
          NFT_ID: 'NFT_001',
          insuranceHistory: ['AXA-2023', 'AXA-2024'],
        },
      };

      setState(prev => ({
        ...prev,
        profile: mockProfile,
        loading: false,
      }));

      return mockProfile;
    } catch (error) {
      console.error('Error reading profile:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to read profile',
      }));
      throw error;
    }
  }, []);

  // Écrire le profil (simulation pour le développement)
  const writeProfile = useCallback(async (data: BasicProfile) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: undefined }));

      // Simulation de l'écriture du profil
      const updatedProfile = { ...data };
      
      setState(prev => ({
        ...prev,
        profile: updatedProfile,
        loading: false,
      }));

      return updatedProfile;
    } catch (error) {
      console.error('Error writing profile:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to write profile',
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    readProfile,
    writeProfile,
    signer,
  };
}; 