import React, { useState, useEffect } from 'react';
import { ExtendedProfile, UserRole, ROLE_CONFIGS } from '@/types/profile';
import RoleBadge from './RoleBadge';
import TrustBadge from './TrustBadge';

interface ProfileListProps {
  profiles: ExtendedProfile[];
  onProfileSelect?: (profile: ExtendedProfile) => void;
  onRoleVerify?: (did: string, role: UserRole) => Promise<void>;
  currentUserRole?: UserRole;
  loading?: boolean;
}

const ProfileList: React.FC<ProfileListProps> = ({ 
  profiles, 
  onProfileSelect, 
  onRoleVerify,
  currentUserRole,
  loading = false 
}) => {
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(profile => {
    const matchesRole = filterRole === 'all' || profile.role === filterRole;
    const matchesSearch = searchTerm === '' || 
      profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.did.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesSearch;
  });

  const canVerifyRoles = currentUserRole === 'admin' || currentUserRole === 'insurer';

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher par nom, email ou DID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les rôles</option>
            {Object.values(ROLE_CONFIGS).map(config => (
              <option key={config.role} value={config.role}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {Object.values(ROLE_CONFIGS).map(config => {
          const count = profiles.filter(p => p.role === config.role).length;
          return (
            <div key={config.role} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{config.icon}</span>
                <div>
                  <div className="font-medium">{count}</div>
                  <div className="text-xs text-gray-500">{config.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Liste des profils */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des profils...</p>
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun profil trouvé
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.did}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onProfileSelect?.(profile)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <RoleBadge role={profile.role} verified={profile.verification.roleVerified} />
                    <TrustBadge level={profile.verification.trustLevel} score={profile.verification.verificationScore} />
                  </div>
                  <div>
                    <div className="font-medium">
                      {profile.name || 'Nom non fourni'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {profile.email || 'Email non fourni'}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {profile.did}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {canVerifyRoles && !profile.verification.roleVerified && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRoleVerify?.(profile.did, profile.role);
                      }}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                    >
                      Vérifier
                    </button>
                  )}
                  <div className="text-xs text-gray-400">
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Métadonnées du rôle */}
              {profile.roleMetadata && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    {profile.roleMetadata.companyName && (
                      <span className="mr-3">🏢 {profile.roleMetadata.companyName}</span>
                    )}
                    {profile.roleMetadata.licenseNumber && (
                      <span>📋 {profile.roleMetadata.licenseNumber}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination simple */}
      {filteredProfiles.length > 10 && (
        <div className="flex justify-center mt-6">
          <div className="text-sm text-gray-500">
            Affichage de {filteredProfiles.length} profils
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileList; 