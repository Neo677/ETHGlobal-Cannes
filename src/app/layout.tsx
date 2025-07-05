import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PrivyProvider } from '@/providers/PrivyProvider'
import { PrivySelfProvider } from '@/providers/PrivySelfProvider'

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
            {children}
          </PrivySelfProvider>
        </PrivyProvider>
      </body>
    </html>
  )
} 