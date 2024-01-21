import Link from 'next/link';
import DisplayCard from './components/displaycard';
import { getGoogleSheetProps } from './utils/ggsheet';

export default async function CourseDisplay() {
  // Get data from GG Sheet api
  const courseDisplayData: any = await getGoogleSheetProps({
    ref: 'homepage',
    sheetName: "COURSE",
    rangeName: "A2:F"
  });

  // Data structure for this page
  const courseDisplayStructure: {
    card: {[key: string]: Array<Array<string>>};
  } = {
    card: {},
  }

  // Sort header & link, and sort cardsets by its topics
  for (let index = 0; index < courseDisplayData!.length; index++) {
    const element = courseDisplayData![index];
    // Sort courseDisplayData cards by its topics
    if (courseDisplayStructure['card'][element[1]] == undefined) {
        courseDisplayStructure['card'][element[1]] = [element];
    } else {
        courseDisplayStructure['card'][element[1]].push(element);
    }
  }

  // Map cardset data into objects
  // Store elements level 1
  let cardsetObjectsH1: Array<React.ReactNode> = [];

  // Start from topic
  for (let index = 0; index < Object.keys(courseDisplayStructure['card']).length; index++) {
    const topic = Object.keys(courseDisplayStructure['card'])[index];
    // Topic header
    cardsetObjectsH1.push(
      <h1 className="pixellet text-2xl mt-2 mb-6" key={`heading${topic}`}>{topic}</h1>
    );

    // Store elements level 2
    let cardsetObjectsH2: Array<React.ReactNode> = [];

    // Map courseData into each card
    courseDisplayStructure['card'][topic]?.map((courseData) => {
        cardsetObjectsH2.push(
            <Link href={"./[courses]"} as={courseData[0]} >
                <DisplayCard 
                    cardId={courseData[0]}
                    cardGroup={courseData[1]}
                    cardCategory={courseData[2]}
                    cardImageLink={courseData[3]}
                    cardTitle={courseData[4]}
                    cardDescription={courseData[5]}
                    key={courseData[0]}/>
            </Link>
        );
    });

    cardsetObjectsH1.push(
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" key={`group${topic}`}>
        {cardsetObjectsH2}
      </div>
    );
  }

  return cardsetObjectsH1;
}
