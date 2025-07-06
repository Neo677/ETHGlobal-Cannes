import React, { useState } from 'react';
import { UserRole, ROLE_CONFIGS } from '@/types/profile';

interface ProfileResetProps {
  onResetComplete: (newRole?: UserRole) => Promise<void>;
  onResetData: () => Promise<void>;
  onResetVerification: () => Promise<void>;
  onDeleteProfile: () => Promise<void>;
  loading?: boolean;
  currentRole?: UserRole;
}

const ProfileReset: React.FC<ProfileResetProps> = ({
  onResetComplete,
  onResetData,
  onResetVerification,
  onDeleteProfile,
  loading = false,
  currentRole
}) => {
  const [showResetOptions, setShowResetOptions] = useState(false);
  const [selectedNewRole, setSelectedNewRole] = useState<UserRole>('owner');
  const [resetType, setResetType] = useState<'complete' | 'data' | 'verification' | 'delete' | null>(null);

  const handleReset = async () => {
    if (!resetType) return;

    try {
      switch (resetType) {
        case 'complete':
          await onResetComplete(selectedNewRole);
          break;
        case 'data':
          await onResetData();
          break;
        case 'verification':
          await onResetVerification();
          break;
        case 'delete':
          await onDeleteProfile();
          break;
      }
      setShowResetOptions(false);
      setResetType(null);
    } catch (error) {
      console.error('Reset failed:', error);
    }
  };

  const resetOptions = [
    {
      type: 'complete' as const,
      title: '🔄 Réinitialisation Complète',
      description: 'Supprime tout et crée un nouveau profil',
      color: 'bg-red-500 hover:bg-red-600',
      details: 'Supprime toutes les données et crée un profil vide avec un nouveau rôle'
    },
    {
      type: 'data' as const,
      title: '📝 Réinitialisation des Données',
      description: 'Garde le rôle, supprime les infos personnelles',
      color: 'bg-orange-500 hover:bg-orange-600',
      details: 'Conserve le rôle actuel mais supprime nom, email, assurance, etc.'
    },
    {
      type: 'verification' as const,
      title: '✅ Réinitialisation de Vérification',
      description: 'Garde les infos, supprime la vérification',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      details: 'Conserve toutes les données mais réinitialise les badges et la vérification'
    },
    {
      type: 'delete' as const,
      title: '🗑️ Suppression Complète',
      description: 'Supprime définitivement le profil',
      color: 'bg-gray-500 hover:bg-gray-600',
      details: 'Supprime complètement le profil du système'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Réinitialisation du Profil</h2>
        <button
          onClick={() => setShowResetOptions(!showResetOptions)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showResetOptions ? 'Annuler' : 'Options de Reset'}
        </button>
      </div>

      {showResetOptions && (
        <div className="space-y-4">
          {/* Options de réinitialisation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resetOptions.map((option) => (
              <div
                key={option.type}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  resetType === option.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setResetType(option.type)}
              >
                <div className="font-medium text-gray-900">{option.title}</div>
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                <div className="text-xs text-gray-500 mt-2">{option.details}</div>
              </div>
            ))}
          </div>

          {/* Sélection du nouveau rôle (pour réinitialisation complète) */}
          {resetType === 'complete' && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Nouveau Rôle</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.values(ROLE_CONFIGS).map((config) => (
                  <div
                    key={config.role}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedNewRole === config.role
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedNewRole(config.role)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{config.icon}</span>
                      <span className="font-medium text-sm">{config.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation */}
          {resetType && (
            <div className="border-t pt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="font-medium text-yellow-800">Attention</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${
                    resetType === 'complete' ? 'bg-red-500 hover:bg-red-600' :
                    resetType === 'data' ? 'bg-orange-500 hover:bg-orange-600' :
                    resetType === 'verification' ? 'bg-yellow-500 hover:bg-yellow-600' :
                    'bg-gray-500 hover:bg-gray-600'
                  } disabled:bg-gray-400`}
                >
                  {loading ? 'Traitement...' : 'Confirmer'}
                </button>
                <button
                  onClick={() => {
                    setResetType(null);
                    setShowResetOptions(false);
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Informations sur le profil actuel */}
      {currentRole && (
        <div className="mt-6 pt-4 border-t">
          <h3 className="font-medium mb-2">Profil Actuel</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{ROLE_CONFIGS[currentRole].icon}</span>
              <span className="font-medium">{ROLE_CONFIGS[currentRole].label}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{ROLE_CONFIGS[currentRole].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileReset; 