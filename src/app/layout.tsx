import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PrivyProvider } from '@/providers/PrivyProvider'
import { PrivySelfProvider } from '@/providers/PrivySelfProvider'
import { Navbar } from '@/components/Navbar/Navbar'
import { Footer } from '@/components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MetaCarTag - Web3 Car Registration',
  description: 'Decentralized vehicle registration with Privy + Self.ID',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider>
          <PrivySelfProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </PrivySelfProvider>
        </PrivyProvider>
      </body>
    </html>
  )
} 