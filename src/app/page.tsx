import Cardset from "./cardset"
import { google } from 'googleapis';
 
async function getPageData() {
  // Function for fetch server-side data from GG Sheet api

  // Auth
  const auth = await google.auth.getClient(
    { scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']}
  );
  const sheets = google.sheets({ version: 'v4', auth });

  // Query
  const range = 'CARDSET!A2:F';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // Result: array of data of each cardset
  const cardsets = response.data.values;

  return cardsets;
}

export default async function Course() {
  // Get data from GG Sheet api
  const cardsets = await getPageData()!;

  // Data structure for this page
  const courseStructure: {
    header: Array<Array<string>>;
    link: Array<Array<string>>;
    card: {[key: string]: Array<Array<string>>};
  } = {
    header: [],
    link: [],
    card: {},
  }

  // Sort header & link, and sort cardsets by its topics
  for (let index = 0; index < cardsets!.length; index++) {
    const element = cardsets![index];
    
    switch (element[0]) {
      // Filter header
      case 'HEADER':
        courseStructure['header'].push(element);
        break;
      // Filter link
      case 'LINK':
        courseStructure['link'].push(element);
        break;
      // Sort cardsets by its topics
      default:
        if (courseStructure['card'][element[1]] == undefined) {
          courseStructure['card'][element[1]] = [element];
        } else {
          courseStructure['card'][element[1]].push(element);
        }
        break;
      }
    }

  // Map header link into objects
  // Store html elements
  let linkObjects: Array<React.ReactNode> = [];
  
    courseStructure['link']?.map((linkset) => {
      if (linkset[4] == 'SK Materials') {
        linkObjects.push(
          <a href={linkset[3]} className="mb-4" key={linkset[4]}>
            <span className="px-2 py-1 mr-2 group rounded-xl border bg-gradient-to-r from-pink-500/50 to-blue-500/75 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-blue-500/75" key={linkset[4]}>
            {linkset[4]}
            </span>
          </a>
          );
      } else {
        linkObjects.push(
          <a href={linkset[3]} className="mb-4" key={linkset[4]}>
            <span className="px-2 py-1 mr-2 group rounded-xl border transition-colors transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600" key={linkset[4]}>
            {linkset[4]}
            </span>
          </a>
          );
      }
    });

  // Map cardset data into objects
  // Store html elements
  let cardsetObjects: Array<React.ReactNode> = [];

  // Start from topic
  for (let index = 0; index < Object.keys(courseStructure['card']).length; index++) {
    const topic = Object.keys(courseStructure['card'])[index];
    // Topic header
    cardsetObjects.push(
      <h1 className="pixellet text-2xl mt-2 mb-6" key={`heading${topic}`}>{topic}</h1>
    );

    // Cardsets interface
    let cardsetSubObjects: Array<React.ReactNode> = [];

    courseStructure['card'][topic]?.map((cardset) => {
      cardsetSubObjects.push(
        <Cardset 
          cardsetId={cardset[0]}
          cardsetType={cardset[2]}
          cardsetImageUrl={cardset[3]}
          cardsetTitle={cardset[4]}
          cardsetDescription={cardset[5]}
          key={cardset[0]}/>
        );
    });

    cardsetObjects.push(
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" key={`group${topic}`}>
        {cardsetSubObjects}
      </div>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col">
      <p className="pixelify text-2xl mt-8 mb-1">
        {courseStructure['header'][0][5]}
      </p>
      <h1 className="pixellet text-3xl mt-2 mb-6">
        {courseStructure['header'][0][4]}
      </h1>
      <div className="mb-4 flex flex-wrap">
       {linkObjects}
      </div>
      <div className="w-[100%] h-[1px] bg-black dark:bg-white"></div>
      <div className="mt-4">
        {cardsetObjects}
      </div>
      <footer className='mt-8 flex flex-col w-auto items-center justify-center'>
        <div className="w-[100%] h-[1px] bg-black dark:bg-white"></div>
        <div className="flex flex-row w-full justify-between my-3 pixelify">
          <div>Version Beta 1.0 by Pinkshepz</div>
          <div><a href="https://www.flaticon.com">Icons by Flaticon</a></div>
        </div>
      </footer>
    </main>
  )
}
