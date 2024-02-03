'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import './slider.css'
import { shuffle } from '@/app/utils/gadgetfx';

interface HeaderDataStructure {
    Mission: string,
    QuestionMode: string,
    QuestionLevel: string,
    CardSetName: string,
    CardSetDescription: string,
    CardSetUrl: string,
    QuestionPoolTotal: number,
    TopicCount: { [key: string]: number },
}

interface QuestionDataStructure {
    ID: string, Topic: string, Mode: string, Level: string, Question: string,
    QuestionImageUrl?: string, QuestionNote?: string,
    Choice1: string, Answer1: boolean, Description1?: string,
    Choice2: string, Answer2: boolean, Description2?: string,
    Choice3?: string, Answer3?: boolean, Description3?: string,
    Choice4?: string, Answer4?: boolean, Description4?: string,
    Choice5?: string, Answer5?: boolean, Description5?: string,
    DetailedAnswerDescription?: string, graded: boolean
}

export default function QuizInterface ({ 
    quizsets,
    headerData,
    questionData
}: {
    quizsets: string,
    headerData: HeaderDataStructure,
    questionData: Array<QuestionDataStructure>
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
        setChoicesStatus({
            0: {
                choice1: false,
                choice2: false,
                choice3: false,
                choice4: false,
                choice5: false,
            }
        });

    }

    // UseState for quiz navigation
    const [currentQuiz, setCurrentQuiz] = useState<number>(0);

    const [choicesStatus, setChoicesStatus] = useState<{
        [key: number]: {
            [key: string]: boolean
        }
    }>({
        0: {
            choice1: false,
            choice2: false,
            choice3: false,
            choice4: false,
            choice5: false,
        }
    });

    const handleChoiceInteract = (choice: keyof typeof choicesStatus[number], mode: string) => {
        if (mode == "Multiple Answer") {
            setChoicesStatus(prev => ({
                ...prev,
                [currentQuiz]: {
                    ...prev[currentQuiz],
                    [choice]: !(prev[currentQuiz][choice])
                }
            }));
        } else {
            setChoicesStatus(prev => ({
                ...prev,
                [currentQuiz]: {
                    choice1: false,
                    choice2: false,
                    choice3: false,
                    choice4: false,
                    choice5: false,
                }
            }));
            setChoicesStatus(prev => ({
                ...prev,
                [currentQuiz]: {
                    ...prev[currentQuiz],
                    [choice]: true
                }
            }));
        };
    }

    const gradeQuestion = () => {
        setActiveSelectedQuestions((prev) => ([
            ...prev.slice(0, currentQuiz),
            {
                ...prev[currentQuiz],
                graded: true
            },
            ...prev.slice(currentQuiz + 1, quizStatus.quizNumber)
        ]));
    }

    const changeQuestion = (value: number) => {
        setCurrentQuiz(prev => (prev + value));
    }

    const handleNextQuestion = () => {
        !activeSelectedQuestions[currentQuiz + 1].graded ?
            (setChoicesStatus(prev => ({
                ...prev,
                [currentQuiz + 1]: {
                    choice1: false,
                    choice2: false,
                    choice3: false,
                    choice4: false,
                    choice5: false,
                }
            }))) : null;
        changeQuestion(1);
    }

    return (
        <div>
            <div className="flex flex-col overflow-hidden">
                {
                    // ===== SECTION I: START PAGE ======
                    // ==================================
                    pageStatus == "START" ?
                    <div className='relative px-4 mt-[25vh] bg-white/90 dark:bg-black/80 backdrop-blur-lg'>
            
                        {/* Start page content */}
                        <div className="relative mb-8">
            
                            {/* Title */}
                            <h1 className='text-3xl mt-8 mb-3'>
                                {headerData.CardSetName}</h1>
            
                            {/* Description */}
                            <p>{headerData.CardSetDescription}</p>
            
                            {/* Properties */}
                            <div className="flex flex-col md:flex-row mt-6 mb-8">
            
                                {/* 5 Icons */}
                                <div className="flex flex-wrap gap-8">
                                    {/* Mission */}
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                            <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" /></svg>
                                        <div className="ml-2">
                                            <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                                Mission</p>
                                            <p className="ml-1 mt-1 text-sm">
                                                {headerData.Mission}</p>
                                        </div>
                                    </div>
            
                                    {/* Quiz mode */}
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                            <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" /></svg>
                                        <div className="ml-2">
                                            <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                                Quiz Mode</p>
                                            <p className="ml-1 mt-1 text-sm">
                                                {headerData.QuestionMode}</p>
                                        </div>
                                    </div>
            
                                    {/* Quiz level */}
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                        <div className="ml-2">
                                            <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                                Quiz Level</p>
                                            <p className="ml-1 mt-1 text-sm">
                                                {headerData.QuestionLevel}</p>
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
                            <div className="flex flex-row">
            
                                <div className="flex flex-col items-center content-center text-center">
                                    <Link href={"./"} className="text-xl px-4 py-2 mr-2 group rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700">
                                        <div className='font-bold'>
                                            <span className="mr-2">←</span>
                                            <span>Back</span>
                                        </div>
                                    </Link>
                                </div>

                                <div className="flex flex-col items-center content-center text-center">
                                    <button className="text-xl px-4 py-2 mr-2 group rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700"
                                        onClick={() => renderQuestion()}>
                                            <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                                <span>Start Quiz</span>
                                                <span className="ml-2">→</span>
                                            </div>
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div> : 

                    // ===== SECTION II: QUIZ PAGE =====
                    // =================================
                    <>
                        <div className='-full-screen flex flex-col relative px-4 pb-24 lg:pb-0 bg-white/90 dark:bg-black/85 backdrop-blur-lg'>
                            {/* Top bar */}
                            <div className='h-12 flex flex-row justify-between items-center'>
                                {/* Question tract */}
                                <div>
                                    <span className='-text-line hidden sm:inline text-md after:bg-slate-700 dark:after:bg-slate-200'>
                                        Question</span>
                                    <span className='-text-line inline sm:hidden text-md after:bg-slate-700 dark:after:bg-slate-200'>
                                        Quiz</span>
                                    <span className='px-2 py-1 mx-2 font-bold group rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700'>
                                        {currentQuiz + 1}</span>
                                    <span className='font-bold'>|</span>
                                    <span className='px-2 py-1 mx-2 font-bold group rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700'>
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
                                        <Link href={"./"}>Go Back</Link>
                                    </span>
                                    <span className='flex items-center justify-center mx-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span className='mx-1'>{quizsets}</span>
                                    </div>
                            </div>

                            {/* Question */}
                            <div className='-question-panel pt-2 pb-4 flex flex-col lg:flex-row justify-center items-center'>
                                {/* Question Image */}
                                {activeSelectedQuestions[currentQuiz].QuestionImageUrl ?
                                    <img className='w-full h-[40vh] lg:w-[40%] lg:h-full lg:mr-4 object-cover rounded-2xl bg-white/95 dark:bg-black/80'
                                        src={activeSelectedQuestions[currentQuiz].QuestionImageUrl} alt="" /> : null}
                                
                                <div className='flex flex-col h-full w-full justify-between'>
                                    <div className='flex flex-wrap mb-4 mt-4 lg:mt-0 gap-4'>
                                        <div className='flex items-center w-max px-2 py-1 text-lg font-bold lg:text-lg rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" /></svg>
                                            <span className='ml-2 mr-1'>
                                                {activeSelectedQuestions[currentQuiz].Mode}</span>
                                        </div>
                                        <div className='flex items-center w-max px-2 py-1 text-lg font-bold lg:text-lg rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                            <span className='ml-2 mr-1'>
                                                {activeSelectedQuestions[currentQuiz].Level}</span>
                                        </div>
                                        <div className='flex items-center w-max px-2 py-1 text-lg font-bold lg:text-lg rounded-xl bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-neutral-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="ml-1 w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                                            <span className='ml-2 mr-1'>
                                                {activeSelectedQuestions[currentQuiz].Topic}</span>
                                        </div>
                                    </div> 
                                    
                                    {/* Question Text */}
                                    <div className='py-8 px-2 lg:p-4 lg:mt-0 h-full font-bold text-xl xl:text-2xl text-left text-center flex justify-center items-center rounded-xl lg:bg-white/70 lg:dark:bg-black/40 lg:border border-gray-300 dark:border-neutral-700'>
                                    {activeSelectedQuestions[currentQuiz].Question}</div>
                                </div>
                            </div>

                            {/* Choices */}
                            <div className='-choice-panel'>
                                { !activeSelectedQuestions[currentQuiz].graded ?
                                    <div className='flex flex-col lg:flex-row gap-4 h-full'>

                                        { activeSelectedQuestions[currentQuiz].Choice1 ? 
                                        <div className={'h-full w-full rounded-xl bg-white/70 dark:bg-black/40'}>
                                            <button onClick={() => handleChoiceInteract("choice1", activeSelectedQuestions[currentQuiz].Mode)}
                                                className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl rounded-xl ' + 
                                    (choicesStatus[currentQuiz].choice1 ? "border text-indigo-600 dark:text-indigo-500 border-indigo-600 dark:border-indigo-500" 
                                                    : "border border-gray-300 dark:border-neutral-700")}>
                                                {activeSelectedQuestions[currentQuiz].Choice1}</button>
                                        </div> : null }

                                        { activeSelectedQuestions[currentQuiz].Choice2 ? 
                                        <div className={'h-full w-full rounded-xl bg-white/70 dark:bg-black/40'}>
                                            <button onClick={() => handleChoiceInteract("choice2", activeSelectedQuestions[currentQuiz].Mode)}
                                                className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl rounded-xl ' + 
                                    (choicesStatus[currentQuiz].choice2 ? "border text-indigo-600 dark:text-indigo-500 border-indigo-600 dark:border-indigo-500" 
                                                    : "border border-gray-300 dark:border-neutral-700")}>
                                                {activeSelectedQuestions[currentQuiz].Choice2}</button>
                                        </div> : null }
                                        
                                        { activeSelectedQuestions[currentQuiz].Choice3 ? 
                                        <div className={'h-full w-full rounded-xl bg-white/70 dark:bg-black/40'}>
                                            <button onClick={() => handleChoiceInteract("choice3", activeSelectedQuestions[currentQuiz].Mode)}
                                                className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl rounded-xl ' + 
                                    (choicesStatus[currentQuiz].choice3 ? "border text-indigo-600 dark:text-indigo-500 border-indigo-600 dark:border-indigo-500" 
                                                    : "border border-gray-300 dark:border-neutral-700")}>
                                                {activeSelectedQuestions[currentQuiz].Choice3}</button>
                                        </div> : null }

                                        { activeSelectedQuestions[currentQuiz].Choice4 ? 
                                        <div className={'h-full w-full rounded-xl bg-white/70 dark:bg-black/40'}>
                                            <button onClick={() => handleChoiceInteract("choice4", activeSelectedQuestions[currentQuiz].Mode)}
                                                className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl rounded-xl ' + 
                                    (choicesStatus[currentQuiz].choice4 ? "border text-indigo-600 dark:text-indigo-500 border-indigo-600 dark:border-indigo-500" 
                                                    : "border border-gray-300 dark:border-neutral-700")}>
                                                {activeSelectedQuestions[currentQuiz].Choice4}</button>
                                        </div> : null }

                                        { activeSelectedQuestions[currentQuiz].Choice5 ? 
                                        <div className={'h-full w-full rounded-xl bg-white/70 dark:bg-black/40'}>
                                            <button onClick={() => handleChoiceInteract("choice5", activeSelectedQuestions[currentQuiz].Mode)}
                                                className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl rounded-xl ' + 
                                    (choicesStatus[currentQuiz].choice5 ? "border text-indigo-600 dark:text-indigo-500 border-indigo-600 dark:border-indigo-500" 
                                                    : "border border-gray-300 dark:border-neutral-700")}>
                                                {activeSelectedQuestions[currentQuiz].Choice5}</button>
                                        </div> : null }

                                    </div> :
                                    <div className='flex flex-col lg:flex-row gap-4 h-full'>

                                        { activeSelectedQuestions[currentQuiz].Choice1 ? 
                                        <div className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl relative flex flex-col text-center items-center justify-center rounded-xl bg-white/70 dark:bg-black/40 border ' + 
                                            (activeSelectedQuestions[currentQuiz].Answer1 ? (
                                                choicesStatus[currentQuiz].choice1 ? "text-teal-600 dark:text-teal-500 border-teal-600 dark:border-teal-500 bg-teal-600/10 dark:bg-teal-500/10" : "border-gray-300 dark:border-neutral-700 text-indigo-600 dark:text-indigo-500") :
                                                choicesStatus[currentQuiz].choice1 ? "text-rose-600 dark:text-rose-500 border-rose-600 dark:border-rose-500 bg-rose-600/10 dark:bg-rose-500/10" : "border-gray-300 dark:border-neutral-700")}>
                                                <div className='text-center'>{activeSelectedQuestions[currentQuiz].Choice1}</div>
                                            </div> : null }

                                        { activeSelectedQuestions[currentQuiz].Choice2 ? 
                                        <div className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl relative flex flex-col items-center justify-center rounded-xl bg-white/70 dark:bg-black/40 border ' + 
                                            (activeSelectedQuestions[currentQuiz].Answer2 ? (
                                                choicesStatus[currentQuiz].choice2 ? "text-teal-600 dark:text-teal-500 border-teal-600 dark:border-teal-500 bg-teal-600/10 dark:bg-teal-500/10" : "border-gray-300 dark:border-neutral-700 text-indigo-600 dark:text-indigo-500") :
                                                choicesStatus[currentQuiz].choice2 ? "text-rose-600 dark:text-rose-500 border-rose-600 dark:border-rose-500 bg-rose-600/10 dark:bg-rose-500/10" : "border-gray-300 dark:border-neutral-700")}>
                                                <div className='text-center'>{activeSelectedQuestions[currentQuiz].Choice2}</div>
                                            </div> : null }

                                        { activeSelectedQuestions[currentQuiz].Choice3 ? 
                                        <div className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl relative flex flex-col items-center justify-center rounded-xl bg-white/70 dark:bg-black/40 border ' + 
                                            (activeSelectedQuestions[currentQuiz].Answer3 ? (
                                                choicesStatus[currentQuiz].choice3 ? "text-teal-600 dark:text-teal-500 border-teal-600 dark:border-teal-500 bg-teal-600/10 dark:bg-teal-500/10" : "border-gray-300 dark:border-neutral-700 text-indigo-600 dark:text-indigo-500") :
                                                choicesStatus[currentQuiz].choice3 ? "text-rose-600 dark:text-rose-500 border-rose-600 dark:border-rose-500 bg-rose-600/10 dark:bg-rose-500/10" : "border-gray-300 dark:border-neutral-700")}>
                                                <div className='text-center'>{activeSelectedQuestions[currentQuiz].Choice3}</div>
                                            </div> : null }

                                        { activeSelectedQuestions[currentQuiz].Choice4 ? 
                                        <div className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl relative flex flex-col items-center justify-center rounded-xl bg-white/70 dark:bg-black/40 border ' + 
                                            (activeSelectedQuestions[currentQuiz].Answer4 ? (
                                                choicesStatus[currentQuiz].choice4 ? "text-teal-600 dark:text-teal-500 border-teal-600 dark:border-teal-500 bg-teal-600/10 dark:bg-teal-500/10" : "border-gray-300 dark:border-neutral-700 text-indigo-600 dark:text-indigo-500") :
                                                choicesStatus[currentQuiz].choice4 ? "text-rose-600 dark:text-rose-500 border-rose-600 dark:border-rose-500 bg-rose-600/10 dark:bg-rose-500/10" : "border-gray-300 dark:border-neutral-700")}>
                                                <div className='text-center'>{activeSelectedQuestions[currentQuiz].Choice4}</div>
                                            </div> : null }

                                        { activeSelectedQuestions[currentQuiz].Choice5 ? 
                                        <div className={'px-2 py-3 w-full h-full font-bold text-lg sm:text-xl relative flex flex-col items-center justify-center rounded-xl bg-white/70 dark:bg-black/40 border ' + 
                                            (activeSelectedQuestions[currentQuiz].Answer5 ? (
                                                choicesStatus[currentQuiz].choice5 ? "text-teal-600 dark:text-teal-500 border-teal-600 dark:border-teal-500 bg-teal-600/10 dark:bg-teal-500/10" : "border-gray-300 dark:border-neutral-700 text-indigo-600 dark:text-indigo-500") :
                                                choicesStatus[currentQuiz].choice5 ? "text-rose-600 dark:text-rose-500 border-rose-600 dark:border-rose-500 bg-rose-600/10 dark:bg-rose-500/10" : "border-gray-300 dark:border-neutral-700")}>
                                                <div className='text-center'>{activeSelectedQuestions[currentQuiz].Choice5}</div>
                                            </div> : null }

                                    </div>}
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
                                { !activeSelectedQuestions[currentQuiz].graded ?
                                    <div className="flex flex-col w-full ml-2 items-center content-center text-center">
                                        <button className="text-xl px-4 py-3 mr-2 w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white/70 dark:bg-black/40"
                                            onClick={() => gradeQuestion()}>
                                                <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                                    <span>Submit</span>
                                                    <span className="ml-2">→</span>
                                                </div>
                                        </button>
                                    </div> : (currentQuiz < quizStatus.quizNumber - 1) ? 
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
