'use client';

import React, { useEffect } from 'react';
import { usePrivySelf } from '@/providers/PrivySelfProvider';
import { DashboardSelector } from '@/components/DashboardSelector/DashboardSelector';

export default function DashboardPage() {
  const {
    isConnected,
    isAuthenticated,
    profile,
    loading,
    error,
    connect,
    readProfile,
  } = usePrivySelf();

  // Load profile on mount if user is authenticated
  useEffect(() => {
    if (isAuthenticated && !profile) {
      readProfile().catch(console.error);
    }
  }, [isAuthenticated, profile, readProfile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect to access your dashboard
          </p>
          <button
            onClick={connect}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Connect
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardSelector
      profile={profile || {}}
      isAuthenticated={isAuthenticated}
    />
  );
} 