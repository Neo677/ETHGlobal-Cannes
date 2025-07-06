import { PrivyService } from './privyService';

export interface PublicVehicleData {
  vin: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  tokenURI: string; // IPFS hash pour les métadonnées publiques
}

export interface PrivateVehicleData {
  ownerAddress: string;
  purchasePrice: number;
  maintenanceHistory: string[];
  insuranceDetails: string;
  personalNotes: string;
  secretMetadata: string; // IPFS hash pour les métadonnées privées
}

export interface CompleteVehicleData {
  public: PublicVehicleData;
  private: PrivateVehicleData;
}

export class DataPrivacyService {
  private static instance: DataPrivacyService;
  private privyService: PrivyService;

  constructor() {
    this.privyService = PrivyService.getInstance();
  }

  static getInstance(): DataPrivacyService {
    if (!DataPrivacyService.instance) {
      DataPrivacyService.instance = new DataPrivacyService();
    }
    return DataPrivacyService.instance;
  }

  // Séparer les données en public/privé
  separateVehicleData(rawData: any): CompleteVehicleData {
    const publicData: PublicVehicleData = {
      vin: rawData.vin,
      brand: rawData.brand,
      model: rawData.model,
      year: rawData.year,
      color: rawData.color,
      mileage: rawData.mileage,
      tokenURI: rawData.publicTokenURI || ""
    };

    const privateData: PrivateVehicleData = {
      ownerAddress: rawData.ownerAddress,
      purchasePrice: rawData.purchasePrice,
      maintenanceHistory: rawData.maintenanceHistory || [],
      insuranceDetails: rawData.insuranceDetails,
      personalNotes: rawData.personalNotes,
      secretMetadata: rawData.secretTokenURI || ""
    };

    return {
      public: publicData,
      private: privateData
    };
  }

  // Préparer les métadonnées publiques pour IPFS
  preparePublicMetadata(publicData: PublicVehicleData) {
    return {
      name: `${publicData.brand} ${publicData.model}`,
      description: `Vehicle NFT - ${publicData.brand} ${publicData.model} ${publicData.year}`,
      image: `ipfs://${publicData.tokenURI}`,
      attributes: [
        {
          trait_type: "Brand",
          value: publicData.brand
        },
        {
          trait_type: "Model",
          value: publicData.model
        },
        {
          trait_type: "Year",
          value: publicData.year
        },
        {
          trait_type: "Color",
          value: publicData.color
        },
        {
          trait_type: "Mileage",
          value: publicData.mileage
        },
        {
          trait_type: "VIN",
          value: publicData.vin
        }
      ],
      external_url: "https://metacartag.com"
    };
  }

  // Préparer les métadonnées privées (chiffrées)
  preparePrivateMetadata(privateData: PrivateVehicleData) {
    return {
      owner_address: privateData.ownerAddress,
      purchase_price: privateData.purchasePrice,
      maintenance_history: privateData.maintenanceHistory,
      insurance_details: privateData.insuranceDetails,
      personal_notes: privateData.personalNotes,
      created_at: new Date().toISOString(),
      encrypted: true
    };
  }

  // Vérifier l'accès aux données privées
  async checkPrivateDataAccess(tokenId: number, userAddress: string): Promise<boolean> {
    try {
      // En production, tu vérifierais si l'utilisateur est le propriétaire du NFT
      // ou a les permissions appropriées
      console.log(`Vérification de l'accès aux données privées pour le token ${tokenId}`);
      return true; // Simulation
    } catch (error) {
      console.error("Erreur lors de la vérification de l'accès:", error);
      return false;
    }
  }

  // Récupérer les données publiques (accessibles à tous)
  async getPublicVehicleData(tokenId: number): Promise<PublicVehicleData | null> {
    try {
      // En production, tu récupérerais depuis le smart contract
      console.log(`Récupération des données publiques pour le token ${tokenId}`);
      
      return {
        vin: "1HGBH41JXMN109186",
        brand: "Honda",
        model: "Civic",
        year: 2023,
        color: "Blue",
        mileage: 15000,
        tokenURI: "QmR56Gvq6T5Sj648wycZ7Yy7vgAM5LeM6ygNm8td4PpYej"
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des données publiques:", error);
      return null;
    }
  }

  // Récupérer les données privées (seulement pour le propriétaire)
  async getPrivateVehicleData(tokenId: number, userAddress: string): Promise<PrivateVehicleData | null> {
    try {
      const hasAccess = await this.checkPrivateDataAccess(tokenId, userAddress);
      if (!hasAccess) {
        throw new Error("Accès non autorisé aux données privées");
      }

      // En production, tu récupérerais depuis le smart contract
      console.log(`Récupération des données privées pour le token ${tokenId}`);
      
      return {
        ownerAddress: userAddress,
        purchasePrice: 25000,
        maintenanceHistory: [
          "2023-01-15: Oil change",
          "2023-06-20: Tire rotation"
        ],
        insuranceDetails: "Policy #123456789",
        personalNotes: "Great car, very reliable",
        secretMetadata: "QmSecretHash123456789"
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des données privées:", error);
      return null;
    }
  }

  // Mock upload IPFS
  async mockUploadToIPFS(data: any): Promise<string> {
    // Simule un hash IPFS unique
    return "Qm" + Math.random().toString(36).substring(2, 15);
  }

  // Préparer les données pour le mint
  async prepareMintData(vehicleData: any): Promise<{
    publicTokenURI: string;
    secretMetadata: string;
  }> {
    try {
      const separatedData = this.separateVehicleData(vehicleData);
      // Préparer les métadonnées
      const publicMetadata = this.preparePublicMetadata(separatedData.public);
      const privateMetadata = this.preparePrivateMetadata(separatedData.private);
      // MOCK upload IPFS
      const publicTokenURI = await this.mockUploadToIPFS(publicMetadata);
      const secretMetadata = await this.mockUploadToIPFS(privateMetadata);
      return {
        publicTokenURI,
        secretMetadata,
      };
    } catch (error) {
      console.error("Erreur lors de la préparation des données:", error);
      throw error;
    }
  }
}
