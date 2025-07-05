/**
 * pages/profile.tsx
 * 
 * Page de profil MetaCarTag avec Privy + Self.ID
 * 
 * Fonctionnalités:
 * - Connexion via Privy (email/SMS)
 * - Affichage du compte connecté et DID
 * - Formulaire de profil (name, email, insurance)
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    insurance: '',
    role: '' as UserRole | '',
    vehicleID: '',
    nftId: '',
    history: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newHistoryItem, setNewHistoryItem] = useState('');

  // Load profile data when component mounts
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        insurance: profile.insurance || '',
        role: profile.role || '',
        vehicleID: profile.vehicleID || '',
        nftId: profile.nftId || '',
        history: profile.history || [],
      });
    }
  }, [profile]);

  // Memoize input change handler
  const handleInputChange = useCallback((field: string, value: string | UserRole) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
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
      alert('Profile updated successfully!');
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
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
                  {(['owner', 'dealer', 'insurer'] as UserRole[]).map((role) => {
                    const config = ROLE_CONFIGS[role];
                    return (
                      <Card
                        key={role}
                        className={`
                          cursor-pointer transition-all border-2
                          ${formData.role === role
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

              {/* Vehicle Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle ID (VIN)
                    </label>
                    <Input
                      type="text"
                      value={formData.vehicleID}
                      onChange={(e) => handleInputChange('vehicleID', e.target.value)}
                      placeholder="Enter vehicle VIN"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NFT ID
                    </label>
                    <Input
                      type="text"
                      value={formData.nftId}
                      onChange={(e) => handleInputChange('nftId', e.target.value)}
                      placeholder="Enter NFT ID"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Provider
                </label>
                <Input
                  type="text"
                  value={formData.insurance}
                  onChange={(e) => handleInputChange('insurance', e.target.value)}
                  placeholder="Enter insurance provider"
                />
              </div>

              <Separator />

              {/* History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  History
                </h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={newHistoryItem}
                      onChange={(e) => setNewHistoryItem(e.target.value)}
                      placeholder="Add history item"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleHistoryAdd())}
                    />
                    <Button
                      type="button"
                      onClick={handleHistoryAdd}
                      size="sm"
                      className="px-4"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.history.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{item}</span>
                        <Button
                          type="button"
                          onClick={() => handleHistoryRemove(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
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
    </div>
  );
} 