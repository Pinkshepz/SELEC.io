'use client'

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DisplayCard from '@/app/course/displaycard';
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
      [key: string]: { // RECALL, PRACTICE, SUPERSTAR
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
    // Sub-element
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
      
      Object.values(sectionData).map((topic, index) => {
        if (index > 0) sectionTree.push(<div id='divider-inside'></div>);

        sectionTree.push(
          <li
            className='cursor-pointer flex flex-row items-start px-2 py-1.5 transition-all ease-in-out duration-500 hover:bg-black/10 dark:hover:bg-white/10'
            id='small-p'
            key={topic.Topic}
            onClick={e => scrollToRef(topic.refKey)}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
              </svg>
            </span>
            <span className='mt-0.5'>
              {topic.Topic}
            </span>
          </li>);
      })

      return (
        <ul id='card-main'>
          {sectionTree}
        </ul>
      );
    }

    // Structure
    let courseTree: React.ReactNode[] = [];

    // Map
    Object.values(courseSectionData).map((sectionData) => {
      courseTree.push(
        <h5 className='my-4' key={sectionData.metadata.sectionName.data}>
          {sectionData.metadata.sectionName.data}
        </h5>
      );
      courseTree.push(
        <SectionEnumerator sectionData={sectionData.sectionTopics} />
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

    // Map resources
    topicData.PracticeRef && resources.push(
      <Link 
        href={{ pathname: "./course/[courses]/[contents]" }}
        as={`/course/${courseData["ID"]}/${topicData.PracticeRef}`}
        className='chip-sm-pri px-2 sm:px-0' id='chip-sm' key={topicData.PracticeRef}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1.5 hidden sm:inline">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
        <div className='flex flex-row'>
          <span>Practice</span>
          <span className='flex items-center justify-center mx-0.5'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>
          </span>
          <span>{topicData.PracticeRef}</span>
        </div>
      </Link>
    );

    for (let ref_num = 1; true; ref_num++) {
      // Check avaliability of resource
      if (((topicData["ResourceName" + ref_num] !== undefined) && (topicData["ResourceLink" + ref_num] !== undefined)) === true) {
        resources.push(
          <div className='chip-sm-ter px-2 sm:px-0' id='chip-sm' key={topicData["ResourceLink" + ref_num]}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1.5 hidden sm:inline">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            <a href={topicData["ResourceLink" + ref_num]} target='_blank'>{topicData["ResourceName" + ref_num]}</a>
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
        <div className='flex flex-row'>
          <span id='chip-md'>{topicData.ID.split('-')[2]}</span>
          <h4 className='pt-[0.5px]'>{topicData.Topic}</h4>
        </div>
        <p className='mt-3'>{topicData.Description}</p>
        <div className='flex flex-row gap-2 mt-4'>
          {resources}
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
      [key: string]: { // RECALL, PRACTICE, SUPERSTAR
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
          contentData={contentData && contentData.RECALL[topic]}
          key={topic}/>
      )
    }
    );

    // Map stars
    if (contentData !== undefined) {
      for (const stargroup of [
        ...Object.values(contentData.PRACTICE), 
        ...Object.values(contentData.SUPERSTAR)]) {

        Object.values(stargroup).map((star) => 
          stars.push(
            <Link 
              href={{ pathname: "./course/[courses]/[contents]" }}
              as={`/course/${courseData["ID"]}/${star["Ref"]}`}
              className='flex flex-col' id='card-main' key={star.ID}>
              <img src={star.ImageLink} alt="" className='h-48 object-cover' />
              <div className='p-3'>
                <h4 className='mb-2'>{star.Title}</h4>
                <p className='mb-3'>{star.Description}</p>
                <div className='flex flex-wrap items-center gap-2'>

                  <div className={((star.Category == 'SUPERSTAR') ? 'chip-sm-sec' : 'chip-sm-pri') + ' px-2 sm:px-0'} id='chip-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 mr-1.5 inline">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                    <div className='flex flex-row'>
                      <span>{star.Category}</span>
                      <span className='flex items-center justify-center mx-0.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{star.Ref}</span>
                    </div>                    
                  </div>

                  <p className='ml-1'>
                    {star.Members} Questions
                  </p>
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
        [key: string]: { // RECALL, PRACTICE, SUPERSTAR
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
            <h3 className='mt-1'>{courseData["Title"]}</h3>
            <p className='mt-3'>{courseData["Description"]}</p>
          </section>

          <section className='mt-3' key='interface-aside-section-2'>
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
