'use client';

import React, { useState, useEffect } from 'react';
import { useSelfID } from '@/hooks/useSelfID';
import { usePrivySelf } from '@/providers/PrivySelfProvider';
import { BasicProfile, ExtendedProfile, UserRole, ROLE_CONFIGS } from '@/types/profile';
import TrustBadge from './TrustBadge';
import RoleBadge from './RoleBadge';
import RoleSelector from './RoleSelector';
import { Verification } from './Verification';
import { ProfileViewer } from './ProfileViewer';
import ProfileList from './ProfileList';
import ProfileReset from './ProfileReset';

interface ProfileProps {
  onProfileUpdate?: (profile: ExtendedProfile | undefined, did: string) => void;
  onDidChange?: (did: string) => void;
}

export default function Profile({ onProfileUpdate, onDidChange }: ProfileProps) {
  const {
    account,
    did,
    profile,
    loading,
    error,
    connectWallet,
    createProfile,
    updateProfile,
    resetProfile,
    resetProfileData,
    resetVerification,
    deleteProfile,
    verifyProfile,
    verifyRole,
    loadProfileByDID,
    getAllProfiles,
    getProfilesByRole,
    isConnected,
    hasProfile,
    trustLevel,
    verificationScore,
    userRole
  } = useSelfID();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('owner');
  const [viewDid, setViewDid] = useState<string>('');
  const [viewProfile, setViewProfile] = useState<ExtendedProfile | null>(null);
  const [showProfileViewer, setShowProfileViewer] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showAllProfiles, setShowAllProfiles] = useState(false);
  const [allProfiles, setAllProfiles] = useState<ExtendedProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ExtendedProfile | null>(null);
  const [showResetOptions, setShowResetOptions] = useState(false);

  // Gestion de la création/mise à jour du profil
  const handleProfileUpdate = async (updates: Partial<ExtendedProfile>) => {
    if (!did) return;

    try {
      if (!hasProfile) {
        // Créer un nouveau profil avec le rôle sélectionné
        const newProfile = await createProfile(updates as BasicProfile, selectedRole);
        onProfileUpdate?.(newProfile, did);
      } else {
        // Mettre à jour le profil existant
        const updatedProfile = await updateProfile(updates);
        onProfileUpdate?.(updatedProfile, did);
      }
      setIsEditing(false);
      setShowRoleSelector(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  // Gestion de la vérification
  const handleVerification = async () => {
    try {
      await verifyProfile();
    } catch (err) {
      console.error('Error verifying profile:', err);
    }
  };

  // Gestion de la lecture d'un profil
  const handleViewProfile = async () => {
    if (!viewDid.trim()) return;

    try {
      const loadedProfile = await loadProfileByDID(viewDid);
      setViewProfile(loadedProfile);
      setShowProfileViewer(true);
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  };

  // Gestion du changement de rôle
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
  };

  // Chargement de tous les profils
  const handleLoadAllProfiles = async () => {
    try {
      const profiles = await getAllProfiles();
      setAllProfiles(profiles);
      setShowAllProfiles(true);
    } catch (err) {
      console.error('Error loading all profiles:', err);
    }
  };

  // Vérification d'un rôle
  const handleRoleVerify = async (targetDid: string, role: UserRole) => {
    try {
      await verifyRole(targetDid, role);
      // Recharger les profils après vérification
      const profiles = await getAllProfiles();
      setAllProfiles(profiles);
    } catch (err) {
      console.error('Error verifying role:', err);
    }
  };

  // Sélection d'un profil dans la liste
  const handleProfileSelect = (profile: ExtendedProfile) => {
    setSelectedProfile(profile);
    setViewDid(profile.did);
    setViewProfile(profile);
    setShowProfileViewer(true);
    setShowAllProfiles(false);
  };

  // Gestion des réinitialisations
  const handleResetComplete = async (newRole?: UserRole) => {
    try {
      await resetProfile(newRole);
    } catch (err) {
      console.error('Error resetting profile:', err);
    }
  };

  const handleResetData = async () => {
    try {
      await resetProfileData();
    } catch (err) {
      console.error('Error resetting profile data:', err);
    }
  };

  const handleResetVerification = async () => {
    try {
      await resetVerification();
    } catch (err) {
      console.error('Error resetting verification:', err);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  // Vérifier les permissions de l'utilisateur actuel
  const getCurrentUserPermissions = () => {
    if (!profile) return ROLE_CONFIGS.owner.permissions;
    return ROLE_CONFIGS[profile.role].permissions;
  };

  const currentPermissions = getCurrentUserPermissions();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MetaCarTag Profile</h1>
        <p className="text-xl text-gray-600">Web3 Car Registration with Self.ID</p>
      </div>

      {/* Connexion Wallet */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Connexion Wallet</h2>
        
        {!isConnected ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            {loading ? 'Connexion...' : 'Connecter Wallet'}
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Compte connecté:</span>
              <span className="ml-2 font-mono text-sm bg-gray-100 px-2 py-1 rounded">{account}</span>
            </div>
            {did && (
              <div>
                <span className="font-medium text-gray-700">DID:</span>
                <span className="ml-2 font-mono text-sm bg-gray-100 px-2 py-1 rounded break-all">{did}</span>
              </div>
            )}
            {hasProfile && (
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">Statut:</span>
                <TrustBadge level={trustLevel} score={verificationScore} showDetails={true} />
                <RoleBadge role={profile!.role} verified={profile!.verification.roleVerified} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sélection de rôle (si pas de profil) */}
      {isConnected && !hasProfile && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sélection du Rôle</h2>
          <RoleSelector 
            selectedRole={selectedRole}
            onRoleChange={handleRoleChange}
          />
        </div>
      )}

      {/* Gestion du profil */}
      {isConnected && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Mon Profil</h2>
            {!isEditing ? (
              <div className="space-x-2">
                {!hasProfile && (
                  <button
                    onClick={() => setShowRoleSelector(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Changer Rôle
                  </button>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {hasProfile ? 'Modifier' : 'Créer Profil'}
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              {!hasProfile && (
                <RoleSelector 
                  selectedRole={selectedRole}
                  onRoleChange={handleRoleChange}
                />
              )}
              <ProfileForm 
                profile={profile}
                onSave={handleProfileUpdate}
                loading={loading}
                role={selectedRole}
              />
            </div>
          ) : hasProfile ? (
            <ProfileDisplay profile={profile!} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucun profil créé. Sélectionnez votre rôle et cliquez sur "Créer Profil" pour commencer.
            </div>
          )}
        </div>
      )}

      {/* Vérification du profil */}
      {isConnected && hasProfile && (
        <Verification 
          profile={profile!}
        />
      )}

      {/* Actions spécifiques au rôle */}
      {isConnected && hasProfile && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actions Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPermissions.canMintNFTs && (
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                🏭 Mint NFT Véhicule
              </button>
            )}
            {currentPermissions.canTransferNFTs && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                🔄 Transférer Véhicule
              </button>
            )}
            {currentPermissions.canViewAllProfiles && (
              <button 
                onClick={handleLoadAllProfiles}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                👥 Voir tous les profils
              </button>
            )}
          </div>
        </div>
      )}

      {/* Réinitialisation du profil */}
      {isConnected && hasProfile && (
        <ProfileReset
          onResetComplete={handleResetComplete}
          onResetData={handleResetData}
          onResetVerification={handleResetVerification}
          onDeleteProfile={handleDeleteProfile}
          loading={loading}
          currentRole={userRole}
        />
      )}

      {/* Liste de tous les profils (pour admin/assureur) */}
      {showAllProfiles && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Tous les Profils</h2>
            <button
              onClick={() => setShowAllProfiles(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
          <ProfileList
            profiles={allProfiles}
            onProfileSelect={handleProfileSelect}
            onRoleVerify={handleRoleVerify}
            currentUserRole={userRole}
            loading={loading}
          />
        </div>
      )}

      {/* Lecture de profils publics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Consulter un Profil</h2>
        
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={viewDid}
            onChange={(e) => setViewDid(e.target.value)}
            placeholder="Entrez un DID (ex: did:ethr:0x...)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleViewProfile}
            disabled={loading || !viewDid.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? 'Chargement...' : 'Consulter'}
          </button>
        </div>

        {showProfileViewer && viewProfile && (
          <ProfileViewer 
            profile={viewProfile}
            onClose={() => setShowProfileViewer(false)}
          />
        )}
      </div>

      {/* Affichage des erreurs */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}

// Composant pour l'affichage du profil
const ProfileDisplay: React.FC<{ profile: ExtendedProfile }> = ({ profile }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <span className="font-medium text-gray-700">Rôle:</span>
        <RoleBadge role={profile.role} verified={profile.verification.roleVerified} showDetails={true} />
      </div>
      
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
      {profile.ethAddress && (
        <div>
          <span className="font-medium text-gray-700">Adresse ETH:</span>
          <span className="ml-2 font-mono text-sm">{profile.ethAddress}</span>
        </div>
      )}
      
      {/* Métadonnées du rôle */}
      {profile.roleMetadata && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Informations professionnelles</h4>
          {profile.roleMetadata.companyName && (
            <div>
              <span className="font-medium text-gray-700">Entreprise:</span>
              <span className="ml-2">{profile.roleMetadata.companyName}</span>
            </div>
          )}
          {profile.roleMetadata.licenseNumber && (
            <div>
              <span className="font-medium text-gray-700">Numéro de licence:</span>
              <span className="ml-2">{profile.roleMetadata.licenseNumber}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Composant pour le formulaire de profil
const ProfileForm: React.FC<{
  profile: ExtendedProfile | null;
  onSave: (updates: Partial<ExtendedProfile>) => Promise<void>;
  loading: boolean;
  role: UserRole;
}> = ({ profile, onSave, loading, role }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    publicName: profile?.publicName || false,
    companyName: profile?.roleMetadata?.companyName || '',
    licenseNumber: profile?.roleMetadata?.licenseNumber || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updates = {
      ...formData,
      roleMetadata: {
        companyName: formData.companyName,
        licenseNumber: formData.licenseNumber
      }
    };
    
    await onSave(updates);
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleConfig = ROLE_CONFIGS[role];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{roleConfig.icon}</span>
          <span className="font-medium">{roleConfig.label}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{roleConfig.description}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Votre nom complet"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="votre.email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom de l'entreprise
        </label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nom de votre entreprise"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Numéro de licence
        </label>
        <input
          type="text"
          value={formData.licenseNumber}
          onChange={(e) => updateField('licenseNumber', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Numéro de licence professionnelle"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="publicName"
          checked={formData.publicName}
          onChange={(e) => updateField('publicName', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="publicName" className="text-sm text-gray-700">
          Rendre le nom public
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </form>
  );
}; 