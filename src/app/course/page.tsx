import { getGoogleSheetProps } from '../utils/ggsheet';

import CourseDisplay from "./coursedisplay"
import Footer from "../components/footer";

export default async function HomePage() {
    // Get data from GG Sheet api
    const courseDisplayDataRaw = await getGoogleSheetProps({
      ref: 'course',
      sheetName: "COURSE",
      rangeName: "A1:F"
    });
  
    const courseDisplayData = Object.values(courseDisplayDataRaw!);
  
    return (
      <div className="flex flex-col">

        {/* Section 1: Hero */}
        <CourseDisplay courseData={courseDisplayData} />
        <Footer />
      </div>
    );
}
