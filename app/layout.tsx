import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Sourceful Energy - Hardware-First Energy Control Platform',
  description: 'The most secure, resilient energy coordination platform. Built on local hardware for reliable, real-time control of distributed energy resources.',
  // Dev branch test - using correct git email
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
