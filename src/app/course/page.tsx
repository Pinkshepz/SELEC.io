import CourseDisplay from "./coursedisplay"
import Footer from "../components/footer";

export default async function HomePage() {
    const elementCourseDisplay = await CourseDisplay({searchKey: ''});
  
    return (
      <div className="flex flex-col">

        {/* Section 1: Hero */}

        <section className="flex flex-col mx-4 items-center justify-center">
            <div className="flex flex-row items-center justify-center relative bg-white dark:bg-black z-[-10]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mr-2 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
                <h1>Courses</h1>
            </div>
            <div className="flex flex-col items-center mt-4">
                {elementCourseDisplay}
            </div>
        </section>

        {/* Section 3: Footer */}

        <section className="flex flex-col mx-4">
            <Footer />
        </section>
      </div>
    )
}
