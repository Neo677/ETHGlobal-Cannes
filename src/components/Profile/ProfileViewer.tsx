'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExtendedProfile } from '@/types/profile';

interface ProfileViewerProps {
  profile: ExtendedProfile;
  onClose?: () => void;
}

export const ProfileViewer: React.FC<ProfileViewerProps> = ({ profile, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              👤 Profile Viewer
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.name && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Name:</span>
                  <span className="ml-2">{profile.name}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="ml-2">{profile.email}</span>
                </div>
              )}
              {profile.ethAddress && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">ETH Address:</span>
                  <span className="ml-2 font-mono text-sm">{profile.ethAddress}</span>
                </div>
              )}
              {profile.role && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Role:</span>
                  <Badge variant="secondary" className="ml-2">
                    {profile.role}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Role Metadata */}
          {profile.roleMetadata && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Role Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.roleMetadata.companyName && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Company:</span>
                    <span className="ml-2">{profile.roleMetadata.companyName}</span>
                  </div>
                )}
                {profile.roleMetadata.licenseNumber && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">License:</span>
                    <span className="ml-2">{profile.roleMetadata.licenseNumber}</span>
                  </div>
                )}
                {profile.roleMetadata.businessAddress && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Address:</span>
                    <span className="ml-2">{profile.roleMetadata.businessAddress}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Verification Status */}
          {profile.verification && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Trust Level:</span>
                  <Badge 
                    variant={profile.verification.trustLevel === 'verified' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {profile.verification.trustLevel}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Score:</span>
                  <span className="ml-2">{profile.verification.verificationScore}/100</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Email Verified:</span>
                  <Badge 
                    variant={profile.verification.emailVerified ? 'default' : 'destructive'}
                    className="ml-2"
                  >
                    {profile.verification.emailVerified ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Role Verified:</span>
                  <Badge 
                    variant={profile.verification.roleVerified ? 'default' : 'destructive'}
                    className="ml-2"
                  >
                    {profile.verification.roleVerified ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {profile.history && profile.history.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">History</h3>
              <div className="space-y-2">
                {profile.history.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <span className="text-sm">•</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Contact User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 