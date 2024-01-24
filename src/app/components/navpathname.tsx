'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function NavPathName (): React.ReactNode {
    // Provide interactive path displaying on nav. like we use in folder UI

    // Get pathname e.g. ./SIID256/256-X1
    // And split into array ["", "SIID256", "256-X1"]
    let pathnameSplitted: Array<string> = usePathname().split("/");

    // In case we are in home page: ./
    // The array of pathname is ["", ""]
    // It causes bug, so we gonna pop one "" out
    if (pathnameSplitted[1] == "") {
        pathnameSplitted.pop();
    }

    let pathCollection: Array<React.ReactNode> = [];

    let pathNav: string = "";

    for (let index = 1; index < pathnameSplitted.length; index++) {
        pathNav += '/';
        pathNav += pathnameSplitted[index];
        pathCollection.push(
            <>
                <span className='mx-2'>{">"}</span>
                <span className="px-2 group rounded-xl border transition-colors transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                    <Link href={pathNav}>{pathnameSplitted[index]}</Link>
                </span>
            </>
        );
    }

    return (
        <div className="text-md mt-1 flex flex-row justify-center item-center">
            {pathCollection}
        </div>
    );
}
