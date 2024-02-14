import Link from 'next/link';
import DisplayCard from '../../components/displaycard';

export default async function CardsetDisplay({
    cardsetData
}: {
    cardsetData: Array<{[key: string]: any}>
}) {

  // Map cardset data into objects
  // Store elements level 1
  let cardsetDisplayAll: Array<React.ReactNode> = [];

  // Map cardsetData into each card
  cardsetData.map((cardsetData) => {
      cardsetDisplayAll.push(
        <a href="#top">
          <Link 
              href={{
                  pathname: "/course/[courses]/[quizsets]",
                  query: { courses: cardsetData[0],
                            quizsets: cardsetData[1] }
              }}
              as={`/course/${cardsetData["Course"]}/${cardsetData["ID"]}`}
              key={cardsetData["ID"]}>
              <DisplayCard 
                  cardId={cardsetData["ID"]}
                  cardGroup={cardsetData["Group"]}
                  cardCategory={cardsetData["Category"]}
                  cardImageLink={cardsetData["ImageLink"]}
                  cardTitle={cardsetData["Title"]}
                  cardDescription={cardsetData["Description"]}
                  key={cardsetData["ID"]}/>
          </Link>
        </a>
      );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
      {cardsetDisplayAll}
    </div>
  );
}
