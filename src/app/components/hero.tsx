import Terra from "./terra";

export default function Hero ({ props }: any) {
    return (
        <>
            <div className="pixellet text-6xl sm:text-8xl lg:text-[9rem] mt-[33vh] lg:mt-[25vh] mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                {props.name}
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl mt-4 mb-16 sm:mb-24 md:mb-32 lg:mb-48">
                {props.description}
            </div>
            <div className="-hero-effect border-b border-slate-800/10 dark:border-slate-50/40">
                <div className="-hero-effect-top relative bg-slate-50/[90%] dark:bg-black/[85%] backdrop-blur-[108px]">
                    <Terra />
                </div>
                <div className="-hero-effect-backdrop">
                    <div className="-gradient-a rounded-full bg-indigo-600 dark:bg-indigo-200"></div>
                    <div className="-gradient-b rounded-full bg-indigo-600 dark:bg-indigo-200"></div>
                <div className="relative w-[100%] h-1"></div>
                </div>
            </div>
        </>
    )
}