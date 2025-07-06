// Service Privy simplifié pour éviter les erreurs d'import
export class PrivyService {
  private static instance: PrivyService;

  static getInstance(): PrivyService {
    if (!PrivyService.instance) {
      PrivyService.instance = new PrivyService();
    }
    return PrivyService.instance;
  }

  // Récupérer le signer Privy (simulation)
  async getSigner() {
    try {
      // Simulation pour le moment
      console.log("Récupération du signer Privy (simulation)");
      return {
        account: {
          address: "0x" + Math.random().toString(16).substr(2, 40)
        }
      };
    } catch (error) {
      console.error("Erreur lors de la récupération du signer:", error);
      throw error;
    }
  }

  // Récupérer l'adresse du compte
  async getAddress(): Promise<string> {
    try {
      const signer = await this.getSigner();
      return signer.account.address;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'adresse:", error);
      throw error;
    }
  }

  // Vérifier si le wallet est connecté
  async isConnected(): Promise<boolean> {
    try {
      const signer = await this.getSigner();
      return !!signer;
    } catch (error) {
      return false;
    }
  }
}
