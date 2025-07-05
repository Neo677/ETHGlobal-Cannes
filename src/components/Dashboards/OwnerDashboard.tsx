'use client';

import React, { useState } from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OwnerDashboardProps {
  profile: BasicProfile;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ profile }) => {
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
            Welcome back, {profile.name || 'Vehicle Owner'}! Manage your vehicles and transactions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="text-3xl">🚗</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">NFTs Owned</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
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
                              <p className="text-sm font-medium text-gray-900">Vehicle registered</p>
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
                              <p className="text-sm font-medium text-gray-900">Profile updated</p>
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
                          🚗 Register New Vehicle
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          📝 View Transaction History
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          👤 Update Profile
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          🔍 Search Vehicles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Vehicles Tab */}
              <TabsContent value="vehicles" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Vehicle Card 1 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Tesla Model 3</CardTitle>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">VIN:</span>
                          <span className="text-sm font-medium">1HGBH41JXMN109186</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">NFT ID:</span>
                          <span className="text-sm font-medium">NFT_001</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Year:</span>
                          <span className="text-sm font-medium">2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Color:</span>
                          <span className="text-sm font-medium">White</span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Transfer NFT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vehicle Card 2 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">BMW X5</CardTitle>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">VIN:</span>
                          <span className="text-sm font-medium">5UXWX7C5*BA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">NFT ID:</span>
                          <span className="text-sm font-medium">NFT_002</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Year:</span>
                          <span className="text-sm font-medium">2022</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Color:</span>
                          <span className="text-sm font-medium">Black</span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Transfer NFT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vehicle Card 3 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Audi A4</CardTitle>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">VIN:</span>
                          <span className="text-sm font-medium">WAUZZZ8K9AA123456</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">NFT ID:</span>
                          <span className="text-sm font-medium">NFT_003</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Year:</span>
                          <span className="text-sm font-medium">2021</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Color:</span>
                          <span className="text-sm font-medium">Silver</span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Transfer NFT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📝 Transaction History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            ✅
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Vehicle Registration</p>
                            <p className="text-sm text-gray-600">Tesla Model 3 - 2023</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">Completed</p>
                          <p className="text-sm text-gray-600">NFT_001</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            🔄
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">NFT Transfer</p>
                            <p className="text-sm text-gray-600">BMW X5 to new owner</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">Completed</p>
                          <p className="text-sm text-gray-600">NFT_002</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            📝
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Profile Update</p>
                            <p className="text-sm text-gray-600">Contact information updated</p>
                            <p className="text-xs text-gray-500">3 days ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-yellow-600">Completed</p>
                          <p className="text-sm text-gray-600">Profile</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}; 