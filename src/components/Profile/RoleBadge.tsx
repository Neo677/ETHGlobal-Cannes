import React from 'react';
import { UserRole, ROLE_CONFIGS } from '@/types/profile';

interface RoleBadgeProps {
  role: UserRole;
  verified?: boolean;
  showDetails?: boolean;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, verified = false, showDetails = false }) => {
  const config = ROLE_CONFIGS[role];

  return (
    <div className="flex items-center space-x-2">
      {/* Badge principal */}
      <div className={`px-3 py-1 rounded-full ${config.color} text-white font-medium text-sm flex items-center space-x-1`}>
        <span className="text-lg">{config.icon}</span>
        <span>{config.label}</span>
        {verified && (
          <span className="ml-1 text-xs">✓</span>
        )}
      </div>

      {/* Détails optionnels */}
      {showDetails && (
        <div className="text-xs text-gray-500">
          {config.description}
        </div>
      )}
    </div>
  );
};

export default RoleBadge; 