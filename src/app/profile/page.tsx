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

import React, { useState } from 'react';
import { usePrivySelf, BasicProfile } from '@/providers/PrivySelfProvider';

export default function ProfilePage() {
  const {
    isConnected,
    isAuthenticated,
    account,
    did,
    profile,
    loading,
    error,
    connect,
    disconnect,
    readProfile,
    writeProfile,
  } = usePrivySelf();

  const [formData, setFormData] = useState<BasicProfile>({
    name: profile?.name || '',
    email: profile?.email || '',
    insurance: profile?.insurance || '',
    publicName: profile?.publicName || false,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Mettre à jour le formulaire quand le profil change
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        insurance: profile.insurance || '',
        publicName: profile.publicName || false,
      });
    }
  }, [profile]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
  };

  const handleReadProfile = async () => {
    try {
      await readProfile();
    } catch (error) {
      console.error('Failed to read profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await writeProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const updateField = (field: keyof BasicProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MetaCarTag Profile</h1>
          <p className="text-xl text-gray-600">Web3 Identity with Privy + Self.ID</p>
        </div>

        {/* Section de connexion */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Wallet Connection</h2>
          
          {!isConnected ? (
            <div className="text-center">
              <button
                onClick={handleConnect}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                {loading ? 'Connecting...' : 'Connect with Privy'}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Connect with email or SMS to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Informations blockchain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-700">Connected Account:</span>
                  <div className="mt-1 font-mono text-sm bg-gray-100 px-3 py-2 rounded break-all">
                    {account || 'Loading...'}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">DID:</span>
                  <div className="mt-1 font-mono text-sm bg-gray-100 px-3 py-2 rounded break-all">
                    {did || 'Not authenticated'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isAuthenticated ? 'Self.ID Authenticated' : 'Self.ID Pending'}
                </span>
              </div>

              <button
                onClick={handleDisconnect}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Section de profil */}
        {isConnected && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Profile Information</h2>
              <div className="space-x-2">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleReadProfile}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {loading ? 'Loading...' : 'Read Profile'}
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance
                  </label>
                  <input
                    type="text"
                    value={formData.insurance}
                    onChange={(e) => updateField('insurance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., AXA, Allianz"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="publicName"
                    checked={formData.publicName}
                    onChange={(e) => updateField('publicName', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="publicName" className="text-sm text-gray-700">
                    Make name public
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {loading ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {profile ? (
                  <>
                    {profile.name && (
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2">{profile.name}</span>
                        {profile.publicName && (
                          <span className="ml-2 text-green-600 text-sm">(Public)</span>
                        )}
                      </div>
                    )}
                    {profile.email && (
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2">{profile.email}</span>
                      </div>
                    )}
                    {profile.insurance && (
                      <div>
                        <span className="font-medium text-gray-700">Insurance:</span>
                        <span className="ml-2">{profile.insurance}</span>
                      </div>
                    )}
                    {!profile.name && !profile.email && !profile.insurance && (
                      <div className="text-center py-8 text-gray-500">
                        No profile information found. Click "Edit Profile" to add your information.
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No profile loaded. Click "Read Profile" to load your information.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Affichage des erreurs */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2">
              <span className="text-red-600">⚠️</span>
              <span className="font-medium text-red-800">Error</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Instructions */}
        {!isConnected && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">ℹ️</span>
              <span className="font-medium text-blue-800">Getting Started</span>
            </div>
            <div className="text-blue-700 mt-2 space-y-1 text-sm">
              <p>1. Click "Connect with Privy" to authenticate</p>
              <p>2. Use your email or phone number to connect</p>
              <p>3. Your Self.ID will be automatically created</p>
              <p>4. Edit your profile information</p>
              <p>5. Save your profile to Ceramic network</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 