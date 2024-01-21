export default function DisplayCard ({
    cardId,
    cardGroup,
    cardCategory,
    cardImageLink,
    cardTitle,
    cardDescription
}: {
    cardId: string;
    cardGroup: string;
    cardCategory: string;
    cardImageLink: string;
    cardTitle: string;
    cardDescription: string;
}) {
    return (
        <div className="flex flex-col p-2 mb-2 group rounded-xl border border-transparent transition-colors transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <img src={cardImageLink} alt="image" className="rounded-lg h-[50vw] sm:h-[25vw] md:h-[15vw] lg:h-[12vw] xl:h-[10vw]" height={840} width={840} />
            <p className="mt-2 text-md font-medium">{cardTitle}</p>
            <p className="mt-1 mb-3 text-xs font-light">{cardDescription}</p>
            <div className="flex flex-row text-xs">
                <span className="px-2 py-1 mr-2 group rounded-lg border transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">
                    {cardId}</span>
                <span className="px-2 py-1 mr-2 group rounded-lg border transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">
                    {cardCategory}</span>
            </div>
        </div>
    )
}
