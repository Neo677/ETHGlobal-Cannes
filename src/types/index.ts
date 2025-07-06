// Vehicle Types
export interface VehicleData {
  vin: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  owner: string;
  registrationDate: string;
  engineType: string;
  fuelType: string;
  transmission: string;
  licensePlate: string;
}

// NFT Types
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  publicData: Partial<VehicleData>;
  privateData?: any;
}

// User Types
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role: 'seller' | 'owner' | 'admin';
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blockchain Types
export interface ContractConfig {
  address: string;
  network: string;
  abi: any[];
}

export interface TransactionResult {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  blockNumber?: number;
  gasUsed?: number;
}

// Privacy Types
export interface PrivacyConfig {
  publicFields: string[];
  privateFields: string[];
  encryptionKey?: string;
}

// Form Types
export interface MintFormData {
  vehicleData: VehicleData;
  metadata: NFTMetadata;
  privacyConfig: PrivacyConfig;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 