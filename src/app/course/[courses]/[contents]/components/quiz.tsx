'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './interface.css';
import { shuffle, formatQuizText } from '@/app/utils/gadgetfx';
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
        if (mode == "Flashcard") {
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
                    graded: !questionArray[interfaceParams.currentQuestion].choices[choice_index].graded
                },
                ...prev.slice(interfaceParams.currentQuestion + 1, interfaceParams.questionNumber)
            ]));
        } else if (!questionArray[interfaceParams.currentQuestion].graded) {
            switch (mode) {
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
                                : questionArray[interfaceParams.currentQuestion].Mode == 'One Answer' 
                                    ? 'card-quiz-pri'
                                    : 'card-quiz-sec'
                            : 'card-quiz')}
                        className='relative p-1 w-full h-full font-bold text-lg sm:text-xl flex flex-col text-center items-center justify-center rounded-xl'>
                        

                        {/* Front text */}

                        <div id='choice-front-text' className={"flex flex-wrap items-center justify-center px-2 gap-2 text-center " + (_choice["choice"] ? "py-1" : "")}>
                            {formatQuizText(_choice["choice"])}
                        </div>


                        {/* Choice image */}

                        {_choice["choiceImageUrl"] ? 
                            <div className='flex h-full max-h-[35vh] p-1'>
                                <img src={_choice["choiceImageUrl"]} alt=""
                                    className='h-full max-h-[40vh] xl:max-h-full w-full rounded-lg object-cover' />
                            </div> : null
                        }


                        {/* Answer report */}

                        {questionArray[interfaceParams.currentQuestion].Mode == 'Flashcard'
                                ? <span id='answer-type'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </span>
                                : questionArray[interfaceParams.currentQuestion].Mode == 'One Answer' 
                                    ? <span id='answer-type'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                                        </svg>
                                    </span>
                                    : <span id='answer-type'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                                        </svg>
                                    </span>
                            }
                    </button>
                </div>
            );
        } else {
            ChoiceObject.push(
                <div id='card-quiz-container' className='_graded h-full w-full rounded-xl' key={index}>
                    <button id={(questionArray[interfaceParams.currentQuestion].Mode == "Flashcard")
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
                        className={'w-full h-full text-lg sm:text-xl ' + ((questionArray[interfaceParams.currentQuestion].Mode != "Flashcard") && 'cursor-default')}
                        onClick={() => handleChoiceInteract(index, questionArray[interfaceParams.currentQuestion].Mode)}
                        >
                            
                            {/* Choice front text */}

                            {(questionArray[interfaceParams.currentQuestion].Mode != "Flashcard")
                                && <div id='choice-front-text' className={(_choice["choice"] ? "py-1" : "")}>
                                {formatQuizText(_choice["choice"])}
                            </div>}


                            {/* Choice back text */}

                            {_choice["backText"] 
                                && <div id='choice-back-text' className={"flex flex-col text-start " + (_choice["choice"] ? "py-1" : "")}>
                                    {formatQuizText(_choice["backText"])}
                                </div>
                            }


                            {/* Choice image */}

                            {_choice["choiceImageUrl"] 
                                ? <div id='choice-image' className='flex h-full max-h-[35vh] p-1'>
                                    <img src={_choice["choiceImageUrl"]} alt=""
                                        className='h-full max-h-[40vh] xl:max-h-full w-full rounded-lg object-cover' />
                                </div>
                                : null
                            }


                            {/* Answer report */}

                            {(questionArray[interfaceParams.currentQuestion].Mode == "Flashcard")
                                // In case of flashcard
                                ? null
                                // Incase of MCQ
                                : _choice["answer"]
                                    // Answer is True
                                    ? (_choice["selected"] 
                                        ? <span id='answer-report'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </span> // selected is True and choosed -> CORRECT
                                        : <span id='answer-report'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </span>) // Answer is True but unchoosed -> MISSED ANSWER
                                    // Answer is False
                                    : (_choice["selected"] 
                                        ? <span id='answer-report'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </span> // Answer is False but choosed -> INCORRECT
                                        : null) // Answer is False and unchoosed -> OK
                            }
                    </button>
                </div>
            );
        }
    }

    // ===== SECTION III: ASIDE FX ======
    // ==================================

    let current_topic: string = questionArray[0].Topic;
    let question_nav: React.ReactNode[] = [
        !interfaceParams.shuffleQuestion && <h5>{current_topic}</h5>
    ];
    let same_topic_choice_nav: React.ReactNode[] = [];

    for (let i = 0; i < interfaceParams.questionNumber; i++) {
        // Check topic
        if ((current_topic != questionArray[i].Topic) && (!interfaceParams.shuffleQuestion)) {
            // Push current topic questions
            question_nav.push(
                <div className='pb-4 grid grid-cols-5 gap-2'>
                    {same_topic_choice_nav}
                </div>
            );

            // Set new topic
            current_topic = questionArray[i].Topic;
            question_nav.push(
                <h5>{current_topic}</h5>
            );
            
            // Reset
            same_topic_choice_nav = [];
        }

        same_topic_choice_nav.push(
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

    // Push current topic questions, lastly
    question_nav.push(
        <div className='pb-4 grid grid-cols-5 gap-2'>
            {same_topic_choice_nav}
        </div>
    );

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
                        <div className='flex flex-col gap-4'>
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
                        <div className='flex items-center w-max px-1 py-1 rounded-xl'>
                            <h5 className='ml-2 mr-1'>
                            {questionArray[interfaceParams.currentQuestion].Mode == 'Flashcard'
                                ? <span id="chip-quiz-neu" className='h-16'>
                                    <span id='answer-type'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </span>
                                    {questionArray[interfaceParams.currentQuestion].Mode}
                                </span>
                                : questionArray[interfaceParams.currentQuestion].Mode == 'One Answer' 
                                    ? <span id="chip-quiz-pri">
                                        {questionArray[interfaceParams.currentQuestion].Mode}</span>
                                    : <span id="chip-quiz-sec">{questionArray[interfaceParams.currentQuestion].Mode}</span>}
                            </h5>
                        </div>
                    </div>

                    {/* 02 - Question */}
                    <div className='relative w-full py-4 flex flex-col md:flex-row'>
                        {/* Question Image */}
                        {questionArray[interfaceParams.currentQuestion].QuestionImageUrl ?
                            <img className='max-h-[45vh] md:max-w-[40dvw] lg:max-w-[40dvw] md:mr-4 mb-4 md:mb-0 rounded-2xl'
                                src={questionArray[interfaceParams.currentQuestion].QuestionImageUrl} alt={questionArray[interfaceParams.currentQuestion].ID} /> : null}

                        {/* Question Text */}
                        <div className='flex flex-col w-full lg:min-h-[10dvh] justify-between'>
                            <div className='relative p-4 h-full flex flex-col justify-center items-center rounded-xl'>

                                <div className='font-semibold text-xl text-start'>
                                    {formatQuizText(questionArray[interfaceParams.currentQuestion].Question)}
                                </div>
                                
                                {questionArray[interfaceParams.currentQuestion].graded 
                                    ? questionArray[interfaceParams.currentQuestion].QuestionBackText && 
                                        <div className='mt-3 px-2 text-lg text-start'>
                                            {formatQuizText(questionArray[interfaceParams.currentQuestion].QuestionBackText)}
                                        </div>
                                    : null
                                }
                            
                            </div>
                        </div>
                    </div>

                    {/* 03 - Choice */}
                    <div className={'-scroll-none relative h-full lg:h-full w-full flex flex-col lg:grid gap-4 ' + (questionArray[interfaceParams.currentQuestion].Mode == 'Flashcard'
                        ? 'lg:grid-cols-1'
                        : Object.keys(questionArray[interfaceParams.currentQuestion].choices).length == 1
                            ? 'lg:grid-cols-1'
                            : 'lg:grid-cols-2')}>
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
