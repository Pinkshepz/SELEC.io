import { courseDataFetcher } from "./course-data-fetch";
import CourseDisplay from "./course-display"
import Footer from "../components/footer";

export default async function HomePage() {
    const corseData = await courseDataFetcher();

    return (
      <div>
        <CourseDisplay courseData={corseData} />
        <Footer />
      </div>
    );
}
