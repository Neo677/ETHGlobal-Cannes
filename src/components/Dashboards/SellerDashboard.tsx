'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MintForm } from '@/components/MintForm';
import { NFTCard } from '@/components/NFT/NFTCard';
import { Car, Plus, X } from 'lucide-react';

// Local interface for vehicle data
interface VehicleNFTData {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  color: string;
  mileage: number;
  price: number;
  engineType: string;
  fuelType: string;
  transmission: string;
  description: string;
}

export const SellerDashboard: React.FC = () => {
  const [showMintForm, setShowMintForm] = useState(false);
  const [userNFTs, setUserNFTs] = useState<any[]>([]);

  const handleMintSuccess = (tokenId: string, transactionHash: string) => {
    // Add the newly minted NFT to the list
    const newNFT = {
      id: tokenId,
      brand: 'New Vehicle', // This would come from the form data
      model: 'NFT',
      year: new Date().getFullYear(),
      licensePlate: 'N/A',
      vin: 'N/A',
      color: 'N/A',
      mileage: 0,
      price: 0,
      engineType: 'N/A',
      fuelType: 'N/A',
      transmission: 'N/A',
      description: 'Newly minted vehicle NFT',
      mintDate: new Date().toISOString(),
      status: 'available' as const,
      ownerDID: 'user-did-placeholder',
      encryptedMetadata: false,
      transactionHash,
    };

    setUserNFTs(prev => [newNFT, ...prev]);
    setShowMintForm(false);
  };

  const handleViewNFTDetails = (nftId: string) => {
    // TODO: Implement NFT details view
    console.log('Viewing NFT details:', nftId);
  };

  const handleTransferNFT = (nftId: string) => {
    // TODO: Implement NFT transfer
    console.log('Transferring NFT:', nftId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Seller Dashboard
              </h1>
              <p className="text-gray-600">
                Mint and manage your vehicle NFTs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🏢 Seller
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mint Form Section */}
        {showMintForm ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mint New Vehicle NFT</h2>
              <Button
                variant="outline"
                onClick={() => setShowMintForm(false)}
                className="flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
            <MintForm onMintSuccess={handleMintSuccess} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vehicle Inventory */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center">
                      <span className="text-2xl mr-2">🚗</span>
                      Vehicle Inventory
                    </CardTitle>
                    <Button
                      onClick={() => setShowMintForm(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Mint NFT
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Mint New Vehicle NFT</h3>
                      <p className="text-blue-700 text-sm mb-3">
                        Create a new vehicle NFT on the Oasis Sapphire testnet. 
                        Use the test mint to simulate the process or connect your wallet for real minting.
                      </p>
                      <Button
                        onClick={() => setShowMintForm(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <Car className="w-4 h-4 mr-2" />
                        + Mint Vehicle NFT
                      </Button>
                    </div>
                    
                    {/* NFT Collection */}
                    {userNFTs.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Your NFT Collection</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {userNFTs.map((nft) => (
                            <NFTCard
                              key={nft.id}
                              nft={nft}
                              onViewDetails={handleViewNFTDetails}
                              onTransfer={handleTransferNFT}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Vehicles (Mock Data) */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Recent Vehicles</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Toyota Camry 2023</p>
                            <p className="text-sm text-gray-600">VIN: 1HGBH41JXMN109186</p>
                          </div>
                          <Badge variant="secondary">Available</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Honda Civic 2022</p>
                            <p className="text-sm text-gray-600">VIN: 2T1BURHE0JC123456</p>
                          </div>
                          <Badge variant="outline">Sold</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sales Analytics */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <span className="text-2xl mr-2">📊</span>
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {userNFTs.length}
                      </div>
                      <div className="text-sm text-green-700">Total NFTs</div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {userNFTs.filter(nft => nft.status === 'available').length}
                      </div>
                      <div className="text-sm text-blue-700">Available</div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {userNFTs.filter(nft => nft.status === 'sold').length}
                      </div>
                      <div className="text-sm text-orange-700">Sold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 