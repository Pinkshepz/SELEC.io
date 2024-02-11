import Terra from "./terra";

export default function Hero ({ homeData }: any) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-96 sm:h-full overflow-hidden">
            <div className="pixellet text-[16vw] md:text-[12vw]">
                {homeData.Name}
            </div>
            <div className="text-[3vw]">
                {homeData.Description}
            </div>
            <div className="-hero-effect border-b border-slate-800/10 dark:border-slate-50/40">
                <div className="-hero-effect-top sm:h-[100vh] relative bg-slate-50/[80%] dark:bg-black/[80%] backdrop-blur-[128px]">
                    <Terra />
                </div>
                <div className="-hero-effect-backdrop sm:h-[100vh]">
                    <div className="-gradient-a rounded-full bg-indigo-600 dark:bg-indigo-200"></div>
                    <div className="-gradient-b rounded-full bg-indigo-600 dark:bg-indigo-200"></div>
                <div className="relative w-[100%] h-1"></div>
                </div>
            </div>
        </div>
    )
}