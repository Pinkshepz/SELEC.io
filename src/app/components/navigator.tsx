'use client'

import Link from "next/link";
import React from "react";
import NavPathName from "./navpathname";

export default function GlobalNavigator () {
  return (
    <nav className="px-6 fixed left-0 top-0 flex w-full h-16 z-100
    justify-between pb-3 pt-2 pl-4 pr-4 backdrop-blur-xl">
      <div className='flex flex-row items-center justify-center'>
        <Link href={'/'} className="-button-line pixellet relative text-2xl font-bold after:bg-slate-700 dark:after:bg-slate-200">
          SELESTIAL</Link>
        <NavPathName />
      </div>
    </nav>
  )
}
