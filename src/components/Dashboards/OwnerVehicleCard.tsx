import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataPrivacyService } from '@/services/blockchain/dataPrivacyService';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';

interface VehicleNFT {
  tokenId: number;
  brand: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  mileage: number;
  status: 'active' | 'transferred' | 'sold';
}

interface OwnerVehicleCardProps {
  vehicle: VehicleNFT;
  account: string;
}

export const OwnerVehicleCard: React.FC<OwnerVehicleCardProps> = ({ vehicle, account }) => {
  const [privateData, setPrivateData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPrivateData, setShowPrivateData] = useState(false);

  const handleRevealPrivateData = async () => {
    setLoading(true);
    try {
      const dataPrivacyService = DataPrivacyService.getInstance();
      const data = await dataPrivacyService.getPrivateVehicleData(vehicle.tokenId, account || '');
      
      if (data) {
        setPrivateData(data);
        setShowPrivateData(true);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données privées:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransferNFT = () => {
    // TODO: Implémenter le transfert de NFT
    console.log('Transfert du NFT:', vehicle.tokenId);
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{vehicle.brand} {vehicle.model}</CardTitle>
          <Badge variant={vehicle.status === 'active' ? 'secondary' : 'outline'}>
            {vehicle.status === 'active' ? 'Active' : 'Transferred'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">VIN:</span>
            <span className="text-sm font-medium">{vehicle.vin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">NFT ID:</span>
            <span className="text-sm font-medium">#{vehicle.tokenId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Year:</span>
            <span className="text-sm font-medium">{vehicle.year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Color:</span>
            <span className="text-sm font-medium">{vehicle.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Mileage:</span>
            <span className="text-sm font-medium">{vehicle.mileage.toLocaleString()} km</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <Button 
            size="sm" 
            className="w-full"
            onClick={handleRevealPrivateData}
            disabled={loading}
          >
            {loading ? 'Loading...' : '🔍 Reveal Private Data'}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={handleTransferNFT}
          >
            🔄 Transfer NFT
          </Button>
        </div>

        {showPrivateData && privateData && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">🔐 Private Data</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Purchase Price:</span>
                <span className="font-medium">${privateData.purchasePrice?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Insurance:</span>
                <span className="font-medium">{privateData.insuranceDetails}</span>
              </div>
              <div>
                <span className="text-blue-700">Notes:</span>
                <p className="text-sm mt-1">{privateData.personalNotes}</p>
              </div>
              {privateData.maintenanceHistory && privateData.maintenanceHistory.length > 0 && (
                <div>
                  <span className="text-blue-700">Maintenance History:</span>
                  <ul className="text-xs mt-1 space-y-1">
                    {privateData.maintenanceHistory.map((item: string, index: number) => (
                      <li key={index} className="text-blue-600">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
