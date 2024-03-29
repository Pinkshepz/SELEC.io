import React from 'react'
import type { Metadata } from 'next'
import GlobalNavigator from './components/navigator'
import './styles/globals.css'
import './styles/fontface.css'

export const metadata: Metadata = {
  title: 'Selestial',
  description: 'Explore. Extract. Exam. Exercise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <GlobalNavigator />
      </body>
    </html>
  );
}
