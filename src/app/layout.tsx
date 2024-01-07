import type { Metadata } from 'next'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import GlobalNavigator from './navigator'

import './styles/globals.css'
import bg from '../../public/bg.png';

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalNavigator />
        <div className='fixed z-[-100] w-[100%]'>
          <div className='absolute w-[100%] h-[100vh] bg-white/95 dark:bg-black/85 backdrop-blur-md dark:backdrop-blur-lg'></div>
          <Image src={bg} alt='' width={1000} height={1000} className='w-[100%]' />
        </div>
        <div className='mt-12 pl-4 pr-4'>
          {children}
        </div>
      </body>
    </html>
  )
}
