import Link from 'next/link';
import DisplayCard from '../components/displaycard';
import { getGoogleSheetProps } from '../utils/ggsheet';

export default async function CourseDisplay({
    searchKey // For future serch bar feature
}: {
    searchKey: string
}) {
  // Get data from GG Sheet api
  const courseDisplayDataRaw = await getGoogleSheetProps({
    ref: 'course',
    sheetName: "COURSE",
    rangeName: "A1:F"
  });

  const courseDisplayData = Object.values(courseDisplayDataRaw!);

  // Data structure for this page
  const courseDisplayDataStructure: {[key: string]: Array<{[key: string]: any}>} = {};

  // Sort cardsets by its topic group
  for (let index = 0; index < courseDisplayData!.length; index++) {
    // Each course data
    const element: {[key: string]: any} = courseDisplayData![index];
    // Sort courseDisplayData cards by its topics
    if (courseDisplayDataStructure[element["Group"]] == undefined) {
        courseDisplayDataStructure[element["Group"]] = [element];
    } else {
        courseDisplayDataStructure[element["Group"]].push(element);
    }
  }

  // Map cardset data into objects
  // Store all courses
  let courseDisplayAllTopicGroups: Array<React.ReactNode> = [];

  // Start from topic
  for (let index = 0; index < Object.keys(courseDisplayDataStructure).length; index++) {
    const topic = Object.keys(courseDisplayDataStructure)[index];
    // Topic header
    courseDisplayAllTopicGroups.push(
      <h2 className="my-8" key={`heading ${topic}`}>{topic}</h2>
    );

    // Store course with a particular topic group
    let courseDisplaySingleTopicGroup: Array<React.ReactNode> = [];

    // Map courseData into each card
    courseDisplayDataStructure[topic]?.map((courseData) => {
        courseDisplaySingleTopicGroup.push(
            <Link 
                href={{
                    pathname: "./course/[courses]",
                    query: { courses: courseData["ID"] }
                }}
                as={`course/${courseData["ID"]}`}
                key={courseData["ID"]}
            >
                <DisplayCard 
                    cardId={courseData["ID"]}
                    cardGroup={topic}
                    cardCategory={"BLOCK " + courseData["Block"]}
                    cardImageLink={courseData["ImageLink"]}
                    cardTitle={courseData["Title"]}
                    cardDescription={courseData["Description"]}
                    key={courseData["ID"]}/>
            </Link>
        );
    });

    // Display grid full screen
    courseDisplayAllTopicGroups.push(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1" key={`group${topic}`}>
        {courseDisplaySingleTopicGroup}
      </div>
    );
  }

  return courseDisplayAllTopicGroups;
}
