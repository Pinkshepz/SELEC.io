'use client'

import { useInterfaceContext } from "./provider-interface";
import SettingInterface from './components/setting';
import QuizInterface from "./components/quiz";

const DEFAULT_BG = 'https://images.newscientist.com/wp-content/uploads/2022/08/08121245/SEI_117967799.jpg';

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
            {(interfaceParams.pageSwitch == false) && 
            <SettingInterface
                courseData={courseData}
                headerData={headerData}/>}

            {(interfaceParams.pageSwitch == true) && 
            <QuizInterface
                courseData={courseData}
                headerData={headerData}
                questionData={questionData}/>}
            <img className='fixed z-[-100] w-full h-full object-cover' src={(headerData.ImageLink !== '') 
                ? headerData.ImageLink 
                : DEFAULT_BG} alt=''></img>
        </div>
    );
}
