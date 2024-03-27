import { Span } from "next/dist/trace";

export default function DisplayCard ({
    cardId,
    cardLightText,
    cardImageLink,
    cardTitle,
    cardDescription,
    cardAction,
    cardSize
}: {
    cardId: string;
    cardLightText?: string;
    cardImageLink: string;
    cardTitle: string;
    cardDescription?: string;
    cardAction?: string;
    cardSize: number;
}) {
    let size_pipe: React.ReactNode[] = []
    for (let index = 0; index < cardSize; index++) {
        if (cardAction == 'Completed') {
            size_pipe.push(<span id="pipe-pri" className=""></span>)
        } else {
            size_pipe.push(<span id="pipe-neu" className=""></span>)
        }
        
    }
    return (
        <div className="-card-hover" id='card-main'>
            <div className="overflow-hidden">
                {cardImageLink ? <img src={cardImageLink} alt="" className="h-[30vh]" height={1000} width={1000} /> :
                <img src="https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708560000&semt=ais" alt="" className="h-[25vw] lg:h-[20vw]" height={840} width={840} />}
            </div>
            <div className="p-4">
                <p className="text-neutral-300 dark:text-neutral-500">{cardLightText}</p>
                <h4 className="mt-2 text-md font-[600]">{cardTitle}</h4>
                <p className="mt-6 text-sm font-light">{cardDescription}</p>
                
                <div className="flex flex-row justify-between w-full mt-4">
                    {cardAction == 'Completed' 
                        ? <div id="chip-action-pri">{cardAction}</div>
                        : <div id="chip-action-neu">{cardAction}</div>}
                    <span className="flex flex-row gap-1 ml-2">
                        <span className="px-1 font-bold">{cardSize}X</span>
                        {size_pipe}
                    </span>
                </div>
                
            </div>
        </div>
    )
}
