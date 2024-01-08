'use client'

import { useState } from "react";
import './card.css';

function Card ({
    ID,
    Group,
    Category,
    Level,
    Link,
    Question,
    Answer,
    Description,
    Flipped
}: {
    ID: string;
    Group: string;
    Category: string;
    Level: string;
    Link: string;
    Question: string;
    Answer: string;
    Description: string;
    Flipped: boolean;
}
) {
    const stringToHTML = (str: string) => {
        var dom = document.createElement('div');
        dom.innerHTML = str;
        return dom;
    }
    console.log(stringToHTML(Question))
    
    return (
        <div className="relative flex w-[100%] h-[100%]">
            <div className={`card front ${Flipped ? 'flipped' : ''} flex flex-col w-[100%] h-[100%] px-6 py-4 items-center text-center group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30`}>
                <div className="pixellet text-lg">{Category}</div>
                <div className="text-2xl sm:text-3xl h-[100%] flex flex-col justify-center" dangerouslySetInnerHTML={{__html: Question}}></div>
            </div>
            {(Answer == 'TRUE') ? 
            <div className={`card back ${Flipped ? 'flipped' : ''} flex flex-col w-[100%] h-[100%] px-6 py-4 items-center text-center group rounded-xl border border-transparent transition-colors border-teal-300 bg-teal-100 dark:border-teal-700 dark:bg-teal-800/30`}>
                <div className="pixellet text-lg text-teal-500">{Answer}</div>
                <div className="text-2xl sm:text-3xl h-[100%] flex flex-col justify-center" dangerouslySetInnerHTML={{__html: Description}}></div>
            </div> :
            <div className={`card back ${Flipped ? 'flipped' : ''} flex flex-col w-[100%] h-[100%] px-6 py-4 items-center text-center group rounded-xl border border-transparent transition-colors border-pink-300 bg-pink-100 dark:border-pink-700 dark:bg-pink-800/30`}>
                <div className="pixellet text-lg text-rose-500">{Answer}</div>
                <div className="text-2xl sm:text-3xl h-[100%] flex flex-col justify-center" dangerouslySetInnerHTML={{__html: Description}}></div>
            </div>
            }
        </div>
    )
}

export default function Cards ({ dataForThisCardset }: { dataForThisCardset: Array<Array<string>> }) {

    // Tract card number
    const [cardNumber, setCardNumber] = useState(1);

    // Flip or unflipped
    const [flipped, flipTheCard] = useState(false);

    // Handle flip and change card
    const handleCardFlipChange = () => {
        if (flipped == false) {
            flipTheCard(!flipped);
        } else {
            setCardNumber(cardNumber + 1);
            flipTheCard(!flipped);
        }
    }

    // Handle change page
    const changePage = (change: number) => {
        setCardNumber(change);
        flipTheCard(false);
    }

    return (
        <div className="flex flex-col h-[100%]">
            <div onClick={handleCardFlipChange} className="h-[100%]">
                <Card 
                    ID={dataForThisCardset[cardNumber-1][0]}
                    Group={dataForThisCardset[cardNumber-1][1]}
                    Category={dataForThisCardset[cardNumber-1][2]}
                    Level={dataForThisCardset[cardNumber-1][3]}
                    Link={dataForThisCardset[cardNumber-1][4]}
                    Question={dataForThisCardset[cardNumber-1][5]}
                    Answer={dataForThisCardset[cardNumber-1][6]}
                    Description={dataForThisCardset[cardNumber-1][7]}
                    Flipped={flipped}
                />
            </div>
            <div className="pixellet flex flex-row item-center justify-between mt-4 px-4 py-2 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                <div>
                    {cardNumber} | {dataForThisCardset.length}
                </div>
                <div className="flex flex-row gap-2">
                    <button onClick={() => changePage(1)}
                        className="flex flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                        Reset
                    </button>
                    {(cardNumber > 1) ? 
                        <button onClick={() => changePage(cardNumber-1)}
                            className="flex flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                            Back
                        </button> :
                        <div
                            className="text-black/20 dark:text-white/20 flex flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            Back
                        </div>
                    }
                    {(cardNumber != (dataForThisCardset.length)) ? 
                        <button onClick={() => changePage(cardNumber+1)}
                            className="flex flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                            Next
                        </button> :
                        <div
                            className="text-black/20 dark:text-white/20 flex flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            Next
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
