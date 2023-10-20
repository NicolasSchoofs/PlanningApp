import * as React from 'react'
import Navbar from './components/navbar'


import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calendar App',
  description: 'A calendar and kanban app to keep track of projects and other events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
    <html lang="en">
        <body>
        <Providers>
            <Navbar />
            {children}
      </Providers>
      </body>
    </html>
  )
}
