import Image from "next/image";
import Link from "next/link";

export default function Cardset ({
    cardsetId,
    cardsetType,
    cardsetImageUrl,
    cardsetTitle,
    cardsetDescription
}: {
    cardsetId: string;
    cardsetType: string;
    cardsetImageUrl: string;
    cardsetTitle: string;
    cardsetDescription: string;
}) {
    return (
        <Link href={`./[cardset]/${cardsetId}`} as={cardsetId}>
            <div className="flex flex-col p-2 mb-2 group rounded-xl border border-transparent transition-colors transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <img src={cardsetImageUrl} alt="image" className="rounded-lg h-[50vw] sm:h-[25vw] md:h-[15vw] lg:h-[12vw] xl:h-[10vw]"></img>
                <p className="mt-2 text-md font-medium">{cardsetTitle}</p>
                <p className="mt-1 mb-3 text-xs font-light">{cardsetDescription}</p>
                <div className="flex flex-row text-xs">
                    <span className="px-2 py-1 mr-2 group rounded-lg border transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">{cardsetId}</span>
                    <span className="px-2 py-1 mr-2 group rounded-lg border transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">{cardsetType}</span>
                </div>
            </div>
        </Link>
    )
}
