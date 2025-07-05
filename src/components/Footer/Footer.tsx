'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Description */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚗</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">MetaCarTag</h3>
              <p className="text-sm text-gray-600">Web3 Car Registration</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
            <a 
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © 2024 MetaCarTag. Powered by Privy + Self.ID
          </div>
        </div>
      </div>
    </footer>
  );
}; 