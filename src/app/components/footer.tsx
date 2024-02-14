import { getGoogleSheetProps } from "../utils/ggsheet";

export default async function Footer() {
    const footerDataRaw = await getGoogleSheetProps({
        ref: "homepage",
        sheetName: "PANEL",
        rangeName: "A7:G8"
    });
    
    const footerData = footerDataRaw!.METADATA;

    return (
        <footer className='flex flex-col w-auto px-4 items-center justify-center border-t border-slate-800/10 dark:border-slate-50/40"'>
            <div className="flex flex-row w-full justify-between my-3 pixelify">
                <div>{footerData.Name} by Pinkshepz</div>
                <div>{footerData.Version}</div>
            </div>
        </footer>
    );
}
