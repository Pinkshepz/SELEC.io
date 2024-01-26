import Link from "next/link";

import Hero from "./components/hero";
import Footer from "./components/footer";
import NotFound from "./components/not_found";

import { getGoogleSheetProps } from "./utils/ggsheet";
import { arrayOfArrayToObject } from "./utils/gadgetfx";

export default async function HomePage() {
    const homeDataArr: Array<Array<any>> | undefined | null = await getGoogleSheetProps({
        ref: "homepage",
        sheetName: "PANEL",
        rangeName: "A1:B"
    });

    if ((homeDataArr != undefined) || (homeDataArr != null)) {
        const homeDataObj = arrayOfArrayToObject(homeDataArr);

        return (
          <div className="flex flex-col">
    
            {/* Section 1: Hero */}
    
            <section className="-section-1 flex flex-col items-center justify-start">
                <Hero props={homeDataObj} />
            </section>
    
            {/* Section 2: Content - Courses */}
    
            <section className="flex flex-col px-4 py-16 items-center justify-center border-b border-slate-800/10 dark:border-slate-50/40">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-8">
                    {homeDataObj.s1_title}</div>
                <div className="flex flex-col items-center content-center text-center">
                    <Link href={'./course'} className="text-xl px-4 py-2 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                        {homeDataObj.s1_button}
                    </Link>
                </div>
            </section>

            {/* Section 3: Content - Library */}
    
            <section className="flex flex-col px-4 py-16 items-center justify-center border-b border-slate-800/10 dark:border-slate-50/40">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-8">
                    {homeDataObj.s2_title}</div>
                <div className="flex flex-col items-center content-center text-center">
                    <Link href={'./course'} className="text-xl px-4 py-2 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                        {homeDataObj.s2_button}
                    </Link>
                </div>
            </section>
    
            {/* Section 3: Footer */}
    
            <section className="flex flex-col px-4">
                <Footer />
            </section>
          </div>
        )
    } else return <NotFound />

  
}
