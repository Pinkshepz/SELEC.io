import { courseDataFetcher } from './content-data-fetch';
import CourseContentDisplay from './content-display';
import NotFound from '../../components/not_found';

// Dynamic routing <courses>
export default async function Course({ params }: { params: {courses: string} }) {
  // Fetch data
  const pageData = await courseDataFetcher({course: params.courses});

  // Return page
  try {     
    return (
      <>
        <CourseContentDisplay 
          courseData={pageData.courseData} 
          courseTopicData={pageData.courseTopicData}
          courseContentData={pageData.courseContentData}/>
      </>
    )
  } catch (error) {
    return <NotFound />;
  }
}
