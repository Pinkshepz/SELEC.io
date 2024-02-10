'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import './slider.css'
import { shuffle } from '@/app/utils/gadgetfx';
import { act } from 'react-dom/test-utils';

export default function QuizInterface ({ 
    quizsets,
    headerData,
    questionData
}: {
    quizsets: string,
    headerData: {[key: string]: any},
    questionData: Array<{[key: string]: any}>
}) {
    // ===== SECTION I: START PAGE SETTING =====
    // =========================================

    // Map topics to list of topic htmls
    let topicShow: Array<React.ReactNode> = [];

    Object.keys(headerData.TopicCount).map((topic) => {
        topicShow.push(<span className="mr-2" key={topic}>{topic}</span>);
        topicShow.push(<span className="mr-2" key={`${topic}|`}>|</span>)});
        topicShow.pop();
   
     // Usestate
     const [pageStatus, setPageStatus] = useState<"START" | "MID" | "END">("START");
     const [quizStatus, setQuizStatus] = useState<{
            shuffleQuiz: boolean, 
            quizNumber: number
        }>({
            shuffleQuiz: true,
            quizNumber: headerData.QuestionPoolTotal
        });

    // Handle toogle shuffle quiz option
    const handleShuffleToggle = () => {
        setQuizStatus(prev => ({
            ...prev,
            shuffleQuiz: !prev.shuffleQuiz
        }));
    }
    
    // Handle slidebar quiz number option
    const handleNumSlider = (value: number) => {
        setQuizStatus(prev => ({
            ...prev,
            quizNumber: value
        }));
    }
    
    // Select questions
    const [activeSelectedQuestions, setActiveSelectedQuestions] = useState(questionData.slice(0, questionData.length));

    const renderQuestion = () => {
        setPageStatus("MID")
        quizStatus.shuffleQuiz ? setActiveSelectedQuestions(shuffle(activeSelectedQuestions)) : null;
        quizStatus.shuffleQuiz ? setActiveSelectedQuestions(activeSelectedQuestions.slice(0, quizStatus.quizNumber)) : null;
        console.log(questionData)
    }

    // ===== SECTION II: QUIZ PAGE SETTING =====
    // =========================================

    // Reload
    const handleReload = () => {
        setPageStatus("START");
        setActiveSelectedQuestions(questionData.slice(0, questionData.length));
        setCurrentQuiz(0);
    }

    // UseState for quiz navigation
    const [currentQuiz, setCurrentQuiz] = useState<number>(0);

    const handleChoiceInteract = (choice_index: number, mode: string) => {
        switch (mode) {
            case "Flashcard":
                setActiveSelectedQuestions((prev) => ([
                    ...prev.slice(0, currentQuiz),
                    {
                        ...prev[currentQuiz],
                        choices: {
                            ...prev[currentQuiz].choices,
                            [choice_index]: {
                                ...prev[currentQuiz].choices[choice_index],
                                graded: !activeSelectedQuestions[currentQuiz].choices[choice_index].graded
                            }
                        }
                    },
                    ...prev.slice(currentQuiz + 1, quizStatus.quizNumber)
                ]));
                break;

            case "One Answer":
                for (let index = 0; index < Object.keys(activeSelectedQuestions[currentQuiz].choices).length; index++) {
                    console.log(index)
                    setActiveSelectedQuestions((prev) => ([
                        ...prev.slice(0, currentQuiz),
                        {
                            ...prev[currentQuiz],
                            choices: {
                                ...prev[currentQuiz].choices,
                                [index]: {
                                    ...prev[currentQuiz].choices[index],
                                    selected: false
                                }
                            }
                        },
                        ...prev.slice(currentQuiz + 1, quizStatus.quizNumber)
                    ]));
                }
                console.log(choice_index)
                console.log({
                    ...activeSelectedQuestions[currentQuiz],
                    choices: {
                        ...activeSelectedQuestions[currentQuiz].choices,
                            [choice_index]: {
                                ...activeSelectedQuestions[currentQuiz].choices[choice_index],
                                selected: !activeSelectedQuestions[currentQuiz].choices[choice_index].selected
                            }
                    }
                })
                setActiveSelectedQuestions((prev) => ([
                    ...prev.slice(0, currentQuiz),
                    {
                        ...prev[currentQuiz],
                        choices: {
                            ...prev[currentQuiz].choices,
                            [choice_index]: {
                                ...prev[currentQuiz].choices[choice_index],
                                selected: !prev[currentQuiz].choices[choice_index].selected
                            }
                        }
                    },
                    ...prev.slice(currentQuiz + 1, quizStatus.quizNumber)
                ]));
                break;

            case "Multiple Answer":
                setActiveSelectedQuestions((prev) => ([
                    ...prev.slice(0, currentQuiz),
                    {
                        ...prev[currentQuiz],
                        choices: {
                            ...prev[currentQuiz].choices,
                            [choice_index]: {
                                ...prev[currentQuiz].choices[choice_index],
                                selected: !prev[currentQuiz].choices[choice_index].selected
                            }
                        }
                    },
                    ...prev.slice(currentQuiz + 1, quizStatus.quizNumber)
                ]));
                break;
        
            default:
                break;
        }
    }

    const gradeAllQuestions = () => {
        for (let index = 0; index < Object.keys(activeSelectedQuestions[currentQuiz].choices).length; index++) {
            console.log(index)
            setActiveSelectedQuestions((prev) => ([
                ...prev.slice(0, currentQuiz),
                {
                    ...prev[currentQuiz],
                    choices: {
                        ...prev[currentQuiz].choices,
                        [index]: {
                            ...prev[currentQuiz].choices[index],
                            graded: true
                        }
                    }
                },
                ...prev.slice(currentQuiz + 1, quizStatus.quizNumber)
            ]));
        }
    }

    const changeQuestion = (value: number) => {
        setCurrentQuiz(prev => (prev + value));
    }

    const handleNextQuestion = () => {
        changeQuestion(1);
    }

    // Choice object rendering
    let ChoiceObject: Array<React.ReactNode> = [];

    // Render each choice into html object
    for (let index = 0; index < Object.keys(activeSelectedQuestions[currentQuiz].choices).length; index++) {
        const _choice = activeSelectedQuestions[currentQuiz].choices[index];
        if (!_choice.graded) {
            ChoiceObject.push(
                <div className={'h-full w-full rounded-xl bg-white/50 dark:bg-zinc-900/70'} key={index}>
                    <button 
                        onClick={() => handleChoiceInteract(index, activeSelectedQuestions[currentQuiz].Mode)}
                        className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl rounded-xl ' + 
                            (_choice["selected"] ? "border text-indigo-600 dark:text-indigo-500 border-indigo-600 dark:border-indigo-500 bg-indigo-600/10 dark:bg-indigo-500/10" 
                                : "border border-gray-300 dark:border-neutral-700")}>
                        {_choice["choice"]}
                    </button>
                </div>
            );
        } else {
            ChoiceObject.push(
                <div className={'h-full w-full rounded-xl'} key={index}>
                    <div className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl relative flex flex-col text-center items-center justify-center rounded-xl border ' + 
                        (_choice["answer"] ? (
                            // Answer is True
                            _choice["selected"] ? 
                                // selected is True and choosed -> CORRECT
                                "text-teal-600 dark:text-teal-500 border-teal-600 dark:border-teal-500 bg-teal-600/10 dark:bg-teal-500/10" :
                                // Answer is True but unchoosed -> INCORRECT
                                "border-gray-300 dark:border-neutral-700 text-indigo-600 dark:text-indigo-500 bg-white/50 dark:bg-zinc-900/70") : (
                            // Answer is False
                            _choice["selected"] ? 
                                // Answer is False but choosed -> INCORRECT
                                "text-rose-600 dark:text-rose-500 border-rose-600 dark:border-rose-500 bg-rose-600/15 dark:bg-rose-500/15" : 
                                // Answer is False and unchoosed -> CORRECT
                                "border-gray-300 dark:border-neutral-700 bg-white/50 dark:bg-zinc-900/70"))}>
                        <div className='text-center'>{
                            _choice["backText"] || 
                            _choice["choice"]
                        }</div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="flex flex-col overflow-hidden pt-16">
                {
                    // ===== SECTION I: START PAGE ======
                    // ==================================
                    pageStatus == "START" ?
                    <div className='relative px-4 mt-[19vh] bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md'>
            
                        {/* Start page content */}
                        <div className="relative mb-8">
            
                            {/* Title */}
                            <h1 className='text-3xl mt-8 mb-3'>
                                {headerData.Title}</h1>
            
                            {/* Description */}
                            <p>{headerData.Description}</p>
            
                            {/* Properties */}
                            <div className="flex flex-col md:flex-row mt-6 mb-8">
            
                                {/* 3 Icons */}
                                <div className="flex flex-wrap gap-8">
                                    {/* Quiz mode */}
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                            <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" /></svg>
                                        <div className="ml-2">
                                            <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                                Quiz Mode</p>
                                            <p className="ml-1 mt-1 text-sm">
                                                {headerData.Category}</p>
                                        </div>
                                    </div>
            
                                    {/* Question Pool */}
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                            <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" /></svg>
                                        <div className="ml-2">
                                            <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                                Question Pool</p>
                                            <p className="ml-1 mt-1 text-sm">
                                                {headerData.QuestionPoolTotal} Questions</p>
                                        </div>
                                    </div>
            
                                    {/* Topics */}
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            
                                        <div className="ml-2">
                                            <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                                Topics</p>
                                            <p className="ml-1 mt-1 text-sm">
                                                {topicShow}</p>
                                        </div>
                                    </div>
                                </div>     
                            </div>
            
                            {/* Settings */}
                            <div className="flex flex-col mb-8">                                
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Shuffle */}
                                    <button 
                                        onClick={() => handleShuffleToggle()}
                                        className="px-2 py-2.5 mr-2 flex flex-row w-max justify-center items-center group rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700">
                                        <div className="flex flex-row">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" /></svg>
                                            <p className="font-bold ml-2 mr-4 after:bg-slate-700 dark:after:bg-slate-200">
                                                Shuffle Questions</p>
                                        </div>
                                        {/* ENABLED OR DISABLED */}
                                        {quizStatus?.shuffleQuiz ? 
                                            <div className="mr-1 mt-0 font-bold text-indigo-600 after:bg-indigo-600">
                                                ENABLED</div> : 
                                            <div className="mr-1 mt-0 font-bold text-indigo-600 after:bg-indigo-600">
                                                DISABLED</div>}
                                    </button>

                                    {/* Question Number */}
                                    { quizStatus.shuffleQuiz ?
                                        <div className="px-2 py-2 mr-2 flex flex-col sm:flex-row w-max justify-center items-start group rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">
                                            <div className="flex flex-row">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" /></svg>
                                                <p className="font-bold ml-2 mr-4 after:bg-slate-700 dark:after:bg-slate-200">
                                                    Questions Number</p>
                                            </div>
                                            <div className="flex flex-row mt-2 ml-8 mr-1 sm:mt-0 sm:ml-0">
                                                {/* INPUT - slider */}
                                                <input type="range" min={1} max={headerData.QuestionPoolTotal} name='QuizNumRange' 
                                                    value={quizStatus.quizNumber} onChange={e => handleNumSlider(Number(e.target.value))}/>
                                                {/* Slider number */}
                                                <p className="mr-1 ml-4 font-bold text-indigo-600 dark:text-indigo-500">
                                                    {quizStatus.quizNumber}</p>

                                            </div>
                                        </div> : null
                                    }
                                </div>    
                            </div>
            
                            {/* Action */}
                            <div className="flex flex-row gap-2">
            
                                <div className="flex flex-col items-center content-center text-center">
                                    <Link href={"./"} className="text-xl px-4 py-2 rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700">
                                        <div className='font-bold'>
                                            <span className="mr-2">←</span>
                                            <span>Back</span>
                                        </div>
                                    </Link>
                                </div>

                                <div className="flex flex-col items-center content-center text-center">
                                    <a href="#top">
                                        <button className="text-xl px-4 py-2 rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700"
                                            onClick={() => renderQuestion()}>
                                                <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                                    <span>Start Quiz</span>
                                                    <span className="ml-2">→</span>
                                                </div>
                                        </button>
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div> : 

                    // ===== SECTION II: QUIZ PAGE =====
                    // =================================
                    <>
                        <div className='-full-screen flex flex-col relative px-4 pb-24 lg:pb-0 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md'>
                            {/* Top bar */}
                            <div className='h-12 flex flex-row justify-between items-center'>
                                {/* Question tract */}
                                <div>
                                    <span className='-text-line hidden sm:inline text-md after:bg-slate-700 dark:after:bg-slate-200'>
                                        Question</span>
                                    <span className='-text-line inline sm:hidden text-md after:bg-slate-700 dark:after:bg-slate-200'>
                                        Quiz</span>
                                    <span className='px-2 py-1 font-bold'>
                                        {currentQuiz + 1}</span>
                                    <span className='font-bold'>|</span>
                                    <span className='px-2 py-1 font-bold'>
                                        {quizStatus.quizNumber}</span>
                                    { quizStatus.shuffleQuiz ? 
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 inline text-indigo-600 dark:text-indigo-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" /></svg>
                                        </span>
                                        : null }
                                </div>
                                {/* Quizset */}
                                <div className='-text-line hidden sm:inline text-md after:bg-slate-700 dark:after:bg-slate-200'>
                                    {headerData.CardSetName}</div>
                                <div className='flex flex-row sm:hidden text-md'>
                                    <span className='-button-line mx-1 after:bg-slate-700 dark:after:bg-slate-200'>
                                        <Link href={"./"}>Back</Link>
                                    </span>
                                </div>
                            </div>

                            {/* Question */}
                            <div className='-question-panel pt-2 sm:pb-8 lg:pb-4 flex flex-col sm:flex-row justify-center items-center'>
                                {/* Question Image */}
                                {activeSelectedQuestions[currentQuiz].QuestionImageUrl ?
                                    <img className='w-full h-[40vh] lg:w-[40%] lg:h-full lg:mr-4 object-cover rounded-2xl bg-white/95 dark:bg-black/80'
                                        src={activeSelectedQuestions[currentQuiz].QuestionImageUrl} alt="" /> : null}
                                
                                <div className='flex flex-col h-full w-full px-2 lg:px-0 justify-between'>
                                    {/* 3 Icons */}
                                    <div className='flex flex-wrap justify-center lg:justify-start mt-4 lg:mb-4 lg:mt-0 gap-2'>
                                        <div className='flex items-center w-max px-2 py-1 text-lg font-bold lg:text-lg rounded-xl bg-white/50 dark:bg-zinc-900/70 border border-gray-300 dark:border-neutral-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" /></svg>
                                            <span className='ml-2 mr-1'>
                                                {activeSelectedQuestions[currentQuiz].Mode}</span>
                                        </div>
                                        <div className='flex items-center w-max px-2 py-1 text-lg font-bold lg:text-lg rounded-xl bg-white/50 dark:bg-zinc-900/70 border border-gray-300 dark:border-neutral-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                            <span className='ml-2 mr-1'>
                                                {activeSelectedQuestions[currentQuiz].Level}</span>
                                        </div>
                                        <div className='hidden lg:flex items-center w-max px-2 py-1 text-lg font-bold lg:text-lg rounded-xl bg-white/50 dark:bg-zinc-900/70 border border-gray-300 dark:border-neutral-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                                            <span className='ml-2 mr-1'>
                                                {activeSelectedQuestions[currentQuiz].Topic}</span>
                                        </div>
                                    </div> 
                                    
                                    {/* Question Text */}
                                    <div className='pb-8 pt-6 lg:py-8 px-2 lg:p-4 lg:mt-0 h-full font-bold text-xl xl:text-2xl text-left text-center flex justify-center items-center rounded-xl lg:bg-white/50 lg:dark:bg-zinc-900/70 lg:border lg:border-gray-300 dark:lg:border-neutral-700'>
                                    {activeSelectedQuestions[currentQuiz].Question}</div>
                                </div>
                            </div>

                            {/* Choices */}
                            <div className='-choice-panel'>
                                <div className='flex flex-col lg:flex-row gap-4 h-full'>{
                                    ChoiceObject
                                }</div>
                            </div>
                            
                        </div>

                        {/* Action bar */}
                        <div className='h-20 w-full fixed bottom-0 flex flex-row items-center p-4 backdrop-blur-md border-t border-slate-800/10 dark:border-slate-50/40 lg:border-none'>
                            <div className="flex flex-row w-full">
                                <div className="flex flex-col items-center content-center text-center">
                                    <button onClick={() => handleReload()} 
                                        className="text-xl px-4 py-3 mr-2 group rounded-xl border border-gray-300 dark:border-neutral-700 bg-white/70 dark:bg-black/40">
                                        <div className='font-bold'>
                                            <span className="mr-2">←</span>
                                            <span>Quit</span>
                                        </div>
                                    </button>
                                </div>
                                { !((activeSelectedQuestions[currentQuiz].choices[0].graded) ||
                                    (activeSelectedQuestions[currentQuiz].Mode == "Flashcard")) ?
                                        <div className="flex flex-col w-full ml-2 items-center content-center text-center">
                                            <button className="text-xl px-4 py-3 mr-2 w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white/70 dark:bg-black/40"
                                                onClick={() => gradeAllQuestions()}>
                                                    <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                                        <span>Submit</span>
                                                        <span className="ml-2">→</span>
                                                    </div>
                                            </button>
                                        </div> : 
                                        (currentQuiz < quizStatus.quizNumber - 1) ? 
                                            <div className="flex flex-col w-full ml-2 items-center content-center text-center">
                                                <button className="text-xl px-4 py-3 mr-2 w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white/70 dark:bg-black/40"
                                                    onClick={() => handleNextQuestion()}>
                                                        <div className='hidden sm:inline font-bold text-indigo-600 dark:text-indigo-500'>
                                                            <span>Next Question</span>
                                                            <span className="ml-2">→</span>
                                                        </div>
                                                        <div className='inline sm:hidden font-bold text-indigo-600 dark:text-indigo-500'>
                                                            <span>Next</span>
                                                            <span className="ml-2">→</span>
                                                        </div>
                                                </button>
                                            </div> :
                                            <div className="flex flex-col w-full ml-2 items-center content-center text-center">
                                                <Link className="text-xl px-4 py-3 mr-2 w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white/70 dark:bg-black/40"
                                                    href={"./"}>
                                                        <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                                            <span>Finish</span>
                                                            <span className="ml-2">→</span>
                                                        </div>
                                                </Link>
                                            </div>}
                                { (currentQuiz > 0) ?
                                    <div className="flex flex-col ml-2 items-center content-center text-center">
                                        <button className="text-xl px-4 py-3 mr-2 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white/70 dark:bg-black/40"
                                            onClick={() => changeQuestion(-1)}>
                                                <div className='font-bold'>
                                                    <span>Back</span>
                                                </div>
                                        </button>
                                    </div> : null}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
  }
