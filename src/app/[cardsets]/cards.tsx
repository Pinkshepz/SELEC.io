'use client'

import { useState } from "react";
import './card.css';

function Card ({
    ID,
    Category,
    Level,
    FrontImage,
    QuestionH1,
    QuestionP,
    BackImage,
    AnswerH1,
    AnswerP,
    Flipped
}: {
    ID: string;
    Category: string;
    Level: string;
    FrontImage: string;
    QuestionH1: string;
    QuestionP: string;
    BackImage: string;
    AnswerH1: string;
    AnswerP: string;
    Flipped: boolean;
}
) { 
    return (
        <div className="Poppins relative flex w-[100%] h-[100%]">
            {/* Card Front */}
            <div className={`card front ${Flipped ? 'flipped' : ''} flex flex-col w-[100%] h-[100%] px-6 py-4 items-center text-center group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30`}>
                <div className="pixellet text-lg">{QuestionH1}</div>
                <img src={FrontImage} alt="" />
                <div className="Poppins text-2xl sm:text-3xl h-[100%] flex flex-col justify-center">{QuestionP}</div>
            </div>
            {/* Card Back */}
            
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
            <div className="flex flex-row h-[100%]">
                {(cardNumber > 1) ? 
                    <button onClick={() => changePage(cardNumber-1)}
                        className="pixellet hidden sm:flex flex-row text-center items-center justify-center px-2 pb-1 mr-4 group rounded-xl transition-colors bg-gray-100 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                        {'Back <'}
                    </button> :
                    <div
                        className="pixellet hidden sm:flex flex-row text-center mr-4 items-center justify-center text-black/20 dark:text-white/20 flex flex-row px-2 pb-1 group rounded-xl transition-colors bg-gray-100 dark:bg-neutral-800/30">
                        {'Back <'}
                    </div>
                }
                <div onClick={() => flipTheCard(!flipped)} className="relative flex w-[100%] h-[100%]">
                    <Card 
                        ID={dataForThisCardset[cardNumber-1][0]}
                        Category={dataForThisCardset[cardNumber-1][1]}
                        Level={dataForThisCardset[cardNumber-1][2]}
                        FrontImage={dataForThisCardset[cardNumber-1][3]}
                        QuestionH1={dataForThisCardset[cardNumber-1][4]}
                        QuestionP={dataForThisCardset[cardNumber-1][5]}
                        BackImage={dataForThisCardset[cardNumber-1][6]}
                        AnswerH1={dataForThisCardset[cardNumber-1][7]}
                        AnswerP={dataForThisCardset[cardNumber-1][8]}
                        Flipped={flipped}
                    />
                </div>
                {(cardNumber != (dataForThisCardset.length)) ? 
                    <button onClick={() => handleCardFlipChange()}
                        className="pixellet hidden sm:flex flex-row text-center items-center justify-center px-2 pb-1 ml-4 group rounded-xl transition-colors bg-gray-100 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                        {'Next >'}
                    </button> :
                    <div
                        className="pixellet hidden sm:flex flex-row ml-4 text-center items-center justify-center text-black/20 dark:text-white/20 px-2 pb-1 group rounded-xl border transition-colors bg-gray-100 dark:bg-neutral-800/30">
                        {'Next >'}
                    </div>
                }
            </div>
            <div className="pixellet flex flex-row item-center justify-between mt-4 px-4 py-2 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                <div>
                    {cardNumber} | {dataForThisCardset.length}
                </div>
                <div className="flex flex-row gap-2">
                    <div
                        className="hidden sm:flex flex-row px-2 pb-1 group rounded-xl transition-colors bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                        {dataForThisCardset[cardNumber-1][1]}
                    </div>
                    <button onClick={() => changePage(1)}
                        className="flex flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                        Reset
                    </button>
                    {(cardNumber > 1) ? 
                        <button onClick={() => changePage(cardNumber-1)}
                            className="flex sm:hidden flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                            Back
                        </button> :
                        <div
                            className="text-black/20 dark:text-white/20 flex sm:hidden flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            Back
                        </div>
                    }
                    {(cardNumber != (dataForThisCardset.length)) ? 
                        <button onClick={() => changePage(cardNumber+1)}
                            className="flex sm:hidden flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                            Next
                        </button> :
                        <div
                            className="text-black/20 dark:text-white/20 flex sm:hidden flex-row px-2 pb-1 group rounded-xl border border-transparent transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            Next
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
