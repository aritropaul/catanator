import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/ui/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Catanator',
  description: 'Cleanest Catan Board Randomizer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='bg-neutral-900' lang="en">
      <body className={`${inter.className} bg-neutral-900`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
