import LinksetDisplay from './linksetDisplay';
import CardsetDisplay from './cardsetDisplay';
import NotFound from '../../components/not_found';
import Footer from '../../components/footer';
import { getGoogleSheetProps } from '../../utils/ggsheet';

// Dynamic routing <courses>
export default async function Course({ params }: { params: {courses: string} }) {
  // Get data from GG Sheet api
  const cardsetDisplayData: any = await getGoogleSheetProps({
    ref: '[courses]',
    sheetName: "CARDSET",
    rangeName: "A2:G"
  });

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
      <div className="flex min-h-screen flex-col">
        <img className='-bg-fixed' src={courseStructure['header'][0][4]} alt=''></img>
        <div className='mt-[25vh] bg-white/90 dark:bg-black/85 backdrop-blur-md z-[0]'>
          <div className="px-4 mb-8 z-0">
            <h1 className='text-3xl mt-8 mb-3'>
              {courseStructure['header'][0][5]}
            </h1>
            <p className="mb-8">
              {courseStructure['header'][0][6]}
            </p>
            <div className="flex flex-wrap">
              {elementLinksetDisplay}
            </div>
          </div>
          <div className="px-4">
            <div className="mt-2">
              {elementCardsetDisplay}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return <NotFound />;
  }
}
