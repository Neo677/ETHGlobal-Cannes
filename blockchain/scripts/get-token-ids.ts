import hre from "hardhat";
import dotenv from "dotenv";
const { ethers } = hre;

// Charger les variables d'environnement
dotenv.config();

async function main() {
  console.log("🔍 Récupération des Token IDs...");

  const contractAddress = "0x5306F72787c36FaAB04b3EBa90B8eFaa52c605C3";
  
  // ABI correct pour le contrat CarteGriseNFT
  const ABI = [
    "function ownerOf(uint256 tokenId) public view returns (address)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
    "function isConcessionnaire(address user) public view returns (bool)"
  ];

  try {
    // Créer le provider
    const provider = new ethers.JsonRpcProvider("https://testnet.sapphire.oasis.dev");
    
    // Créer l'instance du contrat
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    
    // Vérifier si l'adresse de déploiement est concessionnaire
    const deployerAddress = "0x45Fc1c58Aec2Dd8ea6a65574168C2C768Ef7Aca4";
    const isConcessionnaire = await contract.isConcessionnaire(deployerAddress);
    console.log("🏪 Déployeur est concessionnaire:", isConcessionnaire);
    
    // Récupérer la balance du déployeur
    const balance = await contract.balanceOf(deployerAddress);
    console.log("📊 Balance du déployeur:", balance.toString());
    
    // Récupérer les Token IDs possédés
    console.log("\n🎯 Token IDs possédés par le déployeur:");
    for (let i = 0; i < balance; i++) {
      try {
        const tokenId = await contract.tokenOfOwnerByIndex(deployerAddress, i);
        console.log(`Token ID ${i}: ${tokenId.toString()}`);
      } catch (error) {
        console.log(`Erreur pour l'index ${i}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    // Essayer de trouver d'autres Token IDs (0, 1, 2, etc.)
    console.log("\n🔍 Recherche de tous les Token IDs possibles:");
    for (let i = 0; i < 10; i++) {
      try {
        const owner = await contract.ownerOf(i);
        console.log(`Token ID ${i} → Propriétaire: ${owner}`);
      } catch (error) {
        console.log(`Token ID ${i} → N'existe pas ou erreur`);
      }
    }
    
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erreur:", error);
    process.exit(1);
  }); 