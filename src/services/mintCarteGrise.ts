import { usePrivy } from '@privy-io/react-auth';
import { CarteGriseNFT__factory } from '@/typechain-types/factories/contracts/CarteGriseNFT__factory';

// Contract address on Oasis Sapphire testnet
const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890'; // Replace with actual deployed address

export interface VehicleData {
  brand: string;
  model: string;
  mileage: number;
  vin: string;
  year: number;
  color: string;
  licensePlate: string;
  description?: string;
}

export interface MintResult {
  success: boolean;
  tokenId?: string;
  transactionHash?: string;
  error?: string;
}

export const mintCarteGrise = async (
  vehicleData: VehicleData,
  signer: any
): Promise<MintResult> => {
  try {
    // Create contract instance
    const contract = CarteGriseNFT__factory.connect(CONTRACT_ADDRESS, signer);

    // Create metadata object
    const metadata = {
      name: `${vehicleData.brand} ${vehicleData.model}`,
      description: vehicleData.description || `Vehicle NFT for ${vehicleData.brand} ${vehicleData.model}`,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzNzQxNTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WZWhpY2xlIE5GVDwvdGV4dD4KPC9zdmc+', // Base64 encoded simple SVG
      attributes: [
        { trait_type: 'Brand', value: vehicleData.brand },
        { trait_type: 'Model', value: vehicleData.model },
        { trait_type: 'Year', value: vehicleData.year },
        { trait_type: 'Color', value: vehicleData.color },
        { trait_type: 'Mileage', value: vehicleData.mileage },
        { trait_type: 'VIN', value: vehicleData.vin },
        { trait_type: 'License Plate', value: vehicleData.licensePlate },
      ]
    };

    // Encode metadata to base64
    const metadataJson = JSON.stringify(metadata);
    const metadataBase64 = btoa(metadataJson);

    // Call the mint function
    const tx = await contract.mintCarteGrise(metadataBase64);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();

    // Get the token ID from the transaction receipt
    const tokenId = receipt.logs?.[0]?.topics?.[3];
    const decodedTokenId = tokenId ? parseInt(tokenId, 16).toString() : 'unknown';

    return {
      success: true,
      tokenId: decodedTokenId,
      transactionHash: tx.hash,
    };
  } catch (error) {
    console.error('Minting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Hook for using the mint service
export const useMintCarteGrise = () => {
  const { user, authenticated } = usePrivy();

  const mint = async (vehicleData: VehicleData): Promise<MintResult> => {
    if (!authenticated || !user?.wallet) {
      return {
        success: false,
        error: 'User not authenticated or wallet not available',
      };
    }

    try {
      const signer = await user.wallet.getEthersProvider().getSigner();
      return await mintCarteGrise(vehicleData, signer);
    } catch (error) {
      console.error('Error getting signer:', error);
      return {
        success: false,
        error: 'Failed to get wallet signer',
      };
    }
  };

  return { mint, isAuthenticated: authenticated };
}; 