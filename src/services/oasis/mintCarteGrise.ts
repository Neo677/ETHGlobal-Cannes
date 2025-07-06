import { ethers } from 'ethers';

// ABI pour le contrat CarteGriseNFT
const CARTE_GRISE_ABI = [
  "function mintCarteGrise(address to, string memory vin, string memory brand, string memory model, uint256 mileage, string memory tokenURI) public returns (uint256)",
  "function isConcessionnaire(address user) public view returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export interface MintData {
  vin: string;
  brand: string;
  model: string;
  mileage: number;
  imageFile?: File;
}

export interface MintResult {
  success: boolean;
  tokenId?: number;
  transactionHash?: string;
  error?: string;
}

class MintCarteGriseService {
  private contractAddress: string;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.contractAddress = process.env.NEXT_PUBLIC_CARTE_GRISE_NFT_ADDRESS || '';
  }

  /**
   * Initialize with Privy signer
   */
  async initialize(privySigner: any): Promise<boolean> {
    try {
      this.signer = privySigner;
      console.log('✅ MintCarteGriseService initialized');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize MintCarteGriseService:', error);
      return false;
    }
  }

  /**
   * Create metadata for the NFT
   */
  private async createMetadata(mintData: MintData): Promise<string> {
    const { vin, brand, model, mileage } = mintData;

    // Create metadata object
    const metadata = {
      name: `${brand} ${model} (${vin})`,
      description: `Carte Grise NFT for ${brand} ${model} with VIN ${vin}`,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNBUlRFIEdSSVNFPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WSU46IHt2aW59PC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CcmFuZDoge2JyYW5kfTwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIyOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TW9kZWw6IHttb2RlbH08L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1pbGVhZ2U6IHttaWxlYWdlfSBrbTwvdGV4dD4KPC9zdmc+",
      attributes: [
        { trait_type: 'Brand', value: brand },
        { trait_type: 'Model', value: model },
        { trait_type: 'VIN', value: vin },
        { trait_type: 'Mileage', value: mileage },
        { trait_type: 'Blockchain', value: 'Oasis Sapphire' },
        { trait_type: 'Token Standard', value: 'ERC721' }
      ],
      external_url: "https://metacartag.vercel.app",
      background_color: "ffffff"
    };

    // Convert to base64 for data URI
    const jsonString = JSON.stringify(metadata, null, 2);
    const base64 = btoa(jsonString);
    return `data:application/json;base64,${base64}`;
  }

  /**
   * Check if user is concessionnaire
   */
  async checkConcessionnaireStatus(userAddress: string): Promise<boolean> {
    try {
      if (!this.contractAddress) {
        throw new Error('Contract address not configured');
      }

      const provider = new ethers.JsonRpcProvider("https://testnet.sapphire.oasis.dev");
      const contract = new ethers.Contract(this.contractAddress, CARTE_GRISE_ABI, provider);
      
      const isConcessionnaire = await contract.isConcessionnaire(userAddress);
      return isConcessionnaire;
    } catch (error) {
      console.error('Error checking concessionnaire status:', error);
      return false;
    }
  }

  /**
   * Mint NFT
   */
  async mintNFT(mintData: MintData): Promise<MintResult> {
    try {
      if (!this.signer || !this.contractAddress) {
        throw new Error('Service not initialized or contract address not set');
      }

      // Get user address
      const userAddress = await this.signer.getAddress();
      console.log('👤 Minting for address:', userAddress);

      // Check concessionnaire status
      const isConcessionnaire = await this.checkConcessionnaireStatus(userAddress);
      if (!isConcessionnaire) {
        throw new Error('User is not authorized as concessionnaire');
      }

      // Create metadata
      console.log('📝 Creating metadata...');
      const tokenURI = await this.createMetadata(mintData);

      // Get contract instance
      const contract = new ethers.Contract(this.contractAddress, CARTE_GRISE_ABI, this.signer);

      // Mint NFT
      console.log('🚀 Minting NFT...');
      const mintTx = await contract.mintCarteGrise(
        userAddress,
        mintData.vin,
        mintData.brand,
        mintData.model,
        mintData.mileage,
        tokenURI
      );

      // Wait for transaction
      const receipt = await mintTx.wait();
      console.log('✅ Transaction confirmed:', receipt.hash);

      // Get token ID from event
      const transferEvent = receipt.logs.find((log: any) => 
        log.eventName === 'Transfer' && log.args.from === ethers.ZeroAddress
      );
      
      const tokenId = transferEvent ? transferEvent.args.tokenId : null;

      console.log('🎉 NFT minted successfully:', {
        tokenId: tokenId?.toString(),
        transactionHash: receipt.hash,
        tokenURI
      });

      return {
        success: true,
        tokenId: tokenId ? Number(tokenId) : undefined,
        transactionHash: receipt.hash,
      };

    } catch (error) {
      console.error('❌ Mint failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Mint failed',
      };
    }
  }

  /**
   * Mock mint for testing
   */
  async mockMint(mintData: MintData): Promise<MintResult> {
    console.log('🎭 Mock minting NFT:', mintData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTokenId = Math.floor(Math.random() * 1000) + 1;
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`;

    return {
      success: true,
      tokenId: mockTokenId,
      transactionHash: mockTxHash,
    };
  }
}

export const mintCarteGriseService = new MintCarteGriseService(); 