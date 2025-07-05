'use client';

import React, { useState } from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';

interface InsurerDashboardProps {
  profile: BasicProfile;
}

export const InsurerDashboard: React.FC<InsurerDashboardProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'policies' | 'claims' | 'customers'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'policies', label: 'Policies', icon: '📋' },
    { id: 'claims', label: 'Claims', icon: '🚨' },
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
                Insurer Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome, {profile.name || 'Insurer'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                🛡️ Insurer
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
                    ? 'border-purple-500 text-purple-600'
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Policies</p>
                    <p className="text-2xl font-semibold text-gray-900">1,247</p>
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
                    <p className="text-sm font-medium text-gray-600">Monthly Premiums</p>
                    <p className="text-2xl font-semibold text-gray-900">€89K</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Open Claims</p>
                    <p className="text-2xl font-semibold text-gray-900">23</p>
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
                    <p className="text-sm font-medium text-gray-600">Insured Customers</p>
                    <p className="text-2xl font-semibold text-gray-900">892</p>
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
                      <p className="text-sm font-medium text-gray-900">New policy subscribed</p>
                      <p className="text-sm text-gray-500">John Doe - BMW X3</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Claim filed</p>
                      <p className="text-sm text-gray-500">Mary Martin - Mercedes Class A</p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Policy renewed</p>
                      <p className="text-sm text-gray-500">Peter Durand - Audi A4</p>
                    </div>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Policy Management</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  + New Policy
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">John Doe - BMW X3</p>
                      <p className="text-sm text-gray-500">Policy #POL-2024-001</p>
                      <p className="text-sm text-gray-500">Expiration: 15/12/2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">€1,200/year</p>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Mary Martin - Mercedes Class A</p>
                      <p className="text-sm text-gray-500">Policy #POL-2024-002</p>
                      <p className="text-sm text-gray-500">Expiration: 20/11/2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">€980/year</p>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Peter Durand - Audi A4</p>
                      <p className="text-sm text-gray-500">Policy #POL-2024-003</p>
                      <p className="text-sm text-gray-500">Expiration: 10/01/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">€1,450/year</p>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Claims Management</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Mary Martin - Mercedes Class A</p>
                      <p className="text-sm text-gray-500">Claim #CLAIM-2024-001</p>
                      <p className="text-sm text-gray-500">Type: Collision</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">€3,500</p>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">In Progress</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">John Doe - BMW X3</p>
                      <p className="text-sm text-gray-500">Claim #CLAIM-2024-002</p>
                      <p className="text-sm text-gray-500">Type: Theft</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">€25,000</p>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Resolved</span>
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
                      <p className="text-sm text-gray-500">Insured vehicles: 1</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-green-600">Loyal customer</span>
                      <p className="text-sm text-gray-500">Since 2020</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Mary Martin</p>
                      <p className="text-sm text-gray-500">mary.martin@email.com</p>
                      <p className="text-sm text-gray-500">Insured vehicles: 1</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-blue-600">New customer</span>
                      <p className="text-sm text-gray-500">Since 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Peter Durand</p>
                      <p className="text-sm text-gray-500">pierre.durand@email.com</p>
                      <p className="text-sm text-gray-500">Insured vehicles: 2</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-green-600">Premium customer</span>
                      <p className="text-sm text-gray-500">Since 2018</p>
                    </div>
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