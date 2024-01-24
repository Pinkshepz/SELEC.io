import React from 'react'
import type { Metadata } from 'next'

import GlobalNavigator from './components/navigator'

import './styles/globals.css'
import './styles/fontface.css'

export const metadata: Metadata = {
  title: 'SELECard',
  description: '-_-',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("-----INITIATE APP-----")
  return (
    <React.StrictMode>
      <html lang="en">
        <body>
          <GlobalNavigator />
          <main className='pt-16'>
            {children}
          </main>
        </body>
      </html>
    </React.StrictMode>
  )
}
