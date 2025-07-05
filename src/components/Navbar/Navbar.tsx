'use client';

import React from 'react';
import Link from 'next/link';
import { usePrivySelf } from '@/providers/PrivySelfProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Navbar: React.FC = () => {
  const { isAuthenticated, profile, disconnect } = usePrivySelf();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo and Home Link */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span className="text-2xl">🚗</span>
              <span>MetaCarTag</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  href="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                
                <Link 
                  href="/profile"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                    {profile?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnect}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Link href="/onboarding">
                <Button size="sm">
                  Connect
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 