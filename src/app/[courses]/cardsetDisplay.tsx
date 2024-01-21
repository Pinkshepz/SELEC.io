import Link from 'next/link';
import DisplayCard from '../components/displaycard';

export default async function CardsetDisplay({
    cardsetData
}: {
    cardsetData: {[key: string]: Array<Array<string>>}
}) {

  // Map cardset data into objects
  // Store elements level 1
  let cardsetObjectsH1: Array<React.ReactNode> = [];

  // Start from topic
  for (let index = 0; index < Object.keys(cardsetData).length; index++) {
    const topic = Object.keys(cardsetData)[index];
    // Topic header
    cardsetObjectsH1.push(
      <h1 className="pixellet text-2xl mt-8 mb-6" key={`heading${topic}`}>{topic}</h1>
    );

    // Store elements level 2
    let cardsetObjectsH2: Array<React.ReactNode> = [];

    // Map cardsetData into each card
    cardsetData[topic]?.map((cardsetData) => {
        cardsetObjectsH2.push(
            <Link href={`./${cardsetData[0]}/[cardsets]`} as={cardsetData[1]} >
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

    cardsetObjectsH1.push(
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" key={`group${topic}`}>
        {cardsetObjectsH2}
      </div>
    );
  }

  return cardsetObjectsH1;
}
