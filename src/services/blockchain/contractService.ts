import { PrivyService } from './privyService';

// ABI du contrat CarteGriseNFT (à générer avec Hardhat)
const CARTE_GRISE_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "vin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "brand",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "mileage",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintCarteGrise",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "setConcessionnaire",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isConcessionnaire",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export interface VehicleData {
  vin: string;
  brand: string;
  model: string;
  mileage: number;
  tokenURI: string;
}

export class ContractService {
  private static instance: ContractService;
  private privyService: PrivyService;

  constructor() {
    this.privyService = PrivyService.getInstance();
  }

  static getInstance(): ContractService {
    if (!ContractService.instance) {
      ContractService.instance = new ContractService();
    }
    return ContractService.instance;
  }

  // Récupérer l'adresse du contrat depuis les variables d'environnement
  private getContractAddress(): string {
    const address = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
    if (!address) {
      throw new Error("Adresse du contrat NFT non configurée");
    }
    return address;
  }

  // Préparer l'interaction avec le contrat (sans exécuter)
  async prepareContractInteraction() {
    try {
      const signer = await this.privyService.getSigner();
      const contractAddress = this.getContractAddress();
      
      // Créer l'instance du contrat
      const contract = {
        address: contractAddress,
        abi: CARTE_GRISE_ABI,
        signer: signer
      };

      return {
        contract,
        signerAddress: await this.privyService.getAddress(),
        contractAddress,
        ready: true
      };
    } catch (error) {
      console.error("Erreur lors de la préparation du contrat:", error);
      throw error;
    }
  }

  // Vérifier si l'utilisateur est concessionnaire
  async checkConcessionnaireStatus(address: string): Promise<boolean> {
    try {
      const { contract } = await this.prepareContractInteraction();
      
      // Simulation pour le moment (pas d'appel réel)
      console.log("Vérification du statut concessionnaire pour:", address);
      return true; // Simulation
    } catch (error) {
      console.error("Erreur lors de la vérification du statut:", error);
      return false;
    }
  }

  // Préparer le mint (sans l'exécuter)
  async prepareMint(vehicleData: VehicleData, recipientAddress: string) {
    try {
      const { contract, signerAddress } = await this.prepareContractInteraction();
      
      // Vérifier le statut concessionnaire
      const isConcessionnaire = await this.checkConcessionnaireStatus(signerAddress);
      if (!isConcessionnaire) {
        throw new Error("Seuls les concessionnaires peuvent minter des NFTs");
      }

      return {
        contract,
        signerAddress,
        recipientAddress,
        vehicleData,
        ready: true,
        canMint: true
      };
    } catch (error) {
      console.error("Erreur lors de la préparation du mint:", error);
      throw error;
    }
  }

  // Lire les données d'un véhicule (public)
  async getVehicleData(tokenId: number) {
    try {
      const { contract } = await this.prepareContractInteraction();
      
      // Simulation pour le moment
      console.log("Lecture des données du véhicule pour le token:", tokenId);
      return {
        tokenId,
        vin: "VIN123456789",
        brand: "Honda",
        model: "Civic",
        mileage: 15000
      };
    } catch (error) {
      console.error("Erreur lors de la lecture des données véhicule:", error);
      throw error;
    }
  }
}
