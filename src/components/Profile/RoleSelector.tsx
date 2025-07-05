import React from 'react';
import { UserRole, ROLE_CONFIGS } from '@/types/profile';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  disabled?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  selectedRole, 
  onRoleChange, 
  disabled = false 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Sélectionnez votre rôle *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(ROLE_CONFIGS).map((config) => (
            <div
              key={config.role}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRole === config.role
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !disabled && onRoleChange(config.role)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center text-white text-lg`}>
                  {config.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{config.label}</div>
                  <div className="text-sm text-gray-500">{config.description}</div>
                </div>
                {selectedRole === config.role && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              
              {/* Permissions */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium mb-1">Permissions:</div>
                <div className="flex flex-wrap gap-1">
                  {config.permissions.canMintNFTs && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Mint NFTs</span>
                  )}
                  {config.permissions.canTransferNFTs && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Transférer</span>
                  )}
                  {config.permissions.canVerifyProfiles && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Vérifier</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector; 