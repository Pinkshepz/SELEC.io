import Link from "next/link";

import Hero from "./components/hero";
import Footer from "./components/footer";
import NotFound from "./components/not_found";

import { getGoogleSheetProps } from "./utils/ggsheet";

export default async function HomePage() {
    const homeDataRaw = await getGoogleSheetProps({
        id: null,
        ref: "homepage",
        sheetName: "PANEL",
        rangeName: "A7:G8"
    });
    
    const homeData = homeDataRaw!.METADATA;

    if (homeData != undefined) {

        return (
          <div className="flex flex-col">
    
            {/* Section 1: Hero */}
    
            <section className="sm:h-[100vh] flex flex-col items-center justify-start">
                <Hero homeData={homeData} />
            </section>
    
            {/* Section 2: Content - Courses */}
    
            <section className="flex flex-col px-4 py-16 items-center justify-center border-b border-slate-800/10 dark:border-slate-50/40">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-8">
                    Extract. Exam. Exercise.</div>
                <div className="flex flex-col items-center content-center text-center">
                    <Link href={'./course'} className="text-xl px-4 py-2 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                        Go to Courses    →
                    </Link>
                </div>
            </section>
    
            {/* Section 3: Footer */}
    
            <section className="flex flex-col px-4">
                <Footer />
            </section>
          </div>
        )
    } else {
        return <NotFound />
    }
}
