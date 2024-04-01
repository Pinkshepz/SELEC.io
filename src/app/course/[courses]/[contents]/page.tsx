import { quizDataFetcher } from './data-fetch'
import { InterfaceProvider } from "./provider-interface";
import Interface from './interface';
import NotFound from '../../../components/not_found';

// Dynamic routing <cardsets>
export default async function Quizset ({ params }: { params: {contents: string} }) {
   
    // Fetch cardset data for this dynamic route
    const pageData = await quizDataFetcher({content: params.contents});
    if (pageData === undefined) {return <NotFound/>};
    
    return (
        <InterfaceProvider>
            <Interface
                courseData={pageData.courseData}
                headerData={pageData.headerData}
                questionData={pageData.questionData} />
        </InterfaceProvider>
    );
}
