'use client';

import { Hero } from '@/components/Hero/Hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Available Roles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎯 Available Roles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the role that best matches your activity in the MetaCarTag ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">🚗</div>
                <CardTitle className="text-xl">Owner</CardTitle>
                <p className="text-gray-600 text-sm">Vehicle owner</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-6">
                  <Badge variant="secondary" className="mr-2">Transfer NFTs</Badge>
                  <Badge variant="secondary">Manage Insurance</Badge>
                  <Badge variant="secondary">View History</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Manage your vehicles and insurance policies with full control over your NFT assets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">🏢</div>
                <CardTitle className="text-xl">Dealer</CardTitle>
                <p className="text-gray-600 text-sm">Vehicle seller</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-6">
                  <Badge variant="secondary" className="mr-2">Create NFTs</Badge>
                  <Badge variant="secondary">Manage Inventory</Badge>
                  <Badge variant="secondary">Track Sales</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Manage your vehicle inventory and create NFTs for each vehicle in your dealership.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">🛡️</div>
                <CardTitle className="text-xl">Insurer</CardTitle>
                <p className="text-gray-600 text-sm">Insurance company</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-6">
                  <Badge variant="secondary" className="mr-2">Manage Policies</Badge>
                  <Badge variant="secondary">Process Claims</Badge>
                  <Badge variant="secondary">Verify Profiles</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Manage insurance policies, process claims, and verify customer profiles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🛠️ Powered By
            </h2>
            <p className="text-lg text-gray-600">
              Built with cutting-edge Web3 technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="font-semibold text-gray-900">Privy</h3>
                <p className="text-sm text-gray-600">Identity & Auth</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🆔</div>
                <h3 className="font-semibold text-gray-900">Self.ID</h3>
                <p className="text-sm text-gray-600">Decentralized Identity</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🌊</div>
                <h3 className="font-semibold text-gray-900">Flow</h3>
                <p className="text-sm text-gray-600">Blockchain</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🌴</div>
                <h3 className="font-semibold text-gray-900">Oasis</h3>
                <p className="text-sm text-gray-600">Privacy Layer</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
} 