import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { mintCarteGriseService, MintData, MintResult } from '../services/oasis/mintCarteGrise';

export const useMintCarteGrise = () => {
  const { user, authenticated } = usePrivy();
  const [isMinting, setIsMinting] = useState(false);
  const [lastResult, setLastResult] = useState<MintResult | null>(null);

  const mintNFT = async (mintData: MintData): Promise<MintResult> => {
    if (!authenticated || !user || !user.wallet) {
      return {
        success: false,
        error: 'User not authenticated or wallet not available'
      };
    }

    setIsMinting(true);
    setLastResult(null);

    try {
      // Initialize service with Privy signer
      const signer = user.wallet;
      const initialized = await mintCarteGriseService.initialize(signer);
      
      if (!initialized) {
        throw new Error('Failed to initialize mint service');
      }

      // Mint NFT
      const result = await mintCarteGriseService.mintNFT(mintData);
      setLastResult(result);
      
      return result;

    } catch (error) {
      const errorResult: MintResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Mint failed'
      };
      setLastResult(errorResult);
      return errorResult;
    } finally {
      setIsMinting(false);
    }
  };

  const mockMint = async (mintData: MintData): Promise<MintResult> => {
    setIsMinting(true);
    setLastResult(null);

    try {
      const result = await mintCarteGriseService.mockMint(mintData);
      setLastResult(result);
      return result;
    } catch (error) {
      const errorResult: MintResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Mock mint failed'
      };
      setLastResult(errorResult);
      return errorResult;
    } finally {
      setIsMinting(false);
    }
  };

  return {
    mintNFT,
    mockMint,
    isMinting,
    lastResult,
    isAuthenticated: authenticated,
    userAddress: user?.wallet?.address
  };
}; 