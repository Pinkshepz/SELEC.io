'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useInterfaceContext } from '../provider-interface';
import './slider.css'

export default function SettingInterface ({
    courseData,
    headerData
}: {
    courseData: {[key: string]: any},
    headerData: {[key: string]: any}
}) {
    // Connect to interfaceContext
    const {interfaceParams, setInterfaceParams} = useInterfaceContext();
    
    // Set initial interface parameters
    useEffect(() => setInterfaceParams("shuffleQuestion", (headerData.QuestionShuffle === "FALSE") ? false : true), []);
    useEffect(() => setInterfaceParams("shuffleChoice", (headerData.ChoiceShuffle === "FALSE") ? false : true), []);
    useEffect(() => setInterfaceParams("questionNumber", headerData.QuestionPoolTotal), []);
    useEffect(() => setInterfaceParams("currentQuestion", 0), []);

    // Handle toogle shuffle question option
    const handleShuffleQuestionToggle = () => {
        setInterfaceParams("shuffleQuestion", !interfaceParams.shuffleQuestion);
    }

    // Handle toogle shuffle choice option
    const handleShuffleChoiceToggle = () => {
        setInterfaceParams("shuffleChoice", !interfaceParams.shuffleChoice);
    }
    
    // Handle slidebar quiz number option
    const handleNumSlider = (value: number) => {
        setInterfaceParams("questionNumber", value);
    }

    return (
        <div className='min-h-[100lvh] relative pt-16 flex items-center justify-center backdrop-blur-md'>
        
            {/* Start page static information */}
            <div id='panel' className="relative md:w-[80dvw] h-full p-4 m-6 backdrop-blur-2xl">

                {/* Course data */}
                <p id='small-p-ter'>{courseData.ID} - {courseData.Title}</p>

                {/* Title */}
                <h2 className='mt-2'>{headerData.Title}</h2>

                {/* Description */}
                {headerData.Description && <p className='mt-6'>{headerData.Description}</p>}

                {/* Content data */}
                <div className='flex flex-row items-center mt-4'>
                    {headerData.Mode == 'FLASHCARD'
                        ? <span id="chip-action-neu">{headerData.Mode}</span>
                        : headerData.Mode == 'MCQ' 
                        ? <span id="chip-action-pri">{headerData.Mode}</span>
                        : <span id="chip-action-sec">{headerData.Mode}</span>}
                    <span id='chip-action-neu' className="flex flex-row gap-1 ml-4">{headerData.Ref}</span>
                    <h6 className="flex flex-row gap-1 ml-4">{headerData.Members} Questions</h6>
                </div>

                {/* Settings */}
                <div className="flex flex-col mt-8"> 
                    {/* Shuffle */}
                    <div className="flex flex-wrap gap-4">
                        {/* Shuffle Quiz */}
                        <button 
                            onClick={() => handleShuffleQuestionToggle()} id='chip-toggle'
                            className={(interfaceParams?.shuffleQuestion ? "true" : "") + " p-2 flex flex-row w-max justify-center items-center"}>
                            <div className={"flex flex-row items-center w-fit"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" /></svg>
                                <h5 className="font-bold ml-2 mr-4 after:bg-slate-700 dark:after:bg-slate-200">Shuffle Questions</h5>
                            </div>
                            {/* ENABLED OR DISABLED */}
                            {interfaceParams?.shuffleQuestion ? 
                                <h5 className="mr-1 mt-0 font-bold text-indigo-600 after:bg-indigo-600">ENABLED</h5> : 
                                <h5 className="mr-1 mt-0 font-bold">DISABLED</h5>}
                        </button>
                        {/* Shuffle Choice */}
                        <button 
                            onClick={() => handleShuffleChoiceToggle()} id='chip-toggle'
                            className={(interfaceParams?.shuffleChoice ? "true" : "") + " p-2 flex flex-row w-max justify-center items-center"}>
                            <div className={"flex flex-row items-center w-fit"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" /></svg>
                                <h5 className="font-bold ml-2 mr-4 after:bg-slate-700 dark:after:bg-slate-200">Shuffle Choice</h5>
                            </div>
                            {/* ENABLED OR DISABLED */}
                            {interfaceParams?.shuffleChoice ? 
                                <h5 className="mr-1 mt-0 font-bold text-indigo-600 after:bg-indigo-600">ENABLED</h5> : 
                                <h5 className="mr-1 mt-0 font-bold">DISABLED</h5>}
                        </button>
                    </div>

                    {/* Question Number */}
                    <div id='chip-toggle' className="px-2 py-2 mr-2 mt-4 inline max-w-[500px]">
                        <div className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" /></svg>
                            <h5 className="font-bold ml-2 mr-4 whitespace-nonwrap">
                                Total Questions</h5>
                            {/* Slider number */}
                            <h5 className="font-bold text-indigo-600 dark:text-indigo-500">{interfaceParams.questionNumber}</h5>
                        </div>
                        <div className="flex flex-row items-center w-full mt-2">
                            {/* INPUT - slider */}
                            <input type="range" min={1} max={headerData.QuestionPoolTotal} name='QuizNumRange' 
                                value={interfaceParams.questionNumber} onChange={e => handleNumSlider(Number(e.target.value))}/>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <div className="flex flex-row gap-2 mt-8">
                    <div id='chip-toggle' className="flex flex-col items-center content-center text-center">
                        <Link href={"./"} className="text-xl px-4 py-2 rounded-xl">
                            <div className='font-bold'>
                                <span className="mr-2">←</span>
                                <span>Back</span>
                            </div>
                        </Link>
                    </div>
                    <div id='chip-toggle' className="flex flex-col items-center content-center text-center">
                        <a href="#top">
                            <button className="text-xl px-4 py-2 rounded-xl"
                                onClick={() => setInterfaceParams("pageSwitch", true)}>
                                <div className='font-bold text-indigo-600 dark:text-indigo-500'>
                                    <span>Start Quiz</span>
                                    <span className="ml-2">→</span>
                                </div>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
