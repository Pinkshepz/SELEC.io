import CourseDisplay from "./coursedisplay"
import Footer from "./footer";

export default async function HomePage() {
    const elementCourseDisplay = await CourseDisplay();
    return (
      <main className="flex min-h-screen flex-col px-4">
        <h1 className='pixellet text-3xl mt-2 mb-6'>Courses</h1>
        <div className="w-[100%] h-[1px] bg-black dark:bg-white"></div>
        <div className="mt-4">
          {elementCourseDisplay}
        </div>
        <Footer />
      </main>
    )
}
