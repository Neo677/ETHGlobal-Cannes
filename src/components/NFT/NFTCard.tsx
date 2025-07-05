'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, FileText, Shield, Eye, ExternalLink } from 'lucide-react';

interface VehicleNFT {
  id: string;
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  vin: string;
  color: string;
  mileage?: string;
  price?: string;
  engineType?: string;
  fuelType?: string;
  transmission?: string;
  description?: string;
  mintDate: string;
  status: 'available' | 'sold' | 'pending';
  ownerDID?: string;
  encryptedMetadata?: boolean;
}

interface NFTCardProps {
  nft: VehicleNFT;
  onViewDetails?: (nftId: string) => void;
  onTransfer?: (nftId: string) => void;
  showActions?: boolean;
}

export const NFTCard: React.FC<NFTCardProps> = ({ 
  nft, 
  onViewDetails, 
  onTransfer, 
  showActions = true 
}) => {
  const getStatusColor = (status: VehicleNFT['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: VehicleNFT['status']) => {
    switch (status) {
      case 'available':
        return '✅';
      case 'sold':
        return '💰';
      case 'pending':
        return '⏳';
      default:
        return '❓';
    }
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {nft.brand} {nft.model}
              </CardTitle>
              <p className="text-sm text-gray-600">{nft.year} • {nft.color}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(nft.status)}>
              {getStatusIcon(nft.status)} {nft.status.charAt(0).toUpperCase() + nft.status.slice(1)}
            </Badge>
            {nft.encryptedMetadata && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Shield className="w-3 h-3 mr-1" />
                Encrypted
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">License Plate:</span>
              <span className="font-medium">{nft.licensePlate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VIN:</span>
              <span className="font-medium font-mono text-xs">{nft.vin}</span>
            </div>
            {nft.mileage && (
              <div className="flex justify-between">
                <span className="text-gray-600">Mileage:</span>
                <span className="font-medium">{nft.mileage} km</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {nft.engineType && (
              <div className="flex justify-between">
                <span className="text-gray-600">Engine:</span>
                <span className="font-medium">{nft.engineType}</span>
              </div>
            )}
            {nft.fuelType && (
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel:</span>
                <span className="font-medium">{nft.fuelType}</span>
              </div>
            )}
            {nft.transmission && (
              <div className="flex justify-between">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-medium">{nft.transmission}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        {nft.price && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price:</span>
              <span className="text-lg font-bold text-green-600">€{nft.price}</span>
            </div>
          </div>
        )}

        {/* Description */}
        {nft.description && (
          <div className="text-sm text-gray-600">
            <p className="line-clamp-2">{nft.description}</p>
          </div>
        )}

        {/* NFT Info */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <FileText className="w-3 h-3" />
              <span>NFT ID: {nft.id}</span>
            </div>
            <span>Minted: {new Date(nft.mintDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails?.(nft.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            {nft.status === 'available' && onTransfer && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onTransfer(nft.id)}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Transfer
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 