import { getGoogleSheetProps } from "../utils/ggsheet";

export default async function Footer() {
    const homeDataArr: Array<Array<any>> | undefined | null = await getGoogleSheetProps({
        ref: "homepage",
        sheetName: "PANEL",
        rangeName: "A1:B"
    });

    return (
        <footer className='flex flex-col w-auto items-center justify-center border-t border-slate-800/10 dark:border-slate-50/40"'>
            <div className="flex flex-row w-full justify-between my-3 pixelify">
            <div>@{homeDataArr![0][1]} 2024 by Pinkshepz</div>
            <div>{homeDataArr![1][1]}</div>
            </div>
        </footer>
    );
}
