'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";
import React from "react";

export default function GlobalNavigator () {
  let pathnameSplitted: Array<string> = usePathname().split("/");
  if (pathnameSplitted[1] == "") {
    pathnameSplitted.pop();
  }

  let pathCollection: Array<React.ReactNode> = [];

  let pathNav: string = "..";
  
  for (let index = 1; index < pathnameSplitted.length; index++) {
    pathNav += '/';
    pathNav += pathnameSplitted[index];
    console.log(pathnameSplitted)
    pathCollection.push(
      <>
        <span className='mx-2'>{">"}</span>
        <span className="px-2 pb-1 group rounded-xl border transition-colors transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
          <Link href={pathNav}>{pathnameSplitted[index]}</Link>
        </span>
      </>
    )
  }

  return (
    <nav className="fixed left-0 top-0 flex w-full 
    justify-between bg-white/75 z-100
    pb-3 pt-2 pl-4 pr-4 backdrop-blur-lg dark:bg-zinc-800/30 dark:from-inherit">
      <div className='flex flex-row items-center justify-center'>
        <Link href={'./'} className="pixellet text-xl">SELECard</Link>
        <div className="pixellet text-sm">
          {pathCollection}
        </div>
      </div>
    </nav>
  )
}
