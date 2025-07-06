import React from 'react';
import { MintForm } from './MintForm';

export const SellerDashboard: React.FC = () => {
  console.log('🔍 SellerDashboard rendu');
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🏪 Dashboard Concessionnaire
        </h2>
        <p className="text-gray-600 mb-6">
          Crée et gère les Cartes Grises NFT pour tes clients.
        </p>
      </div>

      {/* Formulaire de mint */}
      <MintForm />
    </div>
  );
}; 