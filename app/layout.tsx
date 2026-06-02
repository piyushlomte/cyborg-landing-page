import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron, Rajdhani, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap"
})

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
})

export const metadata: Metadata = {
  title: 'Cyber Nexus | The Future Is Human + Machine',
  description: 'Cyber Nexus pioneers the next evolution of human potential through advanced neural interfaces, AI integration, and cybernetic enhancement technologies. Join the revolution.',
  keywords: ['cybernetics', 'neural interface', 'AI', 'human augmentation', 'future technology', 'biotech'],
  authors: [{ name: 'Cyber Nexus' }],
  creator: 'Cyber Nexus',
  publisher: 'Cyber Nexus',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cybernexus.io',
    siteName: 'Cyber Nexus',
    title: 'Cyber Nexus | The Future Is Human + Machine',
    description: 'Pioneering the next evolution of human potential through advanced neural interfaces and AI integration.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cyber Nexus - Human Machine Integration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Nexus | The Future Is Human + Machine',
    description: 'Pioneering the next evolution of human potential through advanced neural interfaces and AI integration.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#00F7FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
