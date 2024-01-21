import { getGoogleSheetProps } from '../../utils/ggsheet';
import NotFound from '../../not_found';
import Cards from './cards';
import { shuffle } from '../../utils/gadgetfx';

export default async function Page ({ params }: { params: {cardsets: string} }) {

    // Fetch data for this dynamic route
    const dataForThisCardset: Array<Array<string>> | null | undefined = await getGoogleSheetProps({ 
        ref: "cardsets",
        sheetName: params.cardsets,
        rangeName: 'A1:I'
    }!)
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
