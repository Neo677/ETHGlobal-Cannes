'use client';

/**
 * PrivySelfProvider.tsx
 * 
 * Provider React pour Privy + Self.ID
 * 
 * Setup:
 * 1. Wrapper votre app avec ce provider
 * 2. Utiliser usePrivySelfProfile() dans vos composants
 * 
 * Usage:
 * <PrivySelfProvider>
 *   <YourApp />
 * </PrivySelfProvider>
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { usePrivySelfProfile, BasicProfile } from '@/hooks/usePrivySelfProfile';

interface PrivySelfContextType {
  // État
  isConnected: boolean;
  isAuthenticated: boolean;
  account?: string;
  did?: string;
  profile?: BasicProfile;
  loading: boolean;
  error?: string;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  readProfile: (targetDid?: string) => Promise<BasicProfile | null>;
  writeProfile: (data: BasicProfile) => Promise<BasicProfile | null>;
}

const PrivySelfContext = createContext<PrivySelfContextType | undefined>(undefined);

interface PrivySelfProviderProps {
  children: ReactNode;
}

export const PrivySelfProvider: React.FC<PrivySelfProviderProps> = ({ children }) => {
  const privySelfProfile = usePrivySelfProfile();

  return (
    <PrivySelfContext.Provider value={privySelfProfile}>
      {children}
    </PrivySelfContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const usePrivySelf = () => {
  const context = useContext(PrivySelfContext);
  if (context === undefined) {
    throw new Error('usePrivySelf must be used within a PrivySelfProvider');
  }
  return context;
}; 