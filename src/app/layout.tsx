import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })

export const metadata: Metadata = {
  title: 'Arcade Tracker — Google Cloud Arcade Progress',
  description: 'Track your Google Cloud Arcade badges, points, milestones and swag levels instantly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ paddingTop: '64px' }}>{children}</main>
      </body>
    </html>
  )
}
