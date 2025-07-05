'use client';

import React, { useState } from 'react';
import { UserRole, ROLE_CONFIGS } from '@/types/profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
  selectedRole?: UserRole;
  disabled?: boolean;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  onRoleSelect,
  selectedRole,
  disabled = false,
}) => {
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  const handleRoleClick = (role: UserRole) => {
    if (!disabled) {
      onRoleSelect(role);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Role
        </h2>
        <p className="text-lg text-gray-600">
          Select the role that best matches your activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['owner', 'dealer', 'insurer'] as UserRole[]).map((role) => {
          const config = ROLE_CONFIGS[role];
          const isSelected = selectedRole === role;
          const isHovered = hoveredRole === role;

          return (
            <Card
              key={role}
              className={`
                relative cursor-pointer transition-all duration-200 border-2
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => handleRoleClick(role)}
              onMouseEnter={() => setHoveredRole(role)}
              onMouseLeave={() => setHoveredRole(null)}
            >
              {/* Selection Badge */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`
                  w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4
                  ${config.color} text-white shadow-lg
                `}>
                  {config.icon}
                </div>
                <CardTitle className="text-xl">{config.label}</CardTitle>
                <p className="text-gray-600 text-sm">{config.description}</p>
              </CardHeader>

              <CardContent className="text-center">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Permissions:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {config.permissions.canMintNFTs && (
                      <Badge variant="secondary" className="text-xs">
                        Create NFTs
                      </Badge>
                    )}
                    {config.permissions.canTransferNFTs && (
                      <Badge variant="secondary" className="text-xs">
                        Transfer NFTs
                      </Badge>
                    )}
                    {config.permissions.canUpdateInsurance && (
                      <Badge variant="secondary" className="text-xs">
                        Manage Insurance
                      </Badge>
                    )}
                    {config.permissions.canVerifyProfiles && (
                      <Badge variant="secondary" className="text-xs">
                        Verify Profiles
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Help Message */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          You can modify your role later in your profile settings
        </p>
      </div>
    </div>
  );
}; 