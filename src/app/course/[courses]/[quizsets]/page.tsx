import { getGoogleSheetProps } from '../../../utils/ggsheet';
import NotFound from '../../../components/not_found';
import QuizInterface from './interface';

interface HeaderDataStructure {
    Mission: string,
    QuestionMode: string,
    QuestionLevel: string,
    CardSetName: string,
    CardSetDescription: string,
    CardSetUrl: string,
    QuestionPoolTotal: number,
    TopicCount: { [key: string]: number }
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

// Dynamic routing <cardsets>
export default async function Quizset ({ params }: { params: {quizsets: string} }) {
   
    // Fetch data for this dynamic route
    const questionDataRaw: Array<Array<string>> | null | undefined = await getGoogleSheetProps({ 
        ref: "cardsets",
        sheetName: params.quizsets,
        rangeName: 'A2:W'
    }!)

    // If no header, return not found
    if (questionDataRaw == undefined) {return <NotFound />}
    
    // Get header of this cardset and delete it from questionDataRaw
    const headerQuestionSet: Array<string> = questionDataRaw?.shift()!;

    // Construct headerData
    let headerData: HeaderDataStructure = {
        Mission: headerQuestionSet[1],
        QuestionMode: headerQuestionSet[2],
        QuestionLevel: headerQuestionSet[3],
        CardSetName: headerQuestionSet[4],
        CardSetDescription: headerQuestionSet[6],
        CardSetUrl: headerQuestionSet[5],
        QuestionPoolTotal: 0,
        TopicCount: { }
    }

    // Construct questionData
    let questionData: Array<QuestionDataStructure> = [];

    for (let index = 0; index < questionDataRaw.length; index++) {
        const questionRow = questionDataRaw[index];
        try {
            let tempQuestionData: QuestionDataStructure = {
                ID: questionRow[0], Topic: questionRow[1], Mode: questionRow[2], Level: questionRow[3],
                Question: questionRow[4], QuestionImageUrl: questionRow[5], QuestionNote: questionRow[6],
                Choice1: questionRow[7], Answer1: (questionRow[8] == "TRUE"), Description1: questionRow[9],
                Choice2: questionRow[10], Answer2: (questionRow[11] == "TRUE"), Description2: questionRow[12],
                Choice3: questionRow[13], Answer3: (questionRow[14] == "TRUE"), Description3: questionRow[15],
                Choice4: questionRow[16], Answer4: (questionRow[17] == "TRUE"), Description4: questionRow[18],
                Choice5: questionRow[19], Answer5: (questionRow[20] == "TRUE"), Description5: questionRow[21],
                DetailedAnswerDescription: questionRow[22], graded: false
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

    return (
        <div>
            <div className="flex flex-col overflow-hidden">
                <img className='-bg-fixed' src={headerData.CardSetUrl} alt=''></img>
                <QuizInterface 
                    quizsets={params.quizsets}
                    headerData={headerData}
                    questionData={questionData}/>
            </div>
        </div>
    );
  }
