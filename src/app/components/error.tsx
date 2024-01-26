import Link from "next/link"
import Image from "next/image"

import adenovirus from '../../../public/images/adenovirus.png'

export default function NotFound () {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col h-full pt-[20vh] items-center content-center text-center">
                <Image src={adenovirus} alt="" width={100} height={100} className="mb-8"/>
                <div className="pixellet text-3xl">Not found</div>
                <div className="text-xl my-8">Something went wrong</div>
                <Link href={'../'} className="text-xl px-4 py-2 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                    Go to previous page
                </Link>
            </div>
        </div>
    )
}