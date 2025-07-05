import React, { useState, useEffect } from 'react';
import { ProfileViewerProps, ExtendedProfile } from '@/types/profile';
import TrustBadge from './TrustBadge';

const ProfileViewer: React.FC<ProfileViewerProps> = ({ 
  did, 
  onProfileLoad, 
  showVerification = true 
}) => {
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Simulation de chargement du profil
  useEffect(() => {
    const loadProfile = async () => {
      if (!did) return;

      setLoading(true);
      setError('');

      try {
        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Récupération depuis localStorage (pour MVP)
        const profileData = localStorage.getItem(`profile_${did}`);
        if (profileData) {
          const loadedProfile: ExtendedProfile = JSON.parse(profileData);
          setProfile(loadedProfile);
          onProfileLoad?.(loadedProfile);
        } else {
          setError('Profil non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [did, onProfileLoad]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Chargement du profil...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <div className="text-gray-600">{error}</div>
          <div className="text-sm text-gray-500 mt-2">DID: {did}</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-2">❓</div>
          <div className="text-gray-600">Aucun profil trouvé</div>
          <div className="text-sm text-gray-500 mt-2">DID: {did}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Profil Public</h3>
          <p className="text-sm text-gray-600">DID: {profile.did}</p>
        </div>
        {showVerification && (
          <TrustBadge 
            level={profile.verification.trustLevel} 
            score={profile.verification.verificationScore}
            showDetails={false}
          />
        )}
      </div>

      {/* Informations de base */}
      <div className="space-y-4 mb-6">
        {profile.name && (
          <div>
            <span className="font-medium text-gray-700">Nom:</span>
            <span className="ml-2">{profile.name}</span>
          </div>
        )}

        {profile.email && (
          <div>
            <span className="font-medium text-gray-700">Email:</span>
            <span className="ml-2">{profile.email}</span>
            {profile.verification.emailVerified && (
              <span className="ml-2 text-green-600 text-sm">✓ Vérifié</span>
            )}
          </div>
        )}

        {profile.insurance && (
          <div>
            <span className="font-medium text-gray-700">Assurance:</span>
            <span className="ml-2">{profile.insurance}</span>
          </div>
        )}

        {profile.ethAddress && (
          <div>
            <span className="font-medium text-gray-700">Adresse ETH:</span>
            <span className="ml-2 font-mono text-sm">{profile.ethAddress}</span>
          </div>
        )}
      </div>

      {/* Badges de vérification */}
      {showVerification && profile.verification.badges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3">Badges de vérification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {profile.verification.badges.map((badge) => (
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

      {/* Métadonnées */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            <span className="font-medium">Créé le:</span>
            <div>{new Date(profile.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <span className="font-medium">Mis à jour le:</span>
            <div>{new Date(profile.updatedAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Voir le rapport complet
          </button>
          <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Vérifier la signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer; 