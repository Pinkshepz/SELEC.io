import LinksetDisplay from './linksetDisplay';
import CardsetDisplay from './cardsetDisplay';
import NotFound from '../not_found';
import Footer from '../footer';
import { getGoogleSheetProps } from '../utils/ggsheet';

export default async function Course({ params }: { params: {courses: string} }) {
  // Get data from GG Sheet api
  const cardsetDisplayData: any = await getGoogleSheetProps({
    ref: '[courses]',
    sheetName: "CARDSET",
    rangeName: "A2:F"
  });

  // Show data
  console.log("/START-----cardsetDisplayData-----")
  console.log(cardsetDisplayData)
  console.log("/END-----cardsetDisplayData-----")

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
  try {
    for (let index = 0; index < cardsetDisplayData!.length; index++) {
      // Choose each element of array
      const element = cardsetDisplayData![index];
      
      // Filter if card's course is corresponse to params.courses
      if (element[0] == params.courses) {
        // Check for element type: display data or card data
        switch (element[1]) {
          // Filter header
          case 'HEADER':
            courseStructure['header'].push(element);
            break;
            // Filter link
          case 'LINK':
            courseStructure['link'].push(element);
            break;
            // Others = card data
          default:
            // Sort cardsetDisplayData by its topics
            if (courseStructure['card'][element[2]] == undefined) {
              courseStructure['card'][element[2]] = [element];
            } else {
              courseStructure['card'][element[2]].push(element);
            }
            break;
        }
      }
    }
     
    // Get linksetDisplay & cardsetDisplay elements
    const elementLinksetDisplay = await LinksetDisplay({
      linksetData: courseStructure.link
    });
    const elementCardsetDisplay = await CardsetDisplay({
      cardsetData: courseStructure.card
    });
  
    return (
      <main className="flex min-h-screen flex-col">
        <img className='fixed z-[-100] w-full' src={courseStructure['header'][0][4]} alt=''></img>
        <div className='mt-[25vh] bg-white/95 dark:bg-black/90'>
          <div className="px-4 z-0">
            <p className="pixellet text-3xl mt-12 mb-1">
              {courseStructure['header'][0][5]}
            </p>
            <h1 className="pixellet text-3xl mt-2 mb-6">
              {courseStructure['header'][0][6]}
            </h1>
            <div className="mb-4 flex flex-wrap">
            {elementLinksetDisplay}
            </div>
          </div>
          <div className="px-4">
            {/* <div className="flex flex-row px-2 py-2 mr-2 group rounded-xl transition-colors transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100/75 hover:dark:bg-neutral-800/75">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input className='mx-2 w-full bg-white/0 border border-white/0' type="text" placeholder='Search...' />
            </div> */}
            <div className="mt-4">
              {elementCardsetDisplay}
            </div>
            <Footer />
          </div>
        </div>
      </main>
    )
  } catch (error) {
    return <NotFound />;
  }
}
