import { VerificationStatus, VerificationBadge, ExtendedProfile } from '@/types/profile';

export class VerificationService {
  private static instance: VerificationService;

  static getInstance(): VerificationService {
    if (!VerificationService.instance) {
      VerificationService.instance = new VerificationService();
    }
    return VerificationService.instance;
  }

  // Vérification d'email (simulation pour MVP)
  async verifyEmail(email: string): Promise<boolean> {
    // Simulation d'une vérification d'email
    // En production, tu enverrais un code par email
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simule une vérification réussie
        resolve(true);
      }, 1000);
    });
  }

  // Calcul du score de vérification
  calculateVerificationScore(profile: ExtendedProfile): number {
    let score = 0;

    // Email vérifié
    if (profile.verification.emailVerified) {
      score += 30;
    }

    // Nom fourni
    if (profile.name) {
      score += 20;
    }

    // Email fourni
    if (profile.email) {
      score += 15;
    }

    // Assurance fournie
    if (profile.insurance) {
      score += 15;
    }

    // Badges gagnés
    score += profile.verification.badges.length * 5;

    return Math.min(score, 100);
  }

  // Détermination du niveau de confiance
  calculateTrustLevel(score: number): VerificationStatus['trustLevel'] {
    if (score >= 80) return 'premium';
    if (score >= 60) return 'verified';
    if (score >= 30) return 'basic';
    return 'unverified';
  }

  // Création d'un badge de vérification
  createBadge(
    id: string,
    name: string,
    description: string,
    icon: string
  ): VerificationBadge {
    return {
      id,
      name,
      description,
      icon,
      earnedAt: new Date().toISOString(),
      verified: true
    };
  }

  // Vérification complète d'un profil
  async verifyProfile(profile: ExtendedProfile): Promise<ExtendedProfile> {
    const updatedVerification = { ...profile.verification };

    // Vérification email si pas encore fait
    if (profile.email && !updatedVerification.emailVerified) {
      const emailVerified = await this.verifyEmail(profile.email);
      updatedVerification.emailVerified = emailVerified;
      
      if (emailVerified) {
        updatedVerification.emailVerificationDate = new Date().toISOString();
        
        // Ajout du badge email vérifié
        const emailBadge = this.createBadge(
          'email-verified',
          'Email Vérifié',
          'Adresse email confirmée',
          '📧'
        );
        updatedVerification.badges.push(emailBadge);
      }
    }

    // Calcul du nouveau score
    const newScore = this.calculateVerificationScore({
      ...profile,
      verification: updatedVerification
    });
    updatedVerification.verificationScore = newScore;

    // Mise à jour du niveau de confiance
    updatedVerification.trustLevel = this.calculateTrustLevel(newScore);

    // Ajout de badges basés sur le score
    if (newScore >= 50 && !updatedVerification.badges.find(b => b.id === 'basic-verified')) {
      const basicBadge = this.createBadge(
        'basic-verified',
        'Profil Basique',
        'Profil avec informations de base',
        '✅'
      );
      updatedVerification.badges.push(basicBadge);
    }

    if (newScore >= 80 && !updatedVerification.badges.find(b => b.id === 'premium-verified')) {
      const premiumBadge = this.createBadge(
        'premium-verified',
        'Profil Premium',
        'Profil hautement vérifié',
        '⭐'
      );
      updatedVerification.badges.push(premiumBadge);
    }

    return {
      ...profile,
      verification: updatedVerification,
      updatedAt: new Date().toISOString()
    };
  }

  // Vérification d'un profil par DID (pour affichage public)
  async verifyProfileByDID(did: string): Promise<ExtendedProfile | null> {
    // En production, tu récupérerais le profil depuis Self.ID/Ceramic
    // Pour le MVP, on utilise localStorage
    try {
      const profileData = localStorage.getItem(`profile_${did}`);
      if (profileData) {
        const profile: ExtendedProfile = JSON.parse(profileData);
        return await this.verifyProfile(profile);
      }
      return null;
    } catch (error) {
      console.error('Error verifying profile by DID:', error);
      return null;
    }
  }

  // Génération d'un rapport de vérification
  generateVerificationReport(profile: ExtendedProfile): string {
    const { verification } = profile;
    
    let report = `# Rapport de Vérification\n\n`;
    report += `**DID:** ${profile.did}\n`;
    report += `**Niveau de confiance:** ${verification.trustLevel}\n`;
    report += `**Score de vérification:** ${verification.verificationScore}/100\n\n`;
    
    report += `## Badges obtenus:\n`;
    verification.badges.forEach(badge => {
      report += `- ${badge.icon} **${badge.name}**: ${badge.description}\n`;
    });
    
    report += `\n## Informations vérifiées:\n`;
    report += `- Email: ${verification.emailVerified ? '✅ Vérifié' : '❌ Non vérifié'}\n`;
    report += `- Nom: ${profile.name ? '✅ Fourni' : '❌ Manquant'}\n`;
    report += `- Assurance: ${profile.insurance ? '✅ Fournie' : '❌ Manquante'}\n`;
    
    return report;
  }
} 