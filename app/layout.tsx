import './globals.scss';
// import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Stellar Observatory',
  description: 'Your gateway to the cosmos, The Stellar Observatory offers a curated journey through the wonders of the universe. From the latest Mars images in high resolution to the most cutting-edge spacecraft that will take us there and beyond. Your adventure through the cosmos begins here.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children} <Analytics/> 
        </body>
    </html>
  )
}
