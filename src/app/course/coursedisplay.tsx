'use client'

import Link from 'next/link';
import DisplayCard from '../components/displaycard';
import { useState } from 'react';

export default function CourseDisplay({
  courseData
}: {
  courseData: Array<{}>
}) {

  // Search bar value
  const [searchKey, setSearchKey] = useState("");

  // Data structure for this page
  const courseDisplayDataStructure: {[key: string]: Array<{[key: string]: any}>} = {};

  // Sort cardsets by its topic group
  for (let index = 0; index < courseData!.length; index++) {
    // Each course data
    const element: {[key: string]: any} = courseData![index];
    // Create combination of all course information for search target
    const search_target = element["ID"] + " " + element["Group"] + " " + element["Block"] + " " + element["Title"];

    // Check if data matches to searchkey
    if (search_target.toLowerCase().includes(searchKey.toLowerCase())) {
      // Sort courseDisplayData cards by its topics
      if (courseDisplayDataStructure[element["Group"]] == undefined) {
          courseDisplayDataStructure[element["Group"]] = [element];
      } else {
          courseDisplayDataStructure[element["Group"]].push(element);
      }
    }
  }

  // Map cardset data into objects
    // Store all courses
    let courseDisplayAllTopicGroups: Array<React.ReactNode> = [];

  // Store all elements
  let courseDisplayAllElements: Array<React.ReactNode> = [
    <><section className="relative h-[50vh] md:h-[50vw] flex flex-col items-center justify-center overflow-hidden">
      <img src="https://4kwallpapers.com/images/wallpapers/star-trails-night-sky-waterfront-reflection-astronomy-outer-7680x4320-6378.jpg" alt=""
        className="absolute z-[-10] h-full w-full object-cover" />
      <div className="absolute top-0 h-full w-full bg-black/25"></div>
      <div className="absolute bottom-0 h-[15vh] w-full dark:bg-gradient-to-t dark:from-black"></div>
        <div className="flex flex-row items-center justify-center relative w-full">
            <span className="pixellet text-white text-[12vw]">Courses</span>
        </div>
        <div className="z-0 md:max-w-[35vw] p-0.5 mt-8 md:mt-12 items-center justify-center flex flex-row text-lg md:text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mx-2 text-neutral-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text" 
            placeholder="Search courses"
            onChange={e => setSearchKey(e.target.value)}
            className="text-neutral-300 max-w-full"/>
        </div>
    </section>

    {/* Section 2: Display */}
    <section className="flex flex-col items-center md:mx-2">
        {courseDisplayAllTopicGroups}
    </section></>
  ];

  // Start from topic
  for (let index = 0; index < Object.keys(courseDisplayDataStructure).length; index++) {
    const topic = Object.keys(courseDisplayDataStructure)[index];
    // Topic header
    courseDisplayAllTopicGroups.push(
      <h2 className="my-8 px-2 border rounded-xl" key={`heading ${topic}`}>{topic}</h2>
    );

    // Store course with a particular topic group
    let courseDisplaySingleTopicGroup: Array<React.ReactNode> = [];

    // Map courseData into each card
    courseDisplayDataStructure[topic]?.map((courseData) => {
        courseDisplaySingleTopicGroup.push(
            <Link 
                href={{
                    pathname: "./course/[courses]",
                    query: { courses: courseData["ID"] }
                }}
                as={`course/${courseData["ID"]}`}
                key={courseData["ID"]}
            >
                <DisplayCard 
                    cardId={courseData["ID"]}
                    cardGroup={topic}
                    cardCategory={"BLOCK " + courseData["Block"]}
                    cardImageLink={courseData["ImageLink"]}
                    cardTitle={courseData["Title"]}
                    cardDescription={courseData["Description"]}
                    key={courseData["ID"]}/>
            </Link>
        );
    });

    // Display grid full screen
    courseDisplayAllTopicGroups.push(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1" key={`group${topic}`}>
        {courseDisplaySingleTopicGroup}
      </div>
    );
  }

  return courseDisplayAllElements;
}
