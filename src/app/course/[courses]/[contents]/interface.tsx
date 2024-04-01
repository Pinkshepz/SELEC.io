'use client'

import { useEffect } from "react";
import { useInterfaceContext } from "./provider-interface";
import SettingInterface from './components/setting';
import QuizInterface from "./components/quiz";

const DEFAULT_BG = 'https://www.hsph.harvard.edu/epidemiology/wp-content/uploads/sites/61/2022/03/3.png';

export default function Interface ({
    courseData,
    headerData,
    questionData
}: {
    courseData: {[key: string]: any},
    headerData: {[key: string]: any},
    questionData: Array<{[key: string]: any}>
}) {
    // Connect to interfaceContext
    const {interfaceParams, setInterfaceParams} = useInterfaceContext();

    return (
        <div className="relative flex flex-col">
            <img className='fixed w-full h-full object-cover' src={(headerData.ImageLink !== '') 
                ? headerData.ImageLink 
                : DEFAULT_BG} alt=''></img>

            {(interfaceParams.pageSwitch == false) && 
            <SettingInterface
                courseData={courseData}
                headerData={headerData}/>}

            {(interfaceParams.pageSwitch == true) && 
            <QuizInterface
                questionData={questionData}/>}
        </div>
    );
}
