'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">🚗 MetaCarTag</h1>
          <p className="text-2xl text-gray-600 mb-8">Web3 Car Registration with Privy + Self.ID</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-6">Welcome to MetaCarTag</h2>
          <p className="text-lg text-gray-600 mb-8">
            Decentralized vehicle registration system using NFTs and decentralized identity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🔐</div>
              <h3 className="text-lg font-semibold mb-2">Privy Identity</h3>
              <p className="text-gray-600">Connect with email or SMS using Privy</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🆔</div>
              <h3 className="text-lg font-semibold mb-2">Self.ID Profile</h3>
              <p className="text-gray-600">Decentralized identity on Ceramic</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🚗</div>
              <h3 className="text-lg font-semibold mb-2">Vehicle NFTs</h3>
              <p className="text-gray-600">NFT-based vehicle registration</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link 
              href="/profile"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Get Started with Profile
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>Powered by Privy + Self.ID + Flow + Oasis</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">🚀 Quick Start</h3>
          <div className="text-left space-y-2 text-sm">
            <p>1. <strong>Connect</strong> - Use Privy to connect with email/SMS</p>
            <p>2. <strong>Authenticate</strong> - Self.ID creates your decentralized identity</p>
            <p>3. <strong>Profile</strong> - Add your name, email, and insurance info</p>
            <p>4. <strong>Save</strong> - Your profile is stored on Ceramic network</p>
          </div>
        </div>
      </div>
    </main>
  );
} 