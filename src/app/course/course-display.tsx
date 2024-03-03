'use client'

import Image from 'next/image';
import Link from 'next/link';
import DisplayCard from '../components/displaycard';
import { useState } from 'react';
import sky from '../../../public/images/sky.jpeg'

export default function CourseDisplay({
  courseData
}: {
  courseData: Array<{}>
}) {

  // Search bar value
  const [searchKey, setSearchKey] = useState("");

  // Data structure for this page
  const courseDataByTopics: {[key: string]: Array<{[key: string]: any}>} = {};

  // Sort cardsets by its topic group
  for (let index = 0; index < courseData!.length; index++) {
    // Each course data
    const element: {[key: string]: any} = courseData![index];
    // Create combination of all course information for search target
    const search_target = element["ID"] + " " + element["Group"] + " " + element["Block"] + " " + element["Title"];

    // Check if data matches to searchkey
    if (search_target.toLowerCase().includes(searchKey.toLowerCase())) {
      // Sort courseDisplayData cards by its topics
      if (courseDataByTopics[element["Group"]] == undefined) {
          courseDataByTopics[element["Group"]] = [element];
      } else {
          courseDataByTopics[element["Group"]].push(element);
      }
    }
  }

  // Store all elements
  let pageElements: Array<React.ReactNode> = [];

  // Store all courses
  let courseElements: Array<React.ReactNode> = [];

  pageElements.push(
      <section className="relative h-96 md:h-[50vw] flex flex-col items-center justify-center overflow-hidden" key={"sky"}>
        <Image src={sky} alt="" priority={true}
          className="absolute z-[-10] h-full w-full object-cover" width={7000} height={4000} />
        <div className="absolute top-0 h-full w-full bg-black/25"></div>
        <div className="absolute bottom-0 h-[15vh] w-full dark:bg-gradient-to-t dark:from-black"></div>
          <div className="flex flex-row items-center justify-center relative w-full">
              <span className="pixellet text-white text-[16vw] md:text-[12vw]">Courses</span>
          </div>
          <div className="z-0 p-0.5 mt-8 md:mt-12 items-center justify-center flex flex-row text-lg md:text-xl  border rounded-xl">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mx-2 text-neutral-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input
              type="text" 
              placeholder="Search courses"
              onChange={e => setSearchKey(e.target.value)}
              className="text-neutral-300 w-40 focus:w-[50vw] transition-all ease-in-out duration-500"/>
          </div>
      </section>
  );

  // Start from topic
  for (let index = 0; index < Object.keys(courseDataByTopics).length; index++) {
    const topic = Object.keys(courseDataByTopics)[index];
    // Topic header
    courseElements.push(
      <h2 className="my-8 px-2 border rounded-xl" key={`heading ${topic}`}>{topic}</h2>
    );

    // Store course with a particular topic group
    let courseElementsSingleTopic: Array<React.ReactNode> = [];

    // Map courseData into each card
    courseDataByTopics[topic]?.map((courseDataEach) => {
        courseElementsSingleTopic.push(
            <Link 
                href={{ pathname: "./course/[courses]" }}
                as={`course/${courseDataEach["ID"]}`}
                key={"Link" + courseDataEach["ID"]}
            >
                <DisplayCard 
                    cardId={courseDataEach["ID"]}
                    cardGroup={topic}
                    cardCategory={"BLOCK " + courseDataEach["Block"]}
                    cardImageLink={courseDataEach["ImageLink"]}
                    cardTitle={courseDataEach["ID"] + ' ' + courseDataEach["Title"]}
                    cardDescription={courseDataEach["Description"]}
                    key={"Card" + courseDataEach["ID"]}/>
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
    <div className="flex flex-col items-center" key={"course_display"}>
        {courseElements}
    </div>
  );

  return pageElements;
}
