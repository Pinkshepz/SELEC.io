import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalNavigator from './navigator'

import './styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={`${inter.className}`}>
        <GlobalNavigator />
        <div className='flex flex-col pt-12'>
          {children}
        </div>
      </body>
    </html>
  )
}
