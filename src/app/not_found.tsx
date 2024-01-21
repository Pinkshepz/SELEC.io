import Link from "next/link"
import Image from "next/image"

import adenovirus from '../../public/images/adenovirus.png'

export default function NotFound () {
    return (
        <div className="flex flex-col w-full h-[100%] self-center items-center content-center text-center">
            <Image src={adenovirus} alt="" width={100} height={100} className="Up-and-down mt-16 mb-8"/>
            <div className="pixellet text-3xl">Not found</div>
            <div className="pixelify text-xl my-8">This page is currently unavailable</div>
            <Link href={'../'} className="pixelify text-xl px-4 py-2 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                Back to home
            </Link>
        </div>
    )
}