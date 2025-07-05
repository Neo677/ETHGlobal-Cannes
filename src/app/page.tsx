'use client';

import Profile from '@/components/Profile'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">MetaCarTag</h1>
        <p className="text-xl text-gray-600">Web3 Car Registration with Self.ID</p>
      </div>
      
      <Profile 
        onProfileUpdate={(profile, did) => {
          console.log('Profile updated:', profile, 'DID:', did);
        }}
        onDidChange={(did) => {
          console.log('DID changed:', did);
        }}
      />
    </main>
  )
} 