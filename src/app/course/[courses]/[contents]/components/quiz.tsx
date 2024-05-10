'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './interface.css';
import { shuffle, arrayToChips } from '@/app/utils/gadgetfx';
import { useInterfaceContext } from '../provider-interface';

export default function QuizInterface ({
    courseData,
    headerData,
    questionData
}: {
    courseData: {[key: string]: any},
    headerData: {[key: string]: any},
    questionData: {[key: string]: any}[]
}) {

    // ===== SECTION I: PARAMETERS ======
    // ==================================

    // Connect to interfaceContext
    const {interfaceParams, setInterfaceParams} = useInterfaceContext();

    // Create question pool
    const [questionArray, setQuestionArray] = useState(questionData);

    // ===== SECTION II: RANDOM Qs ======
    // ==================================

    // Random question
    useEffect(() => {
        if (interfaceParams.shuffleQuestion === true) {
            setQuestionArray((prev) => shuffle(prev))}}, []);
    
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
                        },
                        graded: true
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

    const gradeAllChoices = () => {
        let score_count = 0;
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

            // Record choice score
            if ((questionArray[interfaceParams.currentQuestion].Mode == "One Answer") && questionArray[interfaceParams.currentQuestion].choices[index].answer) {
                if (questionArray[interfaceParams.currentQuestion].choices[index].answer == questionArray[interfaceParams.currentQuestion].choices[index].selected) {
                    questionArray[interfaceParams.currentQuestion].choices[index].score = 1;
                    score_count += 1;
                }
            } else if (questionArray[interfaceParams.currentQuestion].Mode == "Multiple Answer") {
                if (questionArray[interfaceParams.currentQuestion].choices[index].answer == questionArray[interfaceParams.currentQuestion].choices[index].selected) {
                    questionArray[interfaceParams.currentQuestion].choices[index].score = 1;
                    score_count += 1;
                }
            }
        }

        // Record question score
        questionArray[interfaceParams.currentQuestion].score = score_count;
    }

    const changeQuestion = (value: number) => {
        setInterfaceParams("currentQuestion", value);
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
                <div id='card-quiz-container' className={'h-full w-full rounded-xl'} key={index}>
                    <button 
                        onClick={() => handleChoiceInteract(index, questionArray[interfaceParams.currentQuestion].Mode)}
                        id={(_choice["selected"] 
                            ? questionArray[interfaceParams.currentQuestion].Mode == 'Flashcard'
                                ? 'card-quiz-ter'
                                : questionArray[interfaceParams.currentQuestion].Mode == 'MCQ' 
                                ? 'card-quiz-pri'
                                : 'card-quiz-sec'
                            : 'card-quiz')}
                        className='relative p-1 w-full h-full font-bold text-lg sm:text-xl flex flex-col text-center items-center justify-center rounded-xl'>
                        
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
                <div id='card-quiz-container' className='_graded h-full w-full rounded-xl' key={index}>
                    <div id={(questionArray[interfaceParams.currentQuestion].Mode == "Flashcard")
                        // In case of flashcard
                        ? 'card-quiz-ter'
                        // Incase of MCQ
                        : _choice["answer"]
                            // Answer is True
                            ? (_choice["selected"] 
                                ? 'card-quiz-green' // selected is True and choosed -> CORRECT
                                : 'card-quiz-amber') // Answer is True but unchoosed -> INCORRECT
                            // Answer is False
                            : (_choice["selected"] 
                                ? 'card-quiz-red' // Answer is False but choosed -> INCORRECT
                                : 'card-quiz') // Answer is False and unchoosed -> CORRECT
                        }
                    className='relative p-1 w-full h-full font-bold text-lg sm:text-xl flex flex-col text-center items-center justify-center rounded-xl'>
                        
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

    // ===== SECTION III: ASIDE FX ======
    // ==================================

    let question_nav: React.ReactNode[] = [];

    for (let i = 0; i < interfaceParams.questionNumber; i++) {
        question_nav.push(
            <button
                id={(interfaceParams.currentQuestion == i)
                    ? 'card-nav-accent'
                    : (questionArray[i].graded)
                        ? (questionArray[i].Mode == "Flashcard")
                            ? 'card-nav-ter'
                            : (questionArray[i].score == questionArray[i].score_max)
                                ? 'card-nav-green'
                                : (questionArray[i].score == 0)
                                    ? 'card-nav-red'
                                    : 'card-nav-amber'
                        : 'card-nav-neu'}
                key={i}
                onClick={() => changeQuestion(i)}>
                {i + 1}
            </button>
        );
    }

    return(
        <div className='flex flex-col'>
            <div id='quiz-two-cols-fixed' key='interface'>

                <aside id="quiz-col-scroll-aside" className='-scroll-none' key='interface-aside'>
                    
                    <section className='m-4' key='interface-aside-section-1'>
                        <span id='chip-lg'>{courseData["ID"]}</span>
                        <h3 className='mt-2'>{headerData["Title"]}</h3>
                        <p className='mt-6'>{headerData["Description"]}</p>
                        <h4 className='mt-4'>Questions</h4>
                    </section>

                    <section className='mx-4 h-max overflow-y-scroll -scroll-none' key='interface-aside-section-2'>
                        <div className='pb-4 grid grid-cols-5 gap-2'>
                            {question_nav}
                        </div>
                    </section>

                    {/* <section id='separate-top' className='mt-4' key='interface-aside-section-3'>
                        <div className='flex flex-row'>
                            <div className='flex flex-col items-center justify-center text-center h-16 px-4'>
                                <div className='text-xl font-bold'>
                                    <span>Progress</span>
                                </div>
                            </div>
                        </div>
                    </section> */}
                </aside>

                <main id="quiz-col-scroll-main" className='-scroll-none backdrop-blur-xl' key='interface-main'>
                    {/* 01 - Top stats bar */}
                    <div className='relative h-12 w-full mt-4 flex items-center gap-2'>
                        {/* Question stats */}
                        <div id='card-quiz' className='flex items-center px-2 py-1 rounded-xl'>
                            <span className='font-bold hidden sm:inline'>
                                Question</span>
                            <span className='font-bold inline sm:hidden'>
                                Quiz</span>
                            <span className='px-2 font-bold'>
                                {interfaceParams.currentQuestion + 1}</span>
                            <span className='font-bold'>|</span>
                            <span className='px-2 font-bold'>
                                {interfaceParams.questionNumber}</span>
                            { interfaceParams.shuffleQuestion 
                                ? <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 inline">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                    </svg>
                                </span>
                                : null }
                        </div>
                        <div id='card-quiz' className='hidden xl:flex items-center w-max px-1 py-1 rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="ml-1 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg>
                            <h5 className='ml-2 mr-1'>
                                {questionArray[interfaceParams.currentQuestion].ID}</h5>
                        </div>
                        <div className='flex items-center w-max px-1 py-1 rounded-xl'>
                            <h5 className='ml-2 mr-1'>
                            {questionArray[interfaceParams.currentQuestion].Mode == 'Flashcard'
                                ? <span id="chip-quiz-neu" className='h-16'>{questionArray[interfaceParams.currentQuestion].Mode}</span>
                                : questionArray[interfaceParams.currentQuestion].Mode == 'One Answer' 
                                    ? <span id="chip-quiz-pri">{questionArray[interfaceParams.currentQuestion].Mode}</span>
                                    : <span id="chip-quiz-sec">{questionArray[interfaceParams.currentQuestion].Mode}</span>}
                            </h5>
                        </div>
                    </div>

                    {/* 02 - Question */}
                    <div className='relative lg:max-h-[30dvh] w-full py-4 flex flex-col md:flex-row'>
                        {/* Question Image */}
                        {questionArray[interfaceParams.currentQuestion].QuestionImageUrl ?
                            <img className='max-h-[45vh] md:max-w-[40dvw] lg:max-w-[40dvw] md:mr-4 mb-4 md:mb-0 rounded-2xl'
                                src={questionArray[interfaceParams.currentQuestion].QuestionImageUrl} alt={questionArray[interfaceParams.currentQuestion].ID} /> : null}

                        {/* Question Text */}
                        <div className='flex flex-col w-full lg:min-h-[10dvh] justify-between'>
                            <div className='relative p-4 h-full flex flex-col justify-center items-center rounded-xl'>

                                <div className='font-bold text-2xl text-center'>
                                    {arrayToChips(questionArray[interfaceParams.currentQuestion].Question)}
                                </div>
                                
                                {questionArray[interfaceParams.currentQuestion].graded 
                                    ? questionArray[interfaceParams.currentQuestion].QuestionBackText && 
                                        <div className='mt-3 px-2 text-lg text-center'>
                                            {arrayToChips(questionArray[interfaceParams.currentQuestion].QuestionBackText)}
                                        </div>
                                    : null
                                }
                            
                            </div>
                        </div>
                    </div>

                    {/* 03 - Choice */}
                    <div className={'-scroll-none relative h-full lg:h-full w-full flex flex-col lg:grid gap-4 lg:overflow-y-scroll ' + (Object.keys(questionArray[interfaceParams.currentQuestion].choices).length == 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2')}>
                        {ChoiceObject}
                    </div>


                </main>
            </div>

            {/* 04 - Bottom action bar */}
            <footer id='separate-top' className='w-full h-16 flex flex-row items-center justify-center'>

                <div className="flex flex-col items-center content-center text-center">
                    <button onClick={() => handleReload()} 
                        id='separate-right' className="h-16 px-4">
                        <div className='text-xl font-bold'>
                            <span>Quit</span>
                        </div>
                    </button>
                </div>

                { !((questionArray[interfaceParams.currentQuestion].choices[0].graded) ||
                    (questionArray[interfaceParams.currentQuestion].Mode == "Flashcard")) 
                    
                    ? <button className="text-xl h-16 w-full"
                        onClick={() => gradeAllChoices()}>
                        <div className='font-bold'>
                            <span>Submit →</span>
                        </div>
                    </button>
                    
                    : (interfaceParams.currentQuestion < interfaceParams.questionNumber - 1)
                        ? <div className="flex flex-col w-full items-center content-center text-center">
                            <a className='w-full'>
                                <button className="text-xl h-16 px-3 w-full"
                                    onClick={() => changeQuestion(interfaceParams.currentQuestion + 1)}>
                                    <div className='hidden sm:inline font-bold'>
                                        <span>Next Question</span>
                                        <span className="ml-2">→</span>
                                    </div>
                                    <div className='inline sm:hidden font-bold'>
                                        <span>Next</span>
                                        <span className="ml-2">→</span>
                                    </div>
                                </button>
                            </a>
                        </div>
                        : <Link href={"./"}
                            className="flex flex-col font-bold text-xl w-full h-16 px-4 items-center justify-center text-center">
                            Finish
                        </Link>
                }

                { (interfaceParams.currentQuestion > 0) ?
                    <div className="flex flex-col items-center content-center text-center">
                        <button id='separate-left' className="text-xl h-16 px-4"
                            onClick={() => changeQuestion(interfaceParams.currentQuestion - 1)}>
                                <div className='font-bold'>
                                    <span>Back</span>
                                </div>
                        </button>
                    </div> : null
                }

            </footer>
        </div>
    );
}
