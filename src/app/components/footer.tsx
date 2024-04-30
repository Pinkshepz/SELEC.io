import { getGoogleSheetProps } from "../utils/ggsheet";

export default async function Footer() {
    const footerDataRaw = await getGoogleSheetProps({
        id: null,
        ref: "homepage",
        sheetName: "PANEL",
        rangeName: "A7:G8"
    });
    
    const footerData = footerDataRaw!.METADATA;

    return (
        <footer className='flex flex-col w-auto p-4 mt-8 items-center justify-center'>
            <div className="flex flex-row w-full justify-between pixelify">
                <h5>{footerData.Name} #24-15W</h5>
                <h5>{footerData.Version} ({footerData.Date})</h5>
            </div>
        </footer>
    );
}
