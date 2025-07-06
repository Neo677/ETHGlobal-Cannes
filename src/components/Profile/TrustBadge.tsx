import React from 'react';
import { TrustBadgeProps } from '@/types/profile';

const TrustBadge: React.FC<TrustBadgeProps> = ({ level, score, showDetails = false }) => {
  const getBadgeConfig = () => {
    switch (level) {
      case 'premium':
        return {
          color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
          textColor: 'text-yellow-900',
          icon: '⭐',
          label: 'Premium',
          description: 'Profil hautement vérifié'
        };
      case 'verified':
        return {
          color: 'bg-gradient-to-r from-green-400 to-green-600',
          textColor: 'text-green-900',
          icon: '✅',
          label: 'Vérifié',
          description: 'Profil vérifié'
        };
      case 'basic':
        return {
          color: 'bg-gradient-to-r from-blue-400 to-blue-600',
          textColor: 'text-blue-900',
          icon: 'ℹ️',
          label: 'Basique',
          description: 'Profil avec informations de base'
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-400 to-gray-600',
          textColor: 'text-gray-900',
          icon: '❓',
          label: 'Non vérifié',
          description: 'Profil non vérifié'
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div className="flex items-center space-x-3">
      {/* Badge principal */}
      <div className={`px-3 py-1 rounded-full ${config.color} ${config.textColor} font-medium text-sm flex items-center space-x-1`}>
        <span className="text-lg">{config.icon}</span>
        <span>{config.label}</span>
      </div>

      {/* Score de vérification */}
      <div className="flex items-center space-x-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 font-medium">{score}/100</span>
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

export default TrustBadge; 