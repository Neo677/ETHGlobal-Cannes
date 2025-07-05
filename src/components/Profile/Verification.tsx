import React, { useState } from 'react';
import { ExtendedProfile, VerificationBadge } from '@/types/profile';
import TrustBadge from './TrustBadge';

interface VerificationProps {
  profile: ExtendedProfile;
  onVerify: () => Promise<void>;
  loading?: boolean;
}

const Verification: React.FC<VerificationProps> = ({ profile, onVerify, loading = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { verification } = profile;

  const getVerificationSteps = () => {
    const steps = [
      {
        id: 'email',
        title: 'Vérification Email',
        completed: verification.emailVerified,
        required: true,
        description: 'Confirmer votre adresse email'
      },
      {
        id: 'name',
        title: 'Nom fourni',
        completed: !!profile.name,
        required: true,
        description: 'Ajouter votre nom complet'
      },
      {
        id: 'insurance',
        title: 'Assurance',
        completed: !!profile.insurance,
        required: false,
        description: 'Ajouter votre assurance'
      }
    ];

    return steps;
  };

  const steps = getVerificationSteps();
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Vérification du Profil</h3>
        <TrustBadge 
          level={verification.trustLevel} 
          score={verification.verificationScore}
          showDetails={true}
        />
      </div>

      {/* Progression */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progression</span>
          <span>{completedSteps}/{totalSteps} étapes</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Étapes de vérification */}
      <div className="space-y-3 mb-6">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
              step.completed 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step.completed ? '✓' : step.required ? '!' : '○'}
            </div>
            <div className="flex-1">
              <div className="font-medium">{step.title}</div>
              <div className="text-sm text-gray-500">{step.description}</div>
            </div>
            {step.required && !step.completed && (
              <span className="text-xs text-red-500 font-medium">Requis</span>
            )}
          </div>
        ))}
      </div>

      {/* Badges obtenus */}
      {verification.badges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3">Badges obtenus</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {verification.badges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                <span className="text-lg">{badge.icon}</span>
                <div>
                  <div className="font-medium text-sm">{badge.name}</div>
                  <div className="text-xs text-gray-500">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton de vérification */}
      {verification.trustLevel === 'unverified' && (
        <button
          onClick={onVerify}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? 'Vérification en cours...' : 'Vérifier mon profil'}
        </button>
      )}

      {/* Détails optionnels */}
      <div className="mt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>
        
        {showDetails && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
            <div className="space-y-2">
              <div>
                <strong>Email vérifié:</strong> {verification.emailVerified ? 'Oui' : 'Non'}
                {verification.emailVerificationDate && (
                  <span className="text-gray-500 ml-2">
                    (le {new Date(verification.emailVerificationDate).toLocaleDateString()})
                  </span>
                )}
              </div>
              <div>
                <strong>Score de vérification:</strong> {verification.verificationScore}/100
              </div>
              <div>
                <strong>Niveau de confiance:</strong> {verification.trustLevel}
              </div>
              <div>
                <strong>Badges:</strong> {verification.badges.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification; 