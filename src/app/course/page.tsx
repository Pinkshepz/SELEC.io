import CourseDisplay from "./coursedisplay"

export default async function HomePage() {
    const elementCourseDisplay = await CourseDisplay({searchKey: ''});
  
    return (
      <div className="flex flex-col">

        {/* Section 1: Hero */}

        <section className="flex flex-col mx-4 items-center justify-center">
            <div className="flex flex-row items-center justify-center relative z-[-10] pt-32 pb-8 w-full">
                <h1>Courses</h1>
            </div>
        </section>

        {/* Section 2: Display */}
        <section className="flex flex-col items-center mx-4">
            {elementCourseDisplay}
        </section>
      </div>
    );
}
