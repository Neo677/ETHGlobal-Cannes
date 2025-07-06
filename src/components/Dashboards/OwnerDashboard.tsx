'use client';

import React, { useState } from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OwnerVehicleCard } from './OwnerVehicleCard';
import { usePrivySelf } from '@/providers/PrivySelfProvider';

interface OwnerDashboardProps {
  profile: BasicProfile;
}

// Mock data pour les véhicules possédés
const mockOwnedVehicles = [
  {
    tokenId: 1,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    vin: "1HGBH41JXMN109186",
    color: "White",
    mileage: 15000,
    status: 'active' as const
  },
  {
    tokenId: 2,
    brand: "Honda",
    model: "Civic",
    year: 2022,
    vin: "2T1BURHE0JC123456",
    color: "Blue",
    mileage: 25000,
    status: 'active' as const
  },
  {
    tokenId: 3,
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    vin: "3VWDX7AJ5DM123789",
    color: "Silver",
    mileage: 35000,
    status: 'transferred' as const
  }
];

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ profile }) => {
  const { account } = usePrivySelf();
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'transactions'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'vehicles', label: 'My Vehicles', icon: '🚗' },
    { id: 'transactions', label: 'Transactions', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Owner Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {profile.name || 'Vehicle Owner'}! Manage your vehicles and view private data.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900">{mockOwnedVehicles.length}</p>
                </div>
                <div className="text-3xl">🚗</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active NFTs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockOwnedVehicles.filter(v => v.status === 'active').length}
                  </p>
                </div>
                <div className="text-3xl">🖼️</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="text-3xl">📝</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <span>{tab.icon}</span>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        📊 Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              ✅
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Private data revealed</p>
                              <p className="text-xs text-gray-600">2 hours ago</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              🔄
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">NFT transferred</p>
                              <p className="text-xs text-gray-600">1 day ago</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              ⏳
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Vehicle registered</p>
                              <p className="text-xs text-gray-600">3 days ago</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        ⚡ Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          🔍 View All Private Data
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          📝 View Transaction History
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          👤 Update Profile
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          🔄 Transfer NFT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Vehicles Tab */}
              <TabsContent value="vehicles" className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    My Vehicle NFTs ({mockOwnedVehicles.length})
                  </h3>
                  <p className="text-sm text-gray-600">
                    Click on "Reveal Private Data" to view confidential information for each vehicle.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockOwnedVehicles.map((vehicle) => (
                    <OwnerVehicleCard 
                      key={vehicle.tokenId} 
                      vehicle={vehicle} 
                      account={account || ''}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        ✅
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">NFT Transfer</p>
                        <p className="text-sm text-gray-600">Tesla Model 3 → 0x1234...5678</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        🔍
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Private Data Revealed</p>
                        <p className="text-sm text-gray-600">Honda Civic - Maintenance history</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        🚗
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Vehicle Registration</p>
                        <p className="text-sm text-gray-600">Toyota Corolla - New NFT created</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
