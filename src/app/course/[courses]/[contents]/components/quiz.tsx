'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shuffle, arrayToChips } from '@/app/utils/gadgetfx';
import { useInterfaceContext } from '../provider-interface';

const C_NORMAL = " bg-white/90 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 ";
const C_PRI = " bg-indigo-50/90 dark:bg-indigo-900/60 border-indigo-500/80 dark:border-indigo-400/80 text-indigo-600 dark:text-indigo-400 ";
const C_TER_GREEN = " bg-teal-50/90 dark:bg-teal-900/60 border-teal-500/80 dark:border-teal-400/80 text-teal-600 dark:text-teal-400 ";
const C_TER_RED = " bg-rose-50/90 dark:bg-rose-900/60 border-rose-500/80 dark:border-rose-400/80 text-rose-600 dark:text-rose-400 ";
const C_TER_YELLOW = " bg-amber-50/90 dark:bg-amber-900/60 border-amber-500/80 dark:border-amber-400/80 text-amber-600 dark:text-amber-400 ";

export default function QuizInterface ({
    headerData,
    questionData
}: {
    headerData: {[key: string]: any},
    questionData: {[key: string]: any}[]
}) {

    // ===== SECTION I: PARAMETERS ======
    // ==================================

    // Connect to interfaceContext
    const {interfaceParams, setInterfaceParams} = useInterfaceContext();

    // Create question pool
    const [questionArray, setQuestionArray] = useState(questionData);

    if (questionArray === undefined) {return undefined}

    // ===== SECTION II: RANDOM Qs ======
    // ==================================

    // Random question
    useEffect(() => setQuestionArray((prev) => shuffle(prev)), []);
    
    // // Random choice
    // if (interfaceParams.shuffleChoice === true) {

    //     questionArray.map((_question, index) => {
    //         console.log(_question, index);
            

    //         useEffect(() => setQuestionArray((prev) => ([
    //             ...prev.slice(0, index),
    //             {
    //                 ...prev[index],
    //                 choices: shuffle(_question.choices)
    //             },
    //             ...prev.slice(index + 1, interfaceParams.questionNumber)
    //         ])), [])

    //     });
    // }
    
    // ===== SECTION III: Handle Function ======
    // =========================================

    const handleChoiceInteract = (choice_index: number, mode: string) => {
        switch (mode) {
            case "Flashcard":

                setQuestionArray((prev) => ([
                    ...prev.slice(0, interfaceParams.currentQuestion),
                    {
                        ...prev[interfaceParams.currentQuestion],
                        choices: {
                            ...prev[interfaceParams.currentQuestion].choices,
                            [choice_index]: {
                                ...prev[interfaceParams.currentQuestion].choices[choice_index],
                                graded: !questionArray[interfaceParams.currentQuestion].choices[choice_index].graded
                            }
                        }
                    },
                    ...prev.slice(interfaceParams.currentQuestion + 1, interfaceParams.questionNumber)
                ]));

                break;

            case "One Answer":
                for (let index = 0; index < Object.keys(questionArray[interfaceParams.currentQuestion].choices).length; index++) {
                    
                    // De-select all questions
                    setQuestionArray((prev) => ([
                        ...prev.slice(0, interfaceParams.currentQuestion),
                        {
                            ...prev[interfaceParams.currentQuestion],
                            choices: {
                                ...prev[interfaceParams.currentQuestion].choices,
                                [index]: {
                                    ...prev[interfaceParams.currentQuestion].choices[index],
                                    selected: false
                                }
                            }
                        },
                        ...prev.slice(interfaceParams.currentQuestion + 1, interfaceParams.questionNumber)
                    ]));

                }

                // Select selected question
                setQuestionArray((prev) => ([
                    ...prev.slice(0, interfaceParams.currentQuestion),
                    {
                        ...prev[interfaceParams.currentQuestion],
                        choices: {
                            ...prev[interfaceParams.currentQuestion].choices,
                            [choice_index]: {
                                ...prev[interfaceParams.currentQuestion].choices[choice_index],
                                selected: !prev[interfaceParams.currentQuestion].choices[choice_index].selected
                            }
                        }
                    },
                    ...prev.slice(interfaceParams.currentQuestion + 1, interfaceParams.questionNumber)
                ]));

                break;

            case "Multiple Answer":

                setQuestionArray((prev) => ([
                    ...prev.slice(0, interfaceParams.currentQuestion),
                    {
                        ...prev[interfaceParams.currentQuestion],
                        choices: {
                            ...prev[interfaceParams.currentQuestion].choices,
                            [choice_index]: {
                                ...prev[interfaceParams.currentQuestion].choices[choice_index],
                                selected: !prev[interfaceParams.currentQuestion].choices[choice_index].selected
                            }
                        }
                    },
                    ...prev.slice(interfaceParams.currentQuestion + 1, interfaceParams.questionNumber)
                ]));

                break;
        
            default:
                break;
        }
    }

    const gradeAllQuestions = () => {
        for (let index = 0; index < Object.keys(questionArray[interfaceParams.currentQuestion].choices).length; index++) {
            
            setQuestionArray((prev) => ([
                ...prev.slice(0, interfaceParams.currentQuestion),
                {
                    ...prev[interfaceParams.currentQuestion],
                    choices: {
                        ...prev[interfaceParams.currentQuestion].choices,
                        [index]: {
                            ...prev[interfaceParams.currentQuestion].choices[index],
                            graded: true
                        }
                    },
                    graded: true
                },
                ...prev.slice(interfaceParams.currentQuestion + 1, interfaceParams.questionNumber)
            ]));

        }
    }

    const changeQuestion = (value: number) => {
        setInterfaceParams("currentQuestion", interfaceParams.currentQuestion + value);
    }

    const handleReload = () => {
        setInterfaceParams("pageSwitch", false);
    }

    // Choice object rendering
    let ChoiceObject: Array<React.ReactNode> = [];

    // Render each choice into html object
    for (let index = 0; index < Object.keys(questionArray[interfaceParams.currentQuestion].choices).length; index++) {
        const _choice = questionArray[interfaceParams.currentQuestion].choices[index];
        if (!_choice.graded) {
            ChoiceObject.push(
                <div id='chip-main' className={'h-full w-full rounded-xl'} key={index}>
                    <button 
                        onClick={() => handleChoiceInteract(index, questionArray[interfaceParams.currentQuestion].Mode)}
                        className={'relative p-1 w-full h-full font-bold text-lg sm:text-xl flex flex-col text-center items-center justify-center rounded-xl transition-all duration-400 ease-in-out ' + 
                            (_choice["selected"] ? ("border-2" + C_PRI) 
                                : ("border" + C_NORMAL))}>
                        <div className={"flex flex-wrap items-center justify-center px-2 gap-2 text-center " + (_choice["choice"] ? "py-1" : "")}>
                            {arrayToChips(_choice["choice"])}
                        </div>
                        {_choice["choiceImageUrl"] ? 
                            <div className='flex h-full max-h-[35vh] p-1'>
                                <img src={_choice["choiceImageUrl"]} alt=""
                                    className='h-full max-h-[40vh] xl:max-h-full w-full rounded-lg object-cover' />
                            </div> : null
                        }
                    </button>
                </div>
            );
        } else {
            ChoiceObject.push(
                <div className={'_graded h-full w-full rounded-xl'} key={index}>
                    <div className={'relative p-1 w-full h-full font-bold text-lg sm:text-xl flex flex-col text-center items-center justify-center rounded-xl transition-all duration-400 ease-in-out ' + 
                        ((_choice["answer"] || (questionArray[interfaceParams.currentQuestion].Mode == "Flashcard")) ? (
                            // Answer is True
                            _choice["selected"] ? 
                                // selected is True and choosed -> CORRECT
                                ("border-2" + C_TER_GREEN) :
                                // Answer is True but unchoosed -> INCORRECT
                                ("border-2" + C_TER_YELLOW)) : (
                            // Answer is False
                            _choice["selected"] ? 
                                // Answer is False but choosed -> INCORRECT
                                ("border-2" + C_TER_RED) : 
                                // Answer is False and unchoosed -> CORRECT
                                ("border" + C_NORMAL)))}>
                        <div className={'flex flex-wrap items-center justify-center px-2 gap-2 text-center ' + (_choice["choice"] ? "py-1" : "")}>{
                            arrayToChips(_choice["choice"])
                        }</div>
                        {_choice["backText"] && <div className={'flex flex-wrap items-center justify-center px-2 gap-2 text-center font-medium ' + (_choice["choice"] ? "py-1" : "")}>{
                            arrayToChips(_choice["backText"])
                        }</div>}
                        {_choice["choiceImageUrl"] ? 
                            <div className='flex h-full max-h-[35vh] p-1'>
                                <img src={_choice["choiceImageUrl"]} alt=""
                                    className='h-full max-h-[40vh] xl:max-h-full w-full rounded-lg object-cover' />
                            </div> : null
                        }
                    </div>
                </div>
            );
        }
    }

    return(
        <div>
            <div id='panel-color' className='-full-screen -scroll-none relative flex flex-col pt-16 backdrop-blur-md'>
                {/* 01 - Top stats bar */}
                <div className='relative h-12 w-full px-4 py-2 mt-2 flex items-center gap-2'>
                    {/* Question stats */}
                    <div className={'flex items-center px-2 py-1 rounded-xl border' + C_NORMAL}>
                        <span className='font-bold hidden sm:inline text-md after:bg-slate-700 dark:after:bg-slate-200'>
                            Question</span>
                        <span className='font-bold inline sm:hidden text-md after:bg-slate-700 dark:after:bg-slate-200'>
                            Quiz</span>
                        <span className='px-2 font-bold'>
                            {interfaceParams.currentQuestion + 1}</span>
                        <span className='font-bold'>|</span>
                        <span className='px-2 font-bold'>
                            {interfaceParams.questionNumber}</span>
                        { interfaceParams.shuffleQuestion ? 
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 inline text-indigo-600 dark:text-indigo-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                </svg>
                            </span>
                            : null }
                    </div>
                    <div className={'hidden xl:flex items-center w-max px-1 py-1 text-md font-bold rounded-xl border' + C_NORMAL}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg>
                        <span className='ml-2 mr-1'>
                            {questionArray[interfaceParams.currentQuestion].ID}</span>
                    </div>
                    <div className={'flex items-center w-max px-1 py-1 text-md font-bold rounded-xl border' + C_NORMAL}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                            <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" />
                        </svg>
                        <span className='ml-2 mr-1'>
                            {questionArray[interfaceParams.currentQuestion].Mode}</span>
                    </div>
                    <div className={'hidden sm:flex items-center w-max px-1 py-1 text-md font-bold rounded-xl border' + C_NORMAL}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                        <span className='ml-2 mr-1'>
                            {questionArray[interfaceParams.currentQuestion].Level}</span>
                    </div>
                    <div className={'hidden md:flex items-center w-max px-1 py-1 ml-auto text-md font-bold rounded-xl border' + C_NORMAL}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <span className='ml-2 mr-1'>
                            {questionArray[interfaceParams.currentQuestion].Topic}</span>
                    </div>
                </div>

                {/* 02 - Question */}
                <div className='relative lg:max-h-[30dvh] w-full px-4 py-2 flex flex-col md:flex-row'>
                    {/* Question Image */}
                    {questionArray[interfaceParams.currentQuestion].QuestionImageUrl ?
                        <img className='max-h-[45vh] md:max-w-[40dvw] lg:max-w-[40dvw] md:mr-4 mb-4 md:mb-0 rounded-2xl'
                            src={questionArray[interfaceParams.currentQuestion].QuestionImageUrl} alt={questionArray[interfaceParams.currentQuestion].ID} /> : null}

                    {/* Question Text */}
                    <div className='flex flex-col w-full lg:min-h-[20dvh] justify-between'>
                        <div className={'p-4 h-full flex flex-col justify-center items-center rounded-xl border' + C_NORMAL}>
                        
                        <div className='font-bold text-2xl text-center'>
                            {arrayToChips(questionArray[interfaceParams.currentQuestion].Question)}
                        </div>
                        
                        {questionArray[interfaceParams.currentQuestion].graded ? questionArray[interfaceParams.currentQuestion].QuestionBackText && 
                            <div className={'pt-2 text-lg text-center' + C_NORMAL}>
                                {arrayToChips(questionArray[interfaceParams.currentQuestion].QuestionBackText)}
                            </div> : null}
                        
                        </div>
                    </div>
                </div>

                {/* 03 - Choice */}
                <div className={'-scroll-none relative px-4 py-2 h-full lg:h-full w-full flex flex-col lg:grid gap-4 lg:overflow-y-scroll ' + (Object.keys(questionArray[interfaceParams.currentQuestion].choices).length == 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2')}>
                    {ChoiceObject}
                </div>

            </div>
            {/* 04 - Bottom action bar */}
            <div className='sticky bottom-0 right-0 w-full px-4 py-2 flex flex-row items-center justify-center bg-white/90 dark:bg-slate-900/80 backdrop-blur-md'>
                <div className="flex flex-col items-center content-center text-center">
                    <button onClick={() => handleReload()} 
                        className={"text-xl px-4 py-2 group rounded-xl border" + C_NORMAL}>
                        <div className='font-bold'>
                            <span>Quit</span>
                        </div>
                    </button>
                </div>
                { !((questionArray[interfaceParams.currentQuestion].choices[0].graded) ||
                    (questionArray[interfaceParams.currentQuestion].Mode == "Flashcard")) ?
                        <div className="flex flex-col w-full ml-2 items-center content-center text-center">
                            <button className={"text-xl py-2 w-full rounded-xl border" + C_NORMAL}
                                onClick={() => gradeAllQuestions()}>
                                    <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                        <span>Submit →</span>
                                    </div>
                            </button>
                        </div> : 
                    (interfaceParams.currentQuestion < interfaceParams.questionNumber - 1) ? 
                        <div className="flex flex-col w-full ml-2 items-center content-center text-center">
                            <a href="#top" className='w-full'>
                                <button className={"text-xl px-4 py-2 w-full rounded-xl border" + C_NORMAL}
                                    onClick={() => changeQuestion(1)}>
                                        <div className='hidden sm:inline font-bold text-indigo-600 dark:text-indigo-500'>
                                            <span>Next Question</span>
                                            <span className="ml-2">→</span>
                                        </div>
                                        <div className='inline sm:hidden font-bold'>
                                            <span>Next</span>
                                            <span className="ml-2">→</span>
                                        </div>
                                </button>
                            </a>
                        </div> :
                        <div className="flex flex-col w-full ml-2 items-center content-center text-center">
                            <Link className={"text-xl px-4 py-2 w-full rounded-xl border" + C_NORMAL}
                                href={"./"}>
                                    <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                        <span>Finish</span>
                                        <span className="ml-2">→</span>
                                    </div>
                            </Link>
                        </div>
                    }
                { (interfaceParams.currentQuestion > 0) ?
                    <div className="flex flex-col ml-2 items-center content-center text-center">
                        <button className={"text-xl px-4 py-2 rounded-xl border" + C_NORMAL}
                            onClick={() => changeQuestion(-1)}>
                                <div className='font-bold'>
                                    <span>Back</span>
                                </div>
                        </button>
                    </div> : null
                }
            </div>
        </div>
    );
}
