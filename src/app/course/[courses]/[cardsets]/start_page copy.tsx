interface HeaderDataStructure {
    Mission: string,
    QuestionMode: string,
    CardSetName: string,
    CardSetDescription: string,
    CardSetUrl: string,
    QuestionPoolTotal: number,
    TopicCount: { [key: string]: number }
}

export default function StartPage({ 
    headerData
}: {
    headerData: HeaderDataStructure
}) {
    return (
        <div className="flex flex-col">
            <img className='-bg-fixed' src={headerData.CardSetUrl} alt=''></img>
            <div className='mt-[25vh] bg-white/90 dark:bg-black/85 backdrop-blur-md z-[0]'>
                <div className="px-4 mb-8 z-0">
                <h1 className='text-3xl mt-8 mb-3'>
                    {headerData.CardSetName}
                </h1>
                <p className="mb-6">
                    {headerData.CardSetDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex flex-row gap-8">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                            </svg>
                            <div className="ml-2">
                                <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                    Mission
                                </p>
                                <p className="ml-1 mt-1 text-sm">
                                    {headerData.Mission}
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                                <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" />
                            </svg>
                            <div className="ml-2">
                                <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                    Quiz Mode
                                </p>
                                <p className="ml-1 mt-1 text-sm">
                                    {headerData.QuestionMode}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-500">
                            <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                        </svg>
                        <div className="ml-2">
                            <p className="-text-line ml-1 after:bg-slate-700 dark:after:bg-slate-200">
                                Total Question Pool
                            </p>
                            <p className="ml-1 mt-1 text-sm">
                                {headerData.QuestionPoolTotal}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}