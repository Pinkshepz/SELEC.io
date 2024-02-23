import { getGoogleSheetProps } from '../utils/ggsheet';

export async function courseDataFetcher() {
    // Get data from GG Sheet api
    const courseDisplayDataRaw = await getGoogleSheetProps({
        ref: 'course',
        sheetName: "COURSE",
        rangeName: "A1:F"
      });
    
    return Object.values(courseDisplayDataRaw!);
}
    