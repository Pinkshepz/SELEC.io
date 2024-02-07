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
        <div className="-card-hover md:p-[1px]">
            <img src={cardImageLink} alt="image" className="object-cover h-[25vw] lg:h-[20vw]" height={840} width={840} />
            <div className="pl-2 md:pl-0">
                <h4 className="mt-2 text-md font-[600]">{cardTitle}</h4>
                <p className="mt-1 mb-3 text-xs font-light">{cardDescription}</p>
                <div className="flex flex-row text-xs">
                    <span className="px-2 py-1 mr-2 group rounded-lg border transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">
                        {cardId}</span>
                    <span className="px-2 py-1 mr-2 group rounded-lg border transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">
                        {cardCategory}</span>
                </div>
            </div>
        </div>
    )
}
