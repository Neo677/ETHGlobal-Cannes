'use client';

import React, { useState } from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';

interface DealerDashboardProps {
  profile: BasicProfile;
}

export const DealerDashboard: React.FC<DealerDashboardProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'sales' | 'customers'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'inventory', label: 'Inventory', icon: '🚗' },
    { id: 'sales', label: 'Sales', icon: '💰' },
    { id: 'customers', label: 'Customers', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dealer Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome, {profile.name || 'Dealer'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                🏢 Dealer
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Vehicles in Stock</p>
                    <p className="text-2xl font-semibold text-gray-900">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Sales This Month</p>
                    <p className="text-2xl font-semibold text-gray-900">8</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Customers</p>
                    <p className="text-2xl font-semibold text-gray-900">156</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">€320K</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">BMW X3 Sale</p>
                      <p className="text-sm text-gray-500">Customer: John Doe</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">NFT Created</p>
                      <p className="text-sm text-gray-500">Mercedes Class A - VIN: 123456</p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New Customer</p>
                      <p className="text-sm text-gray-500">Mary Martin - Interested in Audi A4</p>
                    </div>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Vehicle Inventory</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  + Add Vehicle
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">BMW X3</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">In Stock</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>VIN:</strong> VIN123456789</p>
                      <p><strong>Price:</strong> €45,000</p>
                      <p><strong>Year:</strong> 2023</p>
                      <p><strong>Mileage:</strong> 15,000 km</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Create NFT
                      </button>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Mercedes Class A</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">In Stock</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>VIN:</strong> VIN987654321</p>
                      <p><strong>Price:</strong> €38,000</p>
                      <p><strong>Year:</strong> 2022</p>
                      <p><strong>Mileage:</strong> 25,000 km</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Create NFT
                      </button>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Audi A4</h4>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Reserved</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>VIN:</strong> VIN555666777</p>
                      <p><strong>Price:</strong> €42,000</p>
                      <p><strong>Year:</strong> 2023</p>
                      <p><strong>Mileage:</strong> 8,000 km</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Create NFT
                      </button>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Sales History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">BMW X3 - John Doe</p>
                      <p className="text-sm text-gray-500">15/12/2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">€45,000</p>
                      <p className="text-sm text-gray-500">NFT created</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Mercedes Class A - Mary Martin</p>
                      <p className="text-sm text-gray-500">10/12/2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">€38,000</p>
                      <p className="text-sm text-gray-500">NFT created</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Customer Database</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">john.doe@email.com</p>
                      <p className="text-sm text-gray-500">Purchased: BMW X3</p>
                    </div>
                    <span className="text-sm text-green-600">Loyal customer</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Mary Martin</p>
                      <p className="text-sm text-gray-500">mary.martin@email.com</p>
                      <p className="text-sm text-gray-500">Purchased: Mercedes Class A</p>
                    </div>
                    <span className="text-sm text-blue-600">New customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 