import { courseDataFetcher } from './content-data-fetch';
import CourseContentDisplay from './content-display';
import NotFound from '../../components/not_found';
import Footer from '@/app/components/footer';

// Dynamic routing <courses>
export default async function Course({ params }: { params: {courses: string} }) {
  // Fetch data
  const pageData = await courseDataFetcher({course: params.courses});

  // Return page
  try {     
    return (
      <div className="flex min-h-screen flex-col">
        <CourseContentDisplay 
          courseData={pageData.courseData} 
          contentData={pageData.courseContentData}/>
        <Footer />
      </div>
    )
  } catch (error) {
    return <NotFound />;
  }
}
