'use client'

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { searchObjectFilter } from '@/app/utils/gadgetfx';

const ALT_IMAGE = "https://idsb.tmgrup.com.tr/ly/uploads/images/2020/11/11/71386.jpg"

export default function CourseContentDisplay({
  courseData,
  courseTopicData,
  courseContentData
}: {
  courseData: {
    [key: string]: string
  },
  courseTopicData: {
    [key: string]: { // SIID256-MB
      [key: string]: { // metadata, sectionTopics
        [key: string]: { // sectionName, SIID256-MB-MB1
          [key: string]: string // data, description
        }
      }
    }
  },
  courseContentData: {
    [key: string]: { // SIID256-MB
      [key: string]: { // Chip, Card, Banner
        [key: string]: { // SIID256-MB-MB1
          [key: string]: { // SIID256-MB-MB1-R1
            [key: string] : string // Content data
          } 
        }
      }
    }
  }
}) {

  // Search bar value
  const [searchKey, setSearchKey] = useState("");

  // Filter data
  courseTopicData = searchObjectFilter(courseTopicData, searchKey);
  courseContentData = searchObjectFilter(courseContentData, searchKey);

  // Ref for elements
  const elementsRef: {[key: string]: any} = useRef({});

  // Go to ref
  const scrollToRef = (refKey: string) => {
    elementsRef.current[refKey].scrollIntoView({ behavior: 'smooth' });
  }

  const SectionEnumerator = ({
    sectionData
  }: { // SIID256-MB
    [key: string]: { // metadata, sectionTopics
      [key: string]: { // sectionName, SIID256-MB-MB1
        [key: string]: string // data, description
      }
    }
  }) => {
    // Structure
    let sectionTree: React.ReactNode[] = [];
    let sectionKey = '';
    
    Object.values(sectionData).map((topic, index) => {
      if (index > 0) sectionTree.push(<div id='divider-inside' key={topic.refKey + 'div'}></div>);

      sectionKey += topic.Topic;
      
      sectionTree.push(
        <li
          className='cursor-pointer flex flex-row items-start px-2 py-1.5 transition-all ease-in-out duration-500 hover:bg-black/10 dark:hover:bg-white/10'
          id='small-p-ter'
          key={topic.refKey}
          onClick={e => scrollToRef(topic.refKey)}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
          </span>
          <span>
            {topic.Topic}
          </span>
        </li>);
    })

    return (
      <ul id='card-main' key={sectionKey}>
        {sectionTree}
      </ul>
    );
  }

  const SectionTopicEnumerator = ({
    courseSectionData
  }: {
    courseSectionData: {
      [key: string]: { // SIID256-MB
        [key: string]: { // metadata, sectionTopics
          [key: string]: { // sectionName, SIID256-MB-MB1
            [key: string]: string // data, description
          }
        }
      }
    }
  }) => {
    // Structure
    let courseTree: React.ReactNode[] = [];
    
    // Map
    Object.values(courseSectionData).map((sectionData) => {
      courseTree.push(
        <h5 className='my-4' key={'header' + sectionData.metadata.sectionName.data}>
          {sectionData.metadata.sectionName.data}
        </h5>
      );
      courseTree.push(
        <div key={'tree' + sectionData.metadata.sectionName.data}>
          <SectionEnumerator sectionData={sectionData.sectionTopics}/>
        </div>
      );
    })

    return courseTree;
  }

  // Define unit element forweb content
  const MainSectionArticle = ({
    topicData, 
    contentData
  }: {
    topicData: {
      [key: string]: string // description
    },
    contentData?: {
      [key: string]: { // SIID256-MB-MB1-R1
        [key: string] : string // Content data
      } 
    }
  }) => {
    // Structure
    let resources: React.ReactNode[] = [];
    let outcomes: React.ReactNode[] = [];

    // Map practice chip
    topicData.PracticeRef && resources.push(
      <Link 
        href={{ pathname: "./course/[courses]/[contents]" }}
        as={`/course/${courseData["ID"]}/${topicData.PracticeRef}`}
        className='p-1 min-w-max h-fit' id='chip-sm' key={topicData.PracticeRef}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="color-pri w-[26px] h-[26px] hidden sm:inline ml-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
        <div className='flex flex-col mx-2'>
          <h6>Practice {topicData.PracticeMode}</h6>
          <p id='small-p' className='mt-0.5'>{topicData.PracticeRef}</p>
        </div>
      </Link>
    );

    // Map resources
    for (let ref_num = 1; true; ref_num++) {
      // Check avaliability of resource
      if (((topicData["ResourceName" + ref_num] !== '') && (topicData["ResourceLink" + ref_num] !== undefined)) === true) {
        resources.push(
          <a href={topicData["ResourceLink" + ref_num]} target='_blank' 
          className='p-1 min-w-max h-fit' id='chip-sm' key={ref_num + 'resource'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="color-sec w-[28px] h-[28] hidden sm:inline ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
            <div className='flex flex-col mx-2'>
              <h6>{topicData["ResourceName" + ref_num]}</h6>
              <p id='small-p' className='mt-0.5'>External Link</p>
            </div>
          </a>
        );
      } else break;
    }

    // Map outcomes
    for (let ref_num = 1; true; ref_num++) {
      // Check avaliability of resource
      if (((topicData["Outcome" + ref_num] !== undefined) && (topicData["OutcomeDescription" + ref_num] !== undefined)) === true) {
        outcomes.push(
          <div className='flex flex-col p-1 min-w-max h-fit' key={topicData["Outcome" + ref_num]}>
            <div className='flex flex-row items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <h6>{topicData["Outcome" + ref_num]}</h6>
            </div>
            <p id='small-p' className='mt-0.5'>{topicData["OutcomeDescription" + ref_num]}</p>
          </div>
        );
      } else break;
    }

    return (
      <article 
        className='p-3'
        id={topicData.refKey}
        key={topicData.Topic}
        ref={element => elementsRef.current[topicData.refKey] = element}>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <span id='chip-md'>{topicData.ID.split('-')[2]}</span>
            <h4 className='pt-[0.5px]'>{topicData.Topic}</h4>
          </div>
          {[] && <div className='flex flex-wrap gap-2 mt-2'>{outcomes}</div>}
          {[] && <div className='flex flex-wrap gap-2 mt-2'>{resources}</div>}
        </div>
      </article>
    );
  }

  const MainSection = ({
    topicData, 
    contentData
  }: {
    topicData: {
      [key: string]: { // metadata, sectionTopics
        [key: string]: { //sectionName, SIID256-MB-MB1
          [key: string]: string // data, description
        }
      }
    },
    contentData: {
      [key: string]: { // Chip, Card, Banner
        [key: string]: { // SIID256-MB-MB1
          [key: string]: { // SIID256-MB-MB1-R1
            [key: string] : string // Content data
          } 
        }
      }
    }
  }) => {
    // Structure
    let articles: React.ReactNode[] = [];
    let stars: React.ReactNode[] = [];

    // Map articles
    Object.keys(topicData.sectionTopics).map((topic, index) => {
      (index > 0) ? articles.push(<div id='divider-inside' key={topic + index}></div>) : null;
      articles.push(
        <MainSectionArticle 
          topicData={topicData.sectionTopics[topic]}
          contentData={contentData && contentData.Chip[topic]}
          key={topic}/>
      )
    }
    );

    // Map stars
    if (contentData !== undefined) {
      for (const stargroup of [
        ...Object.values(contentData.Card), 
        ...Object.values(contentData.Banner)]) {

        Object.values(stargroup).map((star) => 
          stars.push(
            <Link 
              href={{ pathname: "./course/[courses]/[contents]" }}
              as={`/course/${courseData["ID"]}/${star["Ref"]}`}
              className='-card-hover flex flex-col' id='card-main' key={star.ID}>
              <div className='overflow-hidden'>
                <img src={star.ImageLink} alt="" className='h-48 w-full object-cover' />
              </div>
              <div className='p-3'>
                <p id='small-p'>Special Practice</p>
                <h4 className='mt-2'>{star.Title}</h4>
                <p className='mt-6'>{star.Description}</p>
                <div className="flex flex-row justify-between items-center w-full mt-4">
                  <div className='flex flex-row items-center'>
                    {star.Mode == 'FLASHCARD'
                        ? <span id="chip-action-neu">{star.Mode}</span>
                        : <span id="chip-action-pri">{star.Mode}</span>}
                    <h6 className="flex flex-row gap-1 ml-2">{star.Ref}</h6>
                  </div>
                  <h6 className='ml-1'>
                    {star.Members} Questions
                  </h6>
                </div>

              </div>
            </Link>
          )
        );
      }
    }
  
    return (
      <section className='mb-8' key={topicData.metadata.sectionName.data}>
        <div className='flex flex-row mb-4 items-start sm:items-center'>
          <span id='chip-lg'>{topicData.metadata.sectionAbb.data}</span>
          <h3 className='sm:whitespace-nowrap mr-4'>{topicData.metadata.sectionName.data}</h3>
          <div className='hidden sm:inline' id='divider'></div>
        </div>
        <div className='mb-4' id='card-main'>
          {articles}
        </div>
        <article className='grid md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4'>
          {stars}
        </article>
      </section>
    );
  }

  const Main = ({
    topicData, 
    contentData
  }: {
    topicData: {
      [key: string]: { // SIID256-MB
        [key: string]: { // metadata, sectionTopics
          [key: string]: { //sectionName, SIID256-MB-MB1
            [key: string]: string // data, description
          }
        }
      }
    },
    contentData: {
      [key: string]: { // SIID256-MB
        [key: string]: { // Chip, Card, Banner
          [key: string]: { // SIID256-MB-MB1
            [key: string]: { // SIID256-MB-MB1-R1
              [key: string] : string // Content data
            } 
          }
        }
      }
    }
  }) => {
    // Structure
    let sections: React.ReactNode[] = [];

    // Map 
    for (let section of Object.keys(topicData) as any[]) sections.push(
      <MainSection
        topicData={topicData[section]}
        contentData={contentData[section]}
        key={section}
      />
    );
    
    return (
      <main key='main'>
        {sections}
      </main>
    );
  }

  return (<>
      <div className="fixed" key={courseData["ImageLink"]}>
          <img src={courseData["ImageLink"]} alt={ALT_IMAGE} id='bg-fixed'/>
      </div>
      <div id='two-cols-fixed' key='interface'>

        <aside id="col-scroll-aside" className='-scroll-none' key='interface-aside'>

          <section key='interface-aside-section-1'>
            <span id='chip-lg'>{courseData["ID"]}</span>
            <h3 className='mt-2'>{courseData["Title"]}</h3>
            <p className='mt-6'>{courseData["Description"]}</p>
          </section>

          <section className='mt-6' key='interface-aside-section-2'>
            <div className="flex flex-row items-center w-full">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </span>
                <input
                  type="text" 
                  placeholder="Search courses"
                  onChange={e => setSearchKey(e.target.value)} 
                  className='w-full'/>
              </div>
          </section>

          <section className='mt-2 overflow-y-scroll -scroll-none' key='interface-aside-section-3'>
            <SectionTopicEnumerator courseSectionData={courseTopicData} />
          </section>
        </aside>

        <main id="col-scroll-main" className='-scroll-none' key='interface-main'>
          <Main topicData={courseTopicData} contentData={courseContentData}></Main>
        </main>

      </div>
    </>);
}
