import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export const SimpleTokenDisplay: React.FC = () => {
  const { user, authenticated } = usePrivy();
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_CARTE_GRISE_NFT_ADDRESS;

  const fetchTokenIds = async () => {
    if (!authenticated || !user) {
      alert('Connecte-toi d\'abord !');
      return;
    }

    setLoading(true);
    
    try {
      // Simulation pour l'instant - on va afficher des IDs fictifs
      // En production, on ferait un appel au contrat
      const mockTokenIds = [0, 1, 2, 3, 4];
      
      setTimeout(() => {
        setTokenIds(mockTokenIds);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        🎯 Mes Token IDs
      </h3>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Contrat déployé :</strong> {contractAddress || 'Non configuré'}
          </p>
          <p className="text-sm text-blue-800 mt-1">
            <strong>Ton adresse :</strong> {user?.wallet?.address || 'Non connecté'}
          </p>
        </div>

        {!authenticated ? (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800">🔐 Connecte-toi avec Privy pour voir tes Token IDs</p>
          </div>
        ) : (
          <div>
            <button
              onClick={fetchTokenIds}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? '🔄 Recherche...' : '🔍 Récupérer mes Token IDs'}
            </button>

            {tokenIds.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">✅ Tes Token IDs :</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {tokenIds.map((id) => (
                    <div key={id} className="bg-green-100 p-3 rounded-lg text-center">
                      <span className="font-mono font-bold text-green-800">#{id}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Explorer :</strong> https://explorer.testnet.oasis.io/mainnet/address/{contractAddress}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 