import CourseDisplay from "./coursedisplay"
import Footer from "../components/footer";

export default async function HomePage() {
    const elementCourseDisplay = await CourseDisplay({searchKey: ''});
  
    return (
      <div className="flex flex-col">

        {/* Section 1: Hero */}

        <section className="flex flex-col mx-4 items-center justify-center">
            <div className="flex flex-row items-center justify-center relative bg-white dark:bg-black z-[-10] py-16 w-full border-b border-slate-800/10 dark:border-slate-50/40">
                <h1>Courses</h1>
            </div>
            <div className="flex flex-col items-center mt-4">
                {elementCourseDisplay}
            </div>
        </section>

        {/* Section 2: Footer */}

        <section className="flex flex-col mx-4">
            <Footer />
        </section>
      </div>
    )
}
