'use client';

import React, { useEffect, Suspense } from 'react';
import { usePrivySelf } from '@/providers/PrivySelfProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// Lazy load the DashboardSelector to improve initial load time
const DashboardSelector = React.lazy(() => import('@/components/DashboardSelector/DashboardSelector').then(module => ({ default: module.DashboardSelector })));

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

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="text-4xl mb-4">🔐</div>
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <p className="text-gray-600">
              Please connect to access your dashboard
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={connect} className="w-full">
              Connect with Privy
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <CardTitle className="text-2xl">Error</CardTitle>
            <p className="text-red-600">{error}</p>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardSelector
        profile={profile || {}}
        isAuthenticated={isAuthenticated}
      />
    </Suspense>
  );
} 