import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("🔐 Déploiement sécurisé avec Privy...");
  console.log("📋 Instructions:");
  console.log("1. Assure-toi d'être connecté avec Privy dans ton navigateur");
  console.log("2. Le script va demander confirmation pour le déploiement");
  console.log("3. Tu devras signer la transaction dans ton wallet Privy");
  
  // Vérifier la configuration
  if (!process.env.PRIVY_APP_ID) {
    throw new Error("❌ PRIVY_APP_ID non définie dans .env");
  }

  console.log("\n🚀 Déploiement du contrat CarteGriseNFT...");

  // Récupérer le contrat factory
  const CarteGriseNFT = await ethers.getContractFactory("CarteGriseNFT");
  
  console.log("📦 Déploiement en cours...");
  console.log("⚠️  Tu vas recevoir une demande de signature dans ton wallet...");
  
  // Déployer le contrat
  const contract = await CarteGriseNFT.deploy();
  await contract.waitForDeployment();
  
  // Récupérer l'adresse du contrat déployé
  const address = await contract.getAddress();
  
  console.log("✅ CarteGriseNFT déployé avec succès!");
  console.log("📍 Adresse du contrat:", address);
  console.log("🔗 Explorer Testnet:", `https://explorer.testnet.oasis.io/mainnet/address/${address}`);
  
  // Récupérer le signer pour configurer le concessionnaire
  const [deployer] = await ethers.getSigners();
  
  // Configurer le premier concessionnaire
  console.log("⚙️ Configuration du concessionnaire...");
  console.log("⚠️  Nouvelle demande de signature pour configurer le concessionnaire...");
  
  const tx = await contract.setConcessionnaire(deployer.address, true);
  await tx.wait();
  
  console.log("✅ Concessionnaire configuré:", deployer.address);
  
  // Vérifier la configuration
  const isConcessionnaire = await contract.isConcessionnaire(deployer.address);
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