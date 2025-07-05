'use client';

import React, { useState } from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreateNFTForm } from '@/components/Forms/CreateNFTForm';
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

interface SellerDashboardProps {
  profile: BasicProfile;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ profile }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userNFTs, setUserNFTs] = useState<any[]>([]);

  const handleCreateNFT = (vehicleData: any) => {
    // TODO: This will be implemented by the team (Asma's branch)
    console.log('Creating NFT with data:', vehicleData);
    
    // Mock: Add NFT to the list
    const newNFT = {
      id: `NFT_${Date.now()}`,
      brand: vehicleData.brand,
      model: vehicleData.model,
      year: Number(vehicleData.year),
      licensePlate: vehicleData.licensePlate,
      vin: vehicleData.vin,
      color: vehicleData.color,
      mileage: Number(vehicleData.mileage),
      price: Number(vehicleData.price),
      engineType: vehicleData.engineType,
      fuelType: vehicleData.fuelType,
      transmission: vehicleData.transmission,
      description: vehicleData.description,
      mintDate: new Date().toISOString(),
      status: 'available' as const,
      ownerDID: 'user-did-placeholder',
      encryptedMetadata: false,
    };

    setUserNFTs(prev => [newNFT, ...prev]);
    setShowCreateForm(false);
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
                Welcome, {profile.name || 'Seller'}
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
        {/* Create NFT Section */}
        {showCreateForm ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Vehicle NFT</h2>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
            <CreateNFTForm onSubmit={handleCreateNFT} />
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
                      onClick={() => setShowCreateForm(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create NFT
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Create New Vehicle NFT</h3>
                      <p className="text-blue-700 text-sm mb-3">
                        Add a new vehicle to your inventory and create an NFT for it. 
                        The mint functionality will be available soon.
                      </p>
                      <Button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <Car className="w-4 h-4 mr-2" />
                        + Add Vehicle NFT
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
                    Sales Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{userNFTs.length}</div>
                      <div className="text-sm text-green-700">NFTs Created</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-sm text-blue-700">Available</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">$450K</div>
                      <div className="text-sm text-purple-700">Total Revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <span className="text-2xl mr-2">💼</span>
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Honda Civic Sale</p>
                    <p className="text-sm text-gray-600">Sold to John Doe</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$25,000</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Toyota Camry Sale</p>
                    <p className="text-sm text-gray-600">Sold to Jane Smith</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$28,500</p>
                    <p className="text-sm text-gray-600">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 