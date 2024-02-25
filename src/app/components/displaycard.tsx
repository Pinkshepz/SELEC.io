export default function DisplayCard ({
    cardId,
    cardGroup,
    cardCategory,
    cardImageLink,
    cardTitle,
    cardDescription
}: {
    cardId: string;
    cardGroup?: string;
    cardCategory?: string;
    cardImageLink: string;
    cardTitle: string;
    cardDescription?: string;
}) {
    return (
        <div className="-card-hover" id={cardId}>
            <div className="overflow-hidden">
                {cardImageLink ? <img src={cardImageLink} alt="" className="h-[25vw] lg:h-[20vw]" height={840} width={840} /> :
                <img src="https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708560000&semt=ais" alt="" className="h-[25vw] lg:h-[20vw]" height={840} width={840} />}
            </div>
            <div className="pl-2">
                <h4 className="mt-2 text-md font-[600]">{cardTitle}</h4>
                <p className="mt-1 mb-3 text-xs font-light">{cardDescription}</p>
                <div className="flex flex-wrap text-xs gap-1">
                    {cardGroup &&
                    <span className="px-2 py-1 rounded-lg border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">
                        {cardGroup}</span>}
                    {cardCategory &&
                    <span className="px-2 py-1 rounded-lg border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">
                        {cardCategory}</span>}
                </div>
            </div>
        </div>
    )
}
