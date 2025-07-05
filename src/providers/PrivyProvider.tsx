'use client';

/**
 * PrivyProvider.tsx
 * 
 * Provider Privy pour l'authentification wallet
 * 
 * Setup:
 * 1. Configurer NEXT_PUBLIC_PRIVY_APP_ID dans .env.local
 * 2. Wrapper l'app avec ce provider
 * 
 * Usage:
 * <PrivyProvider>
 *   <YourApp />
 * </PrivyProvider>
 */

import React, { ReactNode } from 'react';

interface PrivyProviderProps {
  children: ReactNode;
}

export const PrivyProvider: React.FC<PrivyProviderProps> = ({ children }) => {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  
  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID not configured');
    return <div>Privy not configured</div>;
  }

  // Fallback si Privy n'est pas disponible
  try {
    const { PrivyProvider: PrivyProviderBase } = require('@privy-io/react-auth');
    
    return (
      <PrivyProviderBase
        appId={appId}
        config={{
          loginMethods: ['email', 'sms'],
          appearance: {
            theme: 'light',
            accentColor: '#3B82F6',
            showWalletLoginFirst: false,
          },
          defaultChain: 1,
          supportedChains: [1, 137, 10],
        }}
      >
        {children}
      </PrivyProviderBase>
    );
  } catch (error) {
    console.error('Privy not available, using fallback:', error);
    return <>{children}</>;
  }
}; 