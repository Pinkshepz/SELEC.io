'use client'

import Link from "next/link";
import React from "react";
import NavPathName from "./navpathname";

export default function GlobalNavigator () {
  return (
    <nav className="px-6 fixed left-0 top-0 flex w-full h-16 z-100
    justify-between border-b border-slate-800/10 dark:border-slate-50/40
    pb-3 pt-2 pl-4 pr-4 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md">
      <div className='flex flex-row items-center justify-center'>
        <Link href={'/'} className="-button-line pixellet relative text-xl font-bold after:bg-slate-700 dark:after:bg-slate-200">
          SELEC.io</Link>
        <NavPathName />
      </div>
      <div className='flex flex-row items-center justify-center gap-4'>
        <Link href={'/course'} className="-button-line relative text-md after:bg-slate-700 dark:after:bg-slate-200">
          Courses</Link>
        <Link href={'../'} className="-button-line relative text-md after:bg-slate-700 dark:after:bg-slate-200">
          Library</Link>
      </div>
    </nav>
  )
}
