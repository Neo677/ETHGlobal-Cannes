import React, { useState } from 'react';
import { CarteGrise3D } from './CarteGrise3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VehicleData {
  vin: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  owner: string;
  registrationDate: string;
  engineType: string;
  fuelType: string;
  transmission: string;
  licensePlate: string;
}

interface CarteGriseViewerProps {
  vehicleData: VehicleData;
  userRole: 'owner' | 'seller' | 'admin';
  onMint?: () => void;
  onTransfer?: () => void;
}

export const CarteGriseViewer: React.FC<CarteGriseViewerProps> = ({
  vehicleData,
  userRole,
  onMint,
  onTransfer
}) => {
  const [showPrivateData, setShowPrivateData] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);

  const handleTogglePrivateData = () => {
    if (userRole === 'owner' || userRole === 'admin') {
      setShowPrivateData(!showPrivateData);
    }
  };

  const handleRotate = () => {
    console.log('Rotation de la carte grise 3D');
  };

  return (
    <div className="w-full">
      {/* Header avec contrôles */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Carte Grise NFT 3D
            </h2>
            <p className="text-gray-600">
              {vehicleData.brand} {vehicleData.model} ({vehicleData.year})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {userRole === 'owner' ? '🚗 Propriétaire' : 
               userRole === 'seller' ? '🏢 Vendeur' : '⚙️ Admin'}
            </Badge>
            <Button
              variant="outline"
              onClick={() => setIs3DMode(!is3DMode)}
            >
              {is3DMode ? '2D View' : '3D View'}
            </Button>
          </div>
        </div>

        {/* Actions selon le rôle */}
        <div className="flex gap-2">
          {userRole === 'seller' && onMint && (
            <Button onClick={onMint} className="bg-green-600 hover:bg-green-700">
              🪙 Mint NFT
            </Button>
          )}
          {userRole === 'owner' && onTransfer && (
            <Button onClick={onTransfer} variant="outline">
              🔄 Transfer NFT
            </Button>
          )}
          {(userRole === 'owner' || userRole === 'admin') && (
            <Button
              onClick={handleTogglePrivateData}
              variant="outline"
            >
              {showPrivateData ? '🔒 Hide Private Data' : '🔓 Show Private Data'}
            </Button>
          )}
        </div>
      </div>

      {/* Carte Grise 3D */}
      {is3DMode ? (
        <CarteGrise3D
          vehicleData={vehicleData}
          onRotate={handleRotate}
          onTogglePrivateData={handleTogglePrivateData}
          showPrivateData={showPrivateData}
        />
      ) : (
        /* Vue 2D simplifiée */
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle>Carte Grise - Vue 2D</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">Véhicule</h3>
                <p><strong>Marque:</strong> {vehicleData.brand}</p>
                <p><strong>Modèle:</strong> {vehicleData.model}</p>
                <p><strong>Année:</strong> {vehicleData.year}</p>
                <p><strong>Couleur:</strong> {vehicleData.color}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Identification</h3>
                <p><strong>VIN:</strong> {vehicleData.vin}</p>
                <p><strong>Plaque:</strong> {vehicleData.licensePlate}</p>
                <p><strong>Propriétaire:</strong> {vehicleData.owner}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informations supplémentaires */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations NFT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Blockchain</h4>
                <p><strong>Réseau:</strong> Oasis Sapphire</p>
                <p><strong>Token ID:</strong> #{vehicleData.vin.slice(-6)}</p>
                <p><strong>Standard:</strong> ERC-721</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Métadonnées</h4>
                <p><strong>Publiques:</strong> IPFS CID</p>
                <p><strong>Privées:</strong> Chiffrées</p>
                <p><strong>3D Model:</strong> Disponible</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Permissions</h4>
                <p><strong>Lecture:</strong> Public</p>
                <p><strong>Écriture:</strong> {userRole === 'seller' ? 'Vendeur' : 'Propriétaire'}</p>
                <p><strong>Transfert:</strong> {userRole === 'owner' ? 'Autorisé' : 'Non autorisé'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
