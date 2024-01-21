'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";
import React from "react";

export default function GlobalNavigator () {
  const pathname = usePathname().split('/');
  
  return (
    <nav className="fixed left-0 top-0 flex w-full 
    justify-between bg-white/75 z-100
    pb-3 pt-2 pl-4 pr-4 backdrop-blur-lg dark:bg-zinc-800/30 dark:from-inherit">
      <Link href={'./'} className="pixellet text-xl">SELECard</Link>
      <div className="pixelify text-lg">
        <span className="hover:underline">
          <Link href={`../`}></Link>
        </span>
        <span>/{pathname}</span>
      </div>
    </nav>
  )
}
