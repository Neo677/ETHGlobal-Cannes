'use client';

import React, { useState } from 'react';
import { usePrivySelf } from '@/providers/PrivySelfProvider';
import { RoleSelector } from '@/components/RoleSelector/RoleSelector';
import { UserRole } from '@/types/profile';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function OnboardingPage() {
  const {
    isConnected,
    isAuthenticated,
    profile,
    loading,
    error,
    connect,
    writeProfile,
  } = usePrivySelf();

  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
    profile?.role
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (!selectedRole) return;

    setIsSubmitting(true);
    try {
      // Create or update profile with selected role
      const updatedProfile = {
        ...profile,
        role: selectedRole,
        // Initialize default values for new fields
        vehicleID: profile?.vehicleID || '',
        nftId: profile?.nftId || '',
        history: profile?.history || [],
      };
      
      await writeProfile(updatedProfile);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
              Please connect to continue with onboarding
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Profile Configuration
              </h1>
              <p className="text-gray-600">
                Welcome, {profile?.name || 'User'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ✅ Connected
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <CardTitle className="text-3xl">Choose Your Role</CardTitle>
            <p className="text-lg text-gray-600">
              Select the role that best matches your activity in the MetaCarTag ecosystem
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <RoleSelector
              onRoleSelect={handleRoleSelect}
              selectedRole={selectedRole}
              disabled={isSubmitting}
            />

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={!selectedRole || isSubmitting}
                size="lg"
                className="px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Configuring...
                  </div>
                ) : (
                  'Continue to Dashboard'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 