'use client';

import React from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SellerDashboardProps {
  profile: BasicProfile;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ profile }) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Inventory */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <span className="text-2xl mr-2">🚗</span>
                  Vehicle Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Create New Vehicle NFT</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      Add a new vehicle to your inventory and create an NFT for it.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      + Add Vehicle
                    </button>
                  </div>
                  
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
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-green-700">Vehicles Sold</div>
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