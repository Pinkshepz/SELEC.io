import { google } from 'googleapis';

import NotFound from './not_found';
import Cards from './cards';

async function getDataForThisCardset({ query }: { query: string }) {
    // Function for fetch server-side data from GG Sheet api
  
    // Auth
    const auth = await google.auth.getClient(
      { scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']}
    );
    const sheets = google.sheets({ version: 'v4', auth });
  
    // Query
    const range = `${query}!A2:I`;
  
    try {
        // Fetch data from GG Sheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range,
            });

        // Result: array of data of each cardset
        const data = response.data.values;
        return data;
    } catch (error) {
        // If sheet doesn't exist
        return undefined;
    }
  }

  function shuffle(array: Array<any>) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export default async function Page ({ params }: { params: {cardsets: string} }) {

    // Fetch data for this dynamic route
    const dataForThisCardset: Array<Array<string>> | null | undefined = await getDataForThisCardset({ query: params.cardsets }!)
    console.log(dataForThisCardset)

    // Get header of this cardset and delete it from dataForThisCardset
    if (dataForThisCardset == undefined) {
        return <NotFound />
    }
    const headerForThisCardSet: Array<string> = dataForThisCardset?.shift()!;

    return (
        <div className='h-[100%]'>
            <div className="flex flex-col h-[100%]">
                <div className='hidden sm:flex flex-row'>
                    <img src={headerForThisCardSet[4]} alt="image" className="rounded-full w-8 h-8 mr-4"></img>
                    <div className='flex flex-col'>
                        <p className="mb-2 pixellet text-lg">{headerForThisCardSet[5]}</p>
                    </div>
                </div>
                <div className='flex flex-col h-[100%] py-4'>
                    <Cards dataForThisCardset={dataForThisCardset} />  
                </div>
            </div>
        </div>
    )
  }
