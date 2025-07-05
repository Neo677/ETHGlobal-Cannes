'use client';

import React, { useState } from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';

interface OwnerDashboardProps {
  profile: BasicProfile;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'insurance' | 'transactions'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'vehicles', label: 'My Vehicles', icon: '🚗' },
    { id: 'insurance', label: 'Insurance', icon: '🛡️' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Owner Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome, {profile.name || 'Owner'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                🚗 Owner
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
                    ? 'border-blue-500 text-blue-600'
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Vehicles</p>
                    <p className="text-2xl font-semibold text-gray-900">2</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Insurance</p>
                    <p className="text-2xl font-semibold text-gray-900">2</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-semibold text-gray-900">€45,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Info Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Vehicle Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong>Vehicle ID:</strong> {profile.vehicleID || 'VIN123456789'}</p>
                    <p className="text-sm text-gray-600"><strong>NFT ID:</strong> {profile.nftId || 'NFT_001'}</p>
                    <p className="text-sm text-gray-600"><strong>Insurance:</strong> {profile.insurance || 'AXA'}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong>Registration Date:</strong> 15/12/2023</p>
                    <p className="text-sm text-gray-600"><strong>Last Update:</strong> 20/11/2024</p>
                    <p className="text-sm text-gray-600"><strong>Status:</strong> <span className="text-green-600">Active</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {profile.history?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item}</p>
                      </div>
                      <span className="text-sm text-gray-500">Recently</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Insurance renewed</p>
                          <p className="text-sm text-gray-500">AXA - BMW X3</p>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">NFT created</p>
                          <p className="text-sm text-gray-500">Mercedes Class A</p>
                        </div>
                        <span className="text-sm text-gray-500">1 week ago</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">My Vehicles</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">BMW X3</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Insured</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>VIN:</strong> {profile.vehicleID || 'VIN123456789'}</p>
                      <p><strong>NFT ID:</strong> {profile.nftId || 'NFT_001'}</p>
                      <p><strong>Insurance:</strong> AXA</p>
                      <p><strong>Expiration:</strong> 15/12/2024</p>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Mercedes Class A</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Insured</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>VIN:</strong> VIN987654321</p>
                      <p><strong>NFT ID:</strong> NFT_002</p>
                      <p><strong>Insurance:</strong> Allianz</p>
                      <p><strong>Expiration:</strong> 20/11/2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Insurance History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {profile.vehicleInfo?.insuranceHistory?.map((insurance, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{insurance}</p>
                        <p className="text-sm text-gray-500">Period: 2023-2024</p>
                      </div>
                      <span className="text-sm text-gray-500">€1,200/year</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">AXA-2023</p>
                          <p className="text-sm text-gray-500">Period: 2023-2024</p>
                        </div>
                        <span className="text-sm text-gray-500">€1,200/year</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">AXA-2024</p>
                          <p className="text-sm text-gray-500">Period: 2024-2025</p>
                        </div>
                        <span className="text-sm text-gray-500">€1,200/year</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">AXA Insurance Payment</p>
                      <p className="text-sm text-gray-500">15/12/2023</p>
                    </div>
                    <span className="text-red-600 font-medium">-€1,200</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Vehicle NFT Sale</p>
                      <p className="text-sm text-gray-500">10/12/2023</p>
                    </div>
                    <span className="text-green-600 font-medium">+€25,000</span>
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