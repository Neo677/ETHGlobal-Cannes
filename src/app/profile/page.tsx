/**
 * pages/profile.tsx
 * 
 * Page de profil MetaCarTag avec Privy + Self.ID
 * 
 * Fonctionnalités:
 * - Connexion via Privy (email/SMS)
 * - Affichage du compte connecté et DID
 * - Formulaire de profil (name, email)
 * - Lecture/écriture du profil Self.ID
 * 
 * Setup:
 * 1. Configurer les variables d'environnement
 * 2. Wrapper l'app avec PrivyProvider + PrivySelfProvider
 * 3. Installer les dépendances Privy + Self.ID
 */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { usePrivySelf } from '@/providers/PrivySelfProvider';
import { UserRole, ROLE_CONFIGS } from '@/types/profile';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, X, User, Car, Shield, History } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileFormData {
  name: string;
  email: string;
  role: UserRole;
  roleMetadata: {
    companyName: string;
    licenseNumber: string;
    businessAddress: string;
  };
  history: string[];
}

export default function ProfilePage() {
  const {
    isAuthenticated,
    profile,
    loading,
    error,
    connect,
    writeProfile,
  } = usePrivySelf();

  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    role: 'owner',
    roleMetadata: {
      companyName: '',
      licenseNumber: '',
      businessAddress: '',
    },
    history: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newHistoryItem, setNewHistoryItem] = useState('');
  const [saved, setSaved] = useState(false);

  // Load profile data when component mounts
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        role: profile.role || 'owner',
        roleMetadata: {
          companyName: profile.roleMetadata?.companyName || '',
          licenseNumber: profile.roleMetadata?.licenseNumber || '',
          businessAddress: profile.roleMetadata?.businessAddress || '',
        },
        history: profile.history || [],
      });
    }
  }, [profile]);

  // Memoize input change handler
  const handleInputChange = useCallback((field: keyof ProfileFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Memoize role metadata change handler
  const handleRoleMetadataChange = useCallback((field: keyof ProfileFormData['roleMetadata'], value: string) => {
    setFormData(prev => ({
      ...prev,
      roleMetadata: {
        ...prev.roleMetadata,
        [field]: value,
      },
    }));
  }, []);

  // Memoize history add handler
  const handleHistoryAdd = useCallback(() => {
    if (newHistoryItem.trim()) {
      setFormData(prev => ({
        ...prev,
        history: [...prev.history, newHistoryItem.trim()],
      }));
      setNewHistoryItem('');
    }
  }, [newHistoryItem]);

  // Memoize history remove handler
  const handleHistoryRemove = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      history: prev.history.filter((_, i) => i !== index),
    }));
  }, []);

  // Memoize submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setIsSubmitting(true);
    try {
      await writeProfile({
        ...profile,
        ...formData,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  }, [isAuthenticated, profile, formData, writeProfile]);

  // Memoize loading content
  const loadingContent = useMemo(() => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
          <Skeleton className="h-6 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </CardHeader>
      </Card>
    </div>
  ), []);

  // Memoize auth required content
  const authRequiredContent = useMemo(() => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="text-4xl mb-4">🔐</div>
          <CardTitle className="text-2xl">Authentication Required</CardTitle>
          <p className="text-gray-600">
            Please connect to edit your profile
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={connect} className="w-full">
            Connect with Privy
          </Button>
        </CardContent>
      </Card>
    </div>
  ), [connect]);

  if (loading) {
    return loadingContent;
  }

  if (!isAuthenticated) {
    return authRequiredContent;
  }

  const roleConfig = ROLE_CONFIGS[formData.role];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Profile
              </h1>
              <p className="text-gray-600">
                Update your profile information
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
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <User className="w-6 h-6 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Role Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Role
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['owner', 'seller'] as UserRole[]).map((role) => {
                    const config = ROLE_CONFIGS[role];
                    const isSelected = formData.role === role;

                    return (
                      <Card
                        key={role}
                        className={`
                          cursor-pointer transition-all border-2
                          ${isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                        onClick={() => handleInputChange('role', role)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-white
                              ${config.color}
                            `}>
                              {config.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{config.label}</h4>
                              <p className="text-sm text-gray-600">{config.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Role-specific Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Role Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.roleMetadata.companyName}
                      onChange={(e) => handleRoleMetadataChange('companyName', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.roleMetadata.licenseNumber}
                      onChange={(e) => handleRoleMetadataChange('licenseNumber', e.target.value)}
                      placeholder="Enter license number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Textarea
                      id="businessAddress"
                      value={formData.roleMetadata.businessAddress}
                      onChange={(e) => handleRoleMetadataChange('businessAddress', e.target.value)}
                      placeholder="Enter business address"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Profile saved successfully!
        </div>
      )}
    </div>
  );
} 