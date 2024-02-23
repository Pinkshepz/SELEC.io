import { getGoogleSheetProps } from '../../utils/ggsheet';

// Dynamic routing <courses>
export async function courseDataFetcher({ course }: { course: string }) {
  // Get data from GG Sheet api
  const courseDataRaw: any = await getGoogleSheetProps({
    ref: '[courses]',
    sheetName: "COURSE",
    rangeName: "A1:F"
  });

  const courseContentDataRaw: any = await getGoogleSheetProps({
    ref: '[courses]/content',
    sheetName: "CARDSET",
    rangeName: "A1:G"
  });

  let courseContentData: Array<{[key: string]: any}> = [];

  // Filter only contents that correspond to current course
  const contentKeys = Object.keys(courseContentDataRaw);
  
  for (let index = 0; index < contentKeys.length; index++) {
    if (contentKeys[index].split("-")[0] == course) {
      courseContentData.push(courseContentDataRaw[contentKeys[index]]);
    }
  }

  return {
    courseData: courseDataRaw[course],
    courseContentData: courseContentData
  }
}
