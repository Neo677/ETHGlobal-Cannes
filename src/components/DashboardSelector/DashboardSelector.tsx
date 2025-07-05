'use client';

import React from 'react';
import { BasicProfile } from '@/hooks/usePrivySelfProfile';
import { UserRole, ROLE_CONFIGS } from '@/types/profile';
import { OwnerDashboard } from '@/components/Dashboards/OwnerDashboard';
import { DealerDashboard } from '@/components/Dashboards/DealerDashboard';
import { InsurerDashboard } from '@/components/Dashboards/InsurerDashboard';

interface DashboardSelectorProps {
  profile: BasicProfile;
  isAuthenticated: boolean;
}

export const DashboardSelector: React.FC<DashboardSelectorProps> = ({
  profile,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600">
            Please connect to access your dashboard
          </p>
        </div>
      </div>
    );
  }

  if (!profile.role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Role Not Defined
          </h2>
          <p className="text-gray-600 mb-6">
            Please define your role in your profile
          </p>
          <a 
            href="/onboarding"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Onboarding
          </a>
        </div>
      </div>
    );
  }

  // Check if user has permission to access this role
  const userRole = profile.role;
  const roleConfig = ROLE_CONFIGS[userRole];
  
  if (!roleConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Role "{userRole}" is not supported
          </p>
        </div>
      </div>
    );
  }

  // Display the appropriate dashboard based on role
  switch (userRole) {
    case 'owner':
      return <OwnerDashboard profile={profile} />;
    case 'dealer':
      return <DealerDashboard profile={profile} />;
    case 'insurer':
      return <InsurerDashboard profile={profile} />;
    case 'admin':
      // Admin can access all dashboards, but for now show a generic admin view
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h2>
            <p className="text-gray-600">
              Admin functionality coming soon
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600">
              Role "{userRole}" is not yet supported
            </p>
          </div>
        </div>
      );
  }
}; 