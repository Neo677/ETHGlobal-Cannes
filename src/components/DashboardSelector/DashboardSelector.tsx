'use client';

import React, { Suspense } from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';
import { UserRole, ROLE_CONFIGS } from '@/types/profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load dashboards to improve performance
const OwnerDashboard = React.lazy(() => import('@/components/Dashboards/OwnerDashboard').then(module => ({ default: module.OwnerDashboard })));
const SellerDashboard = React.lazy(() => import('@/components/Dashboards/SellerDashboard').then(module => ({ default: module.SellerDashboard })));
const InsurerDashboard = React.lazy(() => import('@/components/Dashboards/InsurerDashboard').then(module => ({ default: module.InsurerDashboard })));

interface DashboardSelectorProps {
  profile: BasicProfile;
  isAuthenticated: boolean;
}

// Loading skeleton for dashboards
const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </div>
  </div>
);

export const DashboardSelector: React.FC<DashboardSelectorProps> = ({
  profile,
  isAuthenticated,
}) => {
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
            <Button className="w-full">
              Connect
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile.role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <CardTitle className="text-2xl">Role Not Defined</CardTitle>
            <p className="text-gray-600">
              Please define your role in your profile
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="w-full">
              <a href="/onboarding">Go to Onboarding</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user has permission to access this role
  const userRole = profile.role;
  const roleConfig = ROLE_CONFIGS[userRole];
  
  if (!roleConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="text-4xl mb-4">🚫</div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <p className="text-gray-600">
              Role "{userRole}" is not supported
            </p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Display the appropriate dashboard based on role
  switch (userRole) {
    case 'owner':
      return (
        <Suspense fallback={<DashboardSkeleton />}>
          <OwnerDashboard profile={profile} />
        </Suspense>
      );
    case 'seller':
      return (
        <Suspense fallback={<DashboardSkeleton />}>
          <SellerDashboard profile={profile} />
        </Suspense>
      );
    case 'insurer':
      return (
        <Suspense fallback={<DashboardSkeleton />}>
          <InsurerDashboard profile={profile} />
        </Suspense>
      );
    case 'admin':
      // Admin can access all dashboards, but for now show a generic admin view
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">👑</div>
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              <p className="text-gray-600">
                Admin functionality coming soon
              </p>
            </CardHeader>
          </Card>
        </div>
      );
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">🚫</div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <p className="text-gray-600">
                Role "{userRole}" is not yet supported
              </p>
            </CardHeader>
          </Card>
        </div>
      );
  }
}; 