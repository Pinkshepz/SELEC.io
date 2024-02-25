'use client'

import Link from 'next/link';
import DisplayCard from '@/app/components/displaycard';
import { useState } from 'react';

export default function CourseContentDisplay({
  courseData,
  contentData
}: {
  courseData: {[key: string]: string},
  contentData: Array<{}>
}) {

  // Search bar value
  const [searchKey, setSearchKey] = useState("");

  // Data structure for this page
  const contentDataByTopics: {[key: string]: Array<{[key: string]: any}>} = {};

  // Sort cardsets by its topic group
  for (let index = 0; index < contentData!.length; index++) {
    // Each course data
    const element: {[key: string]: any} = contentData![index];
    // Create combination of all course information for search target
    const search_target = element["ID"] + " " + element["Group"] + " " + element["Block"] + " " + element["Title"];

    // Check if data matches to searchkey
    if (search_target.toLowerCase().includes(searchKey.toLowerCase())) {
      // Sort courseDisplayData cards by its topics
      if (contentDataByTopics[element["Group"]] == undefined) {
          contentDataByTopics[element["Group"]] = [element];
      } else {
          contentDataByTopics[element["Group"]].push(element);
      }
    }
  }

  // Store all elements
  let pageElements: Array<React.ReactNode> = [];

  // Store all courses
  let courseElements: Array<React.ReactNode> = [];

  pageElements.push(
      <section className="-cover-nav absolute top-0" key={"section1"}>
        <img src={courseData["ImageLink"]} alt=""
          className="z-[-10] h-full w-full object-cover" width={7000} height={4000} />
      </section>
  );

  pageElements.push(
      <section className="h-[30dvh]" key={"section2"}>
      </section>
  );

  // Start from topic
  for (let index = 0; index < Object.keys(contentDataByTopics).length; index++) {
    const topic = Object.keys(contentDataByTopics)[index];
    // Topic header
    courseElements.push(
      <h2 className="sticky my-2 px-4" key={`heading ${topic}`}>{topic}</h2>
    );

    // Store course with a particular topic group
    let courseElementsSingleTopic: Array<React.ReactNode> = [];

    // Map contentData into each card
    contentDataByTopics[topic]?.map((contentDataEach) => {
        courseElementsSingleTopic.push(
          <Link 
              href={{ pathname: "/course/[courses]/[contents]" }}
              as={`/course/${contentDataEach["Course"]}/${contentDataEach["ID"]}`}
              key={contentDataEach["ID"]}>
              <DisplayCard 
                  cardId={contentDataEach["ID"]}
                  cardImageLink={contentDataEach["ImageLink"]}
                  cardTitle={contentDataEach["Title"]}
                  cardDescription={contentDataEach["Description"]}
                  key={contentDataEach["ID"]}/>
          </Link>
        );
    });

    // Display grid full screen
    courseElements.push(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1" key={`group ${topic}`}>
        {courseElementsSingleTopic}
      </div>
    );
  }

  pageElements.push(
    <section className='z-0' key={"section3"}>
      <div className='flex flex-col z-10'>
        <div className='h-16'></div>
        <div className='px-4 pt-2 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md'>
          <h1 className='text-4xl'>{courseData["Title"]}</h1>

          <div className="flex flex-row z-0 my-4 items-center text-lg md:text-xl rounded-xl">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 text-neutral-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input
              type="text" 
              placeholder="Search contents"
              onChange={e => setSearchKey(e.target.value)}
              className="w-40 focus:w-[50vw] transition-all ease-in-out duration-500"/>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-black" key={"course_display"}>
          {courseElements}
      </div>
    </section>
  );

  return pageElements;
}
