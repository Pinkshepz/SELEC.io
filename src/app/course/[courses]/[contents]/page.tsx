import { getGoogleSheetProps } from '../../../utils/ggsheet';
import NotFound from '../../../components/not_found';
import QuizInterface from './interface';

// CONSTANT VARIABLE
const CARDSET_RANGE = "A1:G";
const QUIZSET_RANGE = "A1:CZ";

// Dynamic routing <cardsets>
export default async function Quizset ({ params }: { params: {contents: string} }) {
   
    // Fetch cardset data for this dynamic route
    const cardsetDataRaw: {[key: string]: {[key: string]: any}} | undefined = await getGoogleSheetProps({
        ref: '[content]',
        sheetName: "CONTENT",
        rangeName: CARDSET_RANGE
      });
    
    // Verify avaliability of this quizset's course
    if ((cardsetDataRaw === undefined) || (cardsetDataRaw[params.contents] === undefined)) {
        return <NotFound />}

    // Get course data
    const cardsetData = cardsetDataRaw[params.contents];

    // Fetch quizset data for this dynamic route
    const questionData: {[key: string]: {[key: string]: any}} | undefined = await getGoogleSheetProps({ 
        ref: "cardsets",
        sheetName: params.contents,
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
        let _choice_structure = [];
        const questionRow = questionData[questionDataId[i]];

        try {
            let _choice_num = 1;
            while (_choice_num > 0) {
                (questionRow["Choice" + (_choice_num)] || (questionRow["ChoiceImageUrl" + (_choice_num)])) ? 
                    _choice_structure.push({
                        choice: questionRow["Choice" + (_choice_num)],
                        choiceImageUrl: questionRow["ChoiceImageUrl" + (_choice_num)],
                        answer: questionRow["Answer" + (_choice_num)] === "TRUE",
                        backText: questionRow["BackText" + (_choice_num)],
                        description: questionRow["Description" + (_choice_num)],
                        selected: false,
                        graded: false}) : 
                    _choice_num = -1;

                // Delete old choice data
                delete questionData[questionDataId[i]]["Choice" + (_choice_num)];
                delete questionData[questionDataId[i]]["ChoiceImageUrl" + (_choice_num)];
                delete questionData[questionDataId[i]]["Answer" + (_choice_num)];
                delete questionData[questionDataId[i]]["BackText" + (_choice_num)];
                delete questionData[questionDataId[i]]["Description" + (_choice_num)];

                _choice_num += 1;
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
        <div className="relative flex flex-col">
            <img className='-bg-fixed' src={headerData.ImageLink} alt=''></img>
            <QuizInterface
                headerData={headerData}
                questionData={Object.values(questionData)}/>
        </div>
    );
  }
