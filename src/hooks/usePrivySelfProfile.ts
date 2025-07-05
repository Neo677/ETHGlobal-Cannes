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
import { SelfID } from '@self.id/web';
import { ethers } from 'ethers';

export interface BasicProfile {
  name?: string;
  email?: string;
  insurance?: string;
  publicName?: boolean;
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
  const [user, setUser] = useState(null);
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

  const getEthersProvider = async () => {
    // Provider de test pour le développement
    return new ethers.BrowserProvider(window.ethereum || {});
  };

  return {
    login,
    logout,
    authenticated,
    user,
    ready,
    getEthersProvider,
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
    getEthersProvider,
  } = usePrivyHook();

  const [self, setSelf] = useState<SelfID | null>(null);
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

      // Récupérer le provider ethers depuis Privy
      const provider = await getEthersProvider();
      if (!provider) {
        throw new Error('Failed to get Privy provider');
      }

      // Créer le signer
      const signerInstance = provider.getSigner();
      setSigner(signerInstance);

      // Récupérer l'adresse du compte
      const address = await signerInstance.getAddress();

      // Authentifier Self.ID avec le signer Privy
      const selfInstance = await SelfID.authenticate({
        client: {
          ceramic: process.env.NEXT_PUBLIC_SELF_CERAMIC_API_URL || 'https://ceramic-clay.3boxlabs.com',
        },
        session: {
          signer: signerInstance,
        },
      });
      setSelf(selfInstance);

      // Récupérer le DID
      const did = selfInstance.did;

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
  }, [getEthersProvider]);

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
      setSelf(null);
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

  // Lire le profil Self.ID
  const readProfile = useCallback(async (targetDid?: string) => {
    if (!self) {
      throw new Error('Self.ID not authenticated');
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: undefined }));

      const did = targetDid || self.did;
      const profile = await self.get('basicProfile', did);

      if (!targetDid) {
        // Mise à jour du profil local
        setState(prev => ({
          ...prev,
          profile: profile || {},
          loading: false,
        }));
      }

      return profile;
    } catch (error) {
      console.error('Error reading profile:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to read profile',
      }));
      throw error;
    }
  }, [self]);

  // Écrire le profil Self.ID
  const writeProfile = useCallback(async (data: BasicProfile) => {
    if (!self) {
      throw new Error('Self.ID not authenticated');
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: undefined }));

      // Mettre à jour le profil
      await self.set('basicProfile', data);

      // Recharger le profil
      const updatedProfile = await self.get('basicProfile');
      
      setState(prev => ({
        ...prev,
        profile: updatedProfile || {},
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
  }, [self]);

  // Charger automatiquement le profil après authentification
  useEffect(() => {
    if (state.isAuthenticated && self && !state.profile) {
      readProfile().catch(console.error);
    }
  }, [state.isAuthenticated, self, readProfile]);

  return {
    // État
    ...state,
    
    // Instances
    self,
    signer,
    
    // Actions
    connect,
    disconnect,
    readProfile,
    writeProfile,
  };
}; 