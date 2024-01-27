'use client'
import React, { useState } from 'react';

import { getGoogleSheetProps } from '../../../utils/ggsheet';
import NotFound from '../../../components/not_found';
import StartPage from './start_page';
import Cards from './cards';

interface HeaderDataStructure {
    Mission: string,
    QuestionMode: string,
    CardSetName: string,
    CardSetDescription: string,
    CardSetUrl: string,
    QuestionPoolTotal: number,
    TopicCount: { [key: string]: number },
    pageStatus?: "START" | "MID" | "END",
    setPageStatus?: ["START" | "MID" | "END", 
        React.Dispatch<React.SetStateAction<"START" | "MID" | "END">>],
    quizStatus?: { shuffle: boolean, quizNumber: number },
    setQuizStatus?: [{ shuffle: boolean, quizNumber: number },
        React.Dispatch<React.SetStateAction<{ shuffle: boolean, quizNumber: number }>>]
}

interface QuestionDataStructure {
    ID: string, Topic: string, Level: string, Question: string,
    QuestionImageUrl?: string, QuestionNote?: string,
    Choice1: string, Answer1: boolean, Description1?: string,
    Choice2: string, Answer2: boolean, Description2?: string,
    Choice3: string, Answer3: boolean, Description3?: string,
    Choice4: string, Answer4: boolean, Description4?: string,
    DetailedAnswerDescription?: string
}

// Dynamic routing <cardsets>
export default async function Page ({ params }: { params: {cardsets: string} }) {
   
    // Fetch data for this dynamic route
    const questionDataRaw: Array<Array<string>> | null | undefined = await getGoogleSheetProps({ 
        ref: "cardsets",
        sheetName: params.cardsets,
        rangeName: 'A2:S'
    }!)

    // If no header, return not found
    if (questionDataRaw == undefined) {return <NotFound />}
    
    // Get header of this cardset and delete it from questionDataRaw
    const headerQuestionSet: Array<string> = questionDataRaw?.shift()!;

    // Construct headerData
    let headerData: HeaderDataStructure = {
        Mission: headerQuestionSet[1],
        QuestionMode: headerQuestionSet[2],
        CardSetName: headerQuestionSet[3],
        CardSetDescription: headerQuestionSet[5],
        CardSetUrl: headerQuestionSet[4],
        QuestionPoolTotal: 0,
        TopicCount: { }
    }

    // Construct questionData
    let questionData: Array<QuestionDataStructure> = [];

    for (let index = 0; index < questionDataRaw.length; index++) {
        const questionRow = questionDataRaw[index];
        try {
            let tempQuestionData: QuestionDataStructure = {
                ID: questionRow[0], Topic: questionRow[1], Level: questionRow[2],
                Question: questionRow[3], QuestionImageUrl: questionRow[4], QuestionNote: questionRow[5],
                Choice1: questionRow[6], Answer1: (questionRow[7] == "true"), Description1: questionRow[8],
                Choice2: questionRow[9], Answer2: (questionRow[10] == "true"), Description2: questionRow[11],
                Choice3: questionRow[12], Answer3: (questionRow[13] == "true"), Description3: questionRow[14],
                Choice4: questionRow[15], Answer4: (questionRow[16] == "true"), Description4: questionRow[17],
                DetailedAnswerDescription: questionRow[17],
            }
            questionData.push(tempQuestionData);

            if (headerData.TopicCount[tempQuestionData.Topic] != undefined) {
                headerData.TopicCount[tempQuestionData.Topic] += 1;
            } else {
                headerData.TopicCount[tempQuestionData.Topic] = 1;
            }

            headerData.QuestionPoolTotal += 1;

        } catch (error) {
            console.log("MINOR ERROR: Question data entry error");
        }
    }

    console.log(headerData);

     // Usestate
     let pageStatus, setPageStatus = useState<"START" | "MID" | "END">("START");
     let quizStatus, setQuizStatus = useState<{
        shuffle: boolean, 
        quizNumber: number
    }>({
        shuffle: false, quizNumber: headerData.QuestionPoolTotal
    });

    headerData = { ...headerData,
        pageStatus: pageStatus ,
        setPageStatus: setPageStatus,
        quizStatus: quizStatus,
        setQuizStatus: setQuizStatus
    }

    return (
        <div>
            <div className="flex flex-col overflow-hidden">
                <img className='-bg-fixed' src={headerData.CardSetUrl} alt=''></img>
                <StartPage  headerData={headerData} />
            </div>
        </div>
    );
  }
