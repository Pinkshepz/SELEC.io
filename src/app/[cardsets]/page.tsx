'use client'

import { usePathname } from 'next/navigation'

export default function Page ({ 
    cardset
}: { 
    cardset: string
}) {
    const pathname = usePathname();

    return (
        <>
            <div className="flex flex-row">
                <img src={'https://assets.technologynetworks.com/production/dynamic/images/content/378690/bacteria-generate-electricity-from-wastewater-378690-960x540.webp?cb=12463708'} alt="image" className="rounded-full w-16 h-16 mr-4"></img>
                <div className='flex flex-col'>
                    <p className="mb-2 pixellet text-lg">{'Medically bacteria I : coccus'}</p>
                    <div className="flex flex-row text-xs">
                        <span className="px-2 py-1 mr-2 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">{pathname}</span>
                        <span className="px-2 py-1 mr-2 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">{'T/F Recall'}</span>
                    </div>
                </div>
            </div>
        </>
    )
  }
