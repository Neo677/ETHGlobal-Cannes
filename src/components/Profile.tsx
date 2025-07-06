'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface BasicProfile {
  name?: string;
  email?: string;
  ethAddress?: string;
  publicName?: boolean;
}

interface ProfileProps {
  onProfileUpdate?: (profile: BasicProfile, did: string) => void;
  onDidChange?: (did: string) => void;
}

export default function Profile({ onProfileUpdate, onDidChange }: ProfileProps) {
  const [account, setAccount] = useState<string>('');
  const [did, setDid] = useState<string>('');
  const [profile, setProfile] = useState<BasicProfile>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [viewDid, setViewDid] = useState<string>('');
  const [viewProfile, setViewProfile] = useState<BasicProfile>({});
  const [isEditing, setIsEditing] = useState(false);

  // Connect wallet via Privy
  const connectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Simulation de connexion Privy
      const account = '0x' + Math.random().toString(16).substr(2, 40);
      setAccount(account);

      // Generate a simple DID from the wallet address
      const did = `did:ethr:${account}`;
      setDid(did);
      onDidChange?.(did);

      // Load profile from localStorage for demo
      const savedProfile = localStorage.getItem(`profile_${account}`);
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setProfile(profileData);
        onProfileUpdate?.(profileData, did);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  }, [onDidChange, onProfileUpdate]);

  // Save profile
  const saveProfile = useCallback(async () => {
    if (!account) return;

    try {
      setLoading(true);
      setError('');

      const updatedProfile = {
        ...profile,
        ethAddress: account,
      };

      // Save to localStorage for demo
      localStorage.setItem(`profile_${account}`, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      onProfileUpdate?.(updatedProfile, did);
      setIsEditing(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  }, [profile, account, did, onProfileUpdate]);

  // View profile by DID - simplified approach
  const viewProfileByDid = useCallback(async () => {
    if (!viewDid.trim()) return;

    try {
      setLoading(true);
      setError('');

      // For demo purposes, try to extract ETH address from DID and check localStorage
      const ethAddressMatch = viewDid.match(/did:ethr:(0x[a-fA-F0-9]{40})/);
      if (ethAddressMatch) {
        const ethAddress = ethAddressMatch[1];
        const savedProfile = localStorage.getItem(`profile_${ethAddress}`);
        if (savedProfile) {
          const profileData = JSON.parse(savedProfile);
          setViewProfile(profileData);
        } else {
          setError('Profile not found for this DID');
          setViewProfile({});
        }
      } else {
        setError('Invalid DID format. Expected: did:ethr:0x...');
        setViewProfile({});
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      setViewProfile({});
    } finally {
      setLoading(false);
    }
  }, [viewDid]);

  // Update profile field
  const updateProfileField = (field: keyof BasicProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">MetaCarTag Profile</h2>

      {/* Wallet Connection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Wallet Connection</h3>
        
        {!account ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Connected Account:</p>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">{account}</p>
            {did && (
              <>
                <p className="text-sm text-gray-600 mt-2">DID:</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">{did}</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Profile Management */}
      {account && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">My Profile</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={saveProfile}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => updateProfileField('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => updateProfileField('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="publicName"
                  checked={profile.publicName || false}
                  onChange={(e) => updateProfileField('publicName', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="publicName" className="text-sm text-gray-700">
                  Make name public
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {profile.name && (
                <p><span className="font-medium">Name:</span> {profile.name}</p>
              )}
              {profile.email && (
                <p><span className="font-medium">Email:</span> {profile.email}</p>
              )}
              {profile.publicName && (
                <p><span className="font-medium">Public Name:</span> Yes</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* View Profile by DID */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">View Profile by DID</h3>
        
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={viewDid}
            onChange={(e) => setViewDid(e.target.value)}
            placeholder="Enter DID (e.g., did:ethr:0x...)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={viewProfileByDid}
            disabled={loading || !viewDid.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? 'Loading...' : 'View'}
          </button>
        </div>

        {Object.keys(viewProfile).length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Profile Details:</h4>
            <div className="space-y-1">
              {viewProfile.name && (
                <p><span className="font-medium">Name:</span> {viewProfile.name}</p>
              )}
              {viewProfile.email && (
                <p><span className="font-medium">Email:</span> {viewProfile.email}</p>
              )}
              {viewProfile.ethAddress && (
                <p><span className="font-medium">ETH Address:</span> <span className="font-mono text-sm">{viewProfile.ethAddress}</span></p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
} 