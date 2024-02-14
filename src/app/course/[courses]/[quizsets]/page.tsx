import { getGoogleSheetProps } from '../../../utils/ggsheet';
import NotFound from '../../../components/not_found';
import QuizInterface from './interface';

// CONSTANT VARIABLE
const CARDSET_RANGE = "A1:G";
const QUIZSET_RANGE = "A1:AE";
const CHOICE_SCOPE = ["Choice1", "Choice2", "Choice3", "Choice4", "Choice5"];

// Dynamic routing <cardsets>
export default async function Quizset ({ params }: { params: {quizsets: string} }) {
   
    // Fetch cardset data for this dynamic route
    const cardsetDataRaw: {[key: string]: {[key: string]: any}} | undefined = await getGoogleSheetProps({
        ref: '[cardset]',
        sheetName: "CARDSET",
        rangeName: CARDSET_RANGE
      });
    
    // Verify avaliability of this quizset's course
    if ((cardsetDataRaw === undefined) || (cardsetDataRaw[params.quizsets] === undefined)) {
        return <NotFound />}

    // Get course data
    const cardsetData = cardsetDataRaw[params.quizsets];

    // Fetch quizset data for this dynamic route
    const questionData: {[key: string]: {[key: string]: any}} | undefined = await getGoogleSheetProps({ 
        ref: "cardsets",
        sheetName: params.quizsets,
        rangeName: QUIZSET_RANGE
    }!)

    // If no data, return not found
    if ((questionData === undefined) || (Object.keys(questionData)).length == 0) {
        return <NotFound />}
    
    // Construct headerData as main setting for quiz environment
    let headerData: {[key: string]: any} = {
        ...cardsetData,
        QuestionPoolTotal: 0,
        TopicCount: {}
    }

    // Get Id of every questions for indexing and modify data
    const questionDataId = Object.keys(questionData)

    for (let i = 0; i < questionDataId.length; i++) {
        let _choice_structure: {[key: string]: {[key: string]: any}} = {};
        const questionRow = questionData[questionDataId[i]];
        try {
            for (let j = 0; j < CHOICE_SCOPE.length; j++) {
                const _choice = CHOICE_SCOPE[j];
                (questionRow[_choice] || (questionRow["ChoiceImageUrl" + (j + 1)])) ? 
                    _choice_structure[j] = {
                        choice: questionRow[_choice],
                        choiceImageUrl: questionRow["ChoiceImageUrl" + (j + 1)],
                        answer: questionRow["Answer" + (j + 1)] === "TRUE",
                        backText: questionRow["BackText" + (j + 1)],
                        description: questionRow["Description" + (j + 1)],
                        selected: false,
                        graded: false} : 
                    null;

                // Delete old choice data
                delete questionData[questionDataId[i]][_choice];
                delete questionData[questionDataId[i]]["ChoiceImageUrl" + (j + 1)];
                delete questionData[questionDataId[i]]["Answer" + (j + 1)];
                delete questionData[questionDataId[i]]["BackText" + (j + 1)];
                delete questionData[questionDataId[i]]["Description" + (j + 1)];
            }
            // Redesign choices data structure
            questionData[questionDataId[i]] = {
                ...questionRow,
                choices: _choice_structure
            }

            // Collect statistics of topic group
            if (headerData.TopicCount[questionRow.Topic] != undefined) {
                headerData.TopicCount[questionRow.Topic] += 1;
            } else {
                headerData.TopicCount[questionRow.Topic] = 1;
            }

            // Count total number of quiz
            headerData.QuestionPoolTotal += 1;

        } catch (error) {
            console.log("MINOR ERROR: Question data entry error at" + questionDataId[i]);
        }
    }
    
    return (
        <div>
            <div className="relative min-h-[100vh] flex flex-col">
                <img className='-bg-fixed' src={headerData.ImageLink} alt=''></img>
                <QuizInterface
                    headerData={headerData}
                    questionData={Object.values(questionData)}/>
            </div>
        </div>
    );
  }
