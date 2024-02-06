import Link from 'next/link';
import DisplayCard from '../../components/displaycard';

export default async function CardsetDisplay({
    cardsetData
}: {
    cardsetData: {[key: string]: Array<Array<string>>}
}) {

  // Map cardset data into objects
  // Store elements level 1
  let cardsetCollection: Array<React.ReactNode> = [];

  // Start from topic
  for (let index = 0; index < Object.keys(cardsetData).length; index++) {
    const topic = Object.keys(cardsetData)[index];

    // Map cardsetData into each card
    cardsetData[topic]?.map((cardsetData) => {
        cardsetCollection.push(
            <Link 
                href={{
                    pathname: "/course/[courses]/[quizsets]",
                    query: { courses: cardsetData[0],
                             quizsets: cardsetData[1] }
                }}
                as={`/course/${cardsetData[0]}/${cardsetData[1]}`}
                key={cardsetData[1]}
            >
                <DisplayCard 
                    cardId={cardsetData[1]}
                    cardGroup={cardsetData[2]}
                    cardCategory={cardsetData[3]}
                    cardImageLink={cardsetData[4]}
                    cardTitle={cardsetData[5]}
                    cardDescription={cardsetData[6]}
                    key={cardsetData[1]}/>
            </Link>
        );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
      {cardsetCollection}
    </div>
  );
}
