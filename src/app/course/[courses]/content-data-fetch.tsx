import { getGoogleSheetProps } from '../../utils/ggsheet';

// Dynamic routing <courses>
export async function courseDataFetcher({ course }: { course: string }) {
  // Get data from GG Sheet api
  const courseDataRaw: any = await getGoogleSheetProps({
    ref: '[courses]',
    sheetName: "COURSE",
    rangeName: "A1:Z"
  });

  const courseTopicDataRaw: any = await getGoogleSheetProps({
    ref: '[courses]',
    sheetName: course + "-COURSE",
    rangeName: "A1:Z"
  });

  const courseContentDataRaw: any = await getGoogleSheetProps({
    ref: '[courses]',
    sheetName: course + "-CONTENT",
    rangeName: "A1:Z"
  });

  // Group courseTopicDataRaw
  let courseTopicData: {
    [key: string]: { // SIID256-MB
      [key: string]: { // metadata, sectionTopics
        [key: string]: { // sectionName, SIID256-MB-MB1
          [key: string]: string // data, description
        }
      }
    }
  } = {};

  Object.values(courseTopicDataRaw).map((topic: any, index: number) => {
    const section = topic["ID"].split("-").splice(0, 2).join("-");
    if (courseTopicData[section] === undefined) {
      courseTopicData[section] = {
        metadata: {
          sectionName: {data: topic["Section"]},
          sectionAbb: {data: topic["ID"].split('-')[1]}
        },
        sectionTopics: {
          [topic["ID"]]: {
            ...topic,
            refKey: index
          }
        }
      }
    } else {
      courseTopicData[section].sectionTopics[topic["ID"]] = {
        ...topic,
        refKey: index
      };
    }
  });

  // Group courseContentDataRaw
  let courseContentData: {
    [key: string]: { // SIID256-MB
      [key: string]: { // RECALL, PRACTICE, SUPERSTAR
        [key: string]: { // SIID256-MB-MB1
          [key: string]: { // SIID256-MB-MB1-R1
            [key: string] : string // Content data
          } 
        }
      }
    }
  } = {};

  for (let content of Object.values(courseContentDataRaw) as Array<any>) {
    const content_section_id = content["ID"].split("-").slice(0, 2).join("-");
    const content_topic_id = content["ID"].split("-").slice(0, 3).join("-");
    if (courseContentData[content_section_id] === undefined) {
      courseContentData[content_section_id] = {
        RECALL: {},
        PRACTICE: {},
        SUPERSTAR: {},
      };
    }
    
    if (courseContentData[content_section_id][content["Category"]][content_topic_id] === undefined) {
      courseContentData[content_section_id][content["Category"]][content_topic_id] = {[content["ID"]]: content};
    } else {
      courseContentData[content_section_id][content["Category"]][content_topic_id][content["ID"]] = content;
    }
  }

  return {
    courseData: courseDataRaw[course],
    courseTopicData: courseTopicData,
    courseContentData: courseContentData
  };
}
