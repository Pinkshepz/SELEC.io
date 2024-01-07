import Page from "./[cardsets]/page"
import Link from "next/link"
import Cardset from "./cardset"
import { google } from 'googleapis';
 
export async function getData() {
  // Function for fetch server-side data from GG Sheet api

  // Auth
  const auth = await google.auth.getClient(
    { scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']}
  );
  const sheets = google.sheets({ version: 'v4', auth });

  // Query
  const range = 'CARDSET!A2:F10';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // Result: array of data of each cardset
  const cardsets = response.data.values;

  return cardsets
}

export default async function Collection() {
  // Get data from GG Sheet api
  const cardsets = await getData()!;

  // Group cardset by topics
  const cardsetsSorted: {[key: string]: Array<Array<string>>} = {};

  for (let index = 0; index < cardsets!.length; index++) {
    const element = cardsets![index];
    const topic: string = element[1];

    if (cardsetsSorted[topic] == undefined) {
      cardsetsSorted[topic] = [element];
    } else {
      cardsetsSorted[topic].push(element);
    }
  }

  // Map cardset data into objects
  // Store html elements
  let cardsetObjects: Array<React.ReactNode> = [];

  // Start from topic
  for (let index = 0; index < Object.keys(cardsetsSorted).length; index++) {
    const topic = Object.keys(cardsetsSorted)[index];
    // Topic header
    cardsetObjects.push(
      <h1 className="pixellet text-2xl mt-2 mb-6">{topic}</h1>
    );

    // Cardsets interface
    let cardsetSubObjects: Array<React.ReactNode> = [];

    cardsetsSorted[topic]?.map((cardset) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cardsetSubObjects}
      </div>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col">
      <p className="pixelify text-2xl my-1">SIID256</p>
      <h1 className="pixellet text-3xl mt-2 mb-6">
        Microbiology and Parasitology
      </h1>
      <div className="mb-4 flex flex-wrap">
        <a href="https://selecx-new.si.mahidol.ac.th/course/view.php?id=4305" className="mb-4">
          <span className="px-2 py-1 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">SELECx</span></a>
        <a href="https://sites.google.com/view/siriraj132/archives/year-2/siid256?authuser=0" className="mb-4">
          <span className="px-2 py-1 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">SI132</span></a>
        <a href="https://drive.google.com/file/d/1suY1t_DTf--MHo7tPrz9rqhO-D3U91As/view?usp=drivesdk" className="mb-4">
          <span className="px-2 py-1 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">SMSU</span></a>
        <a href="https://drive.google.com/drive/folders/1-3bbIHutFfk8lAakRBHi8bNefI57MU5p" className="mb-4">
          <span className="px-2 py-1 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">SK Shared Materials</span></a>
      </div>
      <div className="w-[100%] h-[1px] bg-black dark:bg-white"></div>
      <div className="mt-4">
        {cardsetObjects}
      </div>
      <footer className='mt-8 flex flex-col w-auto items-center justify-center'>
        <div className="w-[100%] h-[1px] my-2 bg-black dark:bg-white"></div>
        <div className='mb-3 pixellet'>@SELECard 2024 by Pinkshepz</div>
      </footer>
    </main>
  )
}
