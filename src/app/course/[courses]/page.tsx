import CardsetDisplay from './cardsetDisplay';
import NotFound from '../../components/not_found';
import { getGoogleSheetProps } from '../../utils/ggsheet';
import Footer from '@/app/components/footer';

// Dynamic routing <courses>
export default async function Course({ params }: { params: {courses: string} }) {
  // Get data from GG Sheet api
  const courseDataRaw: any = await getGoogleSheetProps({
    ref: '[courses]',
    sheetName: "COURSE",
    rangeName: "A1:F"
  });

  const courseData = courseDataRaw[params.courses];

  const cardsetDisplayDataRaw: any = await getGoogleSheetProps({
    ref: '[courses]/cardset',
    sheetName: "CARDSET",
    rangeName: "A1:G"
  });

  let cardsetDisplayData: Array<{[key: string]: any}> = [];

  const cardsetKeys = Object.keys(cardsetDisplayDataRaw);
  
  for (let index = 0; index < cardsetKeys.length; index++) {
    const _cardsetId = cardsetKeys[index];
    if (_cardsetId.split("-")[0] == params.courses) {
      cardsetDisplayData.push(cardsetDisplayDataRaw[cardsetKeys[index]]);
    }
  }

  // Sort header & link, and sort cardsets by its topics
  try {     
    // Get cardsetDisplay elements
    const elementCardsetDisplay = await CardsetDisplay({
      cardsetData: cardsetDisplayData
    });
  
    return (
      <div className="flex min-h-screen flex-col">
        <img src={courseData.ImageLink} alt="image" className="object-cover h-[24vh] md:h-[36vh] w-[100vw]" height={840} width={840} />
        <div className='bg-white dark:bg-black'>
          <div className="px-4 mb-8 z-0">
            <h1 className='text-3xl mt-8 mb-3'>
              {courseData.Title}
            </h1>
            <p className="mb-4">
              {courseData.Description}
            </p>
            <div>
              <span className="-text-line mr-2 after:bg-black dark:after:bg-white">
                  {courseData.Group}
              </span>
              <span className="-text-line mr-2 after:bg-black dark:after:bg-white">
                  {"BLOCK " + courseData.Block}
              </span>
            </div>
          </div>
          <div>
              {elementCardsetDisplay}
          </div>
        </div>
        <Footer />
      </div>
    )
  } catch (error) {
    return <NotFound />;
  }
}
