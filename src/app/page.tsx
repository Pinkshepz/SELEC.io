import CourseDisplay from "./coursedisplay"
import Footer from "./footer";

export default async function HomePage() {
    const elementCourseDisplay = await CourseDisplay();
    return (
      <div className="flex flex-col">
        <section className="flex flex-col items-center justify-center">
            <div className="pixellet text-5xl sm:text-7xl lg:text-9xl mt-16 sm:mt-24 md:mt-32 lg:mt-48 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                SELECARD
            </div>
            <div className="pixellet text-lg sm:text-xl md:text-2xl lg:text-5xl mt-4 mb-16 sm:mb-24 md:mb-32 lg:mb-48">
                Expose. Extract. Exam.
            </div>
        </section>
        <section className="flex flex-col mx-4">
            <h1 className='pixellet text-3xl mt-2 mb-6'>Courses</h1>
            <div className="w-[100%] h-[1px] bg-black dark:bg-white"></div>
            <div className="mt-4">
            {elementCourseDisplay}
            </div>
        </section>
        <section className="flex flex-col mx-4">
            <Footer />
        </section>
      </div>
    )
}
