import hre from "hardhat";
import dotenv from "dotenv";
const { ethers } = hre;

// Charger les variables d'environnement
dotenv.config();

async function main() {
  console.log("🚀 Déploiement du contrat CarteGriseNFT sur Oasis Sapphire...");

  // Vérifier que la clé privée est configurée
  if (!process.env.PRIVATE_KEY) {
    throw new Error("❌ PRIVATE_KEY non définie dans .env");
  }

  console.log("🔐 Utilisation de la clé privée pour le déploiement...");

  // Créer le provider et le signer
  const provider = new ethers.JsonRpcProvider("https://testnet.sapphire.oasis.dev");
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("👤 Déployeur:", signer.address);

  // Récupérer le contrat factory
  const CarteGriseNFT = await ethers.getContractFactory("CarteGriseNFT", signer);
  
  console.log("📦 Déploiement en cours...");
  
  // Déployer le contrat
  const contract = await CarteGriseNFT.deploy();
  await contract.waitForDeployment();
  
  // Récupérer l'adresse du contrat déployé
  const address = await contract.getAddress();
  
  console.log("✅ CarteGriseNFT déployé avec succès!");
  console.log("📍 Adresse du contrat:", address);
  console.log("🔗 Explorer Testnet:", `https://explorer.testnet.oasis.io/mainnet/address/${address}`);
  console.log("🔗 Explorer Mainnet:", `https://explorer.oasis.io/address/${address}`);
  
  // Configurer le premier concessionnaire (le déployeur)
  console.log("⚙️ Configuration du concessionnaire...");
  const tx = await contract.setConcessionnaire(signer.address, true);
  await tx.wait();
  
  console.log("✅ Concessionnaire configuré:", signer.address);
  
  // Vérifier la configuration
  const isConcessionnaire = await contract.isConcessionnaire(signer.address);
  console.log("✅ Vérification concessionnaire:", isConcessionnaire);
  
  console.log("\n🎉 Déploiement terminé!");
  console.log("📋 Copie cette adresse dans ton .env:");
  console.log(`NEXT_PUBLIC_CARTE_GRISE_NFT_ADDRESS=${address}`);
  
  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erreur lors du déploiement:", error);
    process.exit(1);
  });
