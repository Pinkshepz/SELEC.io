import Link from "next/link";

import Hero from "./components/hero";
import Footer from "./components/footer";

export default async function HomePage() {
  
    return (
      <div className="flex flex-col">

        {/* Section 1: Hero */}

        <section className="flex flex-col items-center justify-start h-screen">
            <Hero />
        </section>

        {/* Section 2: Content - Courses */}

        <section className="flex flex-col mx-4 items-center justify-center">
            <div className="flex flex-col h-full pt-[20vh] items-center content-center text-center">
                <Link href={'./course'} className="text-xl px-4 py-2 mr-2 group rounded-xl border transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600">
                    Courses
                </Link>
            </div>
        </section>

        {/* Section 3: Footer */}

        <section className="flex flex-col mx-4">
            <Footer />
        </section>
      </div>
    )
}
