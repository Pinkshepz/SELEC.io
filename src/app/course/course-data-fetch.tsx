import { getGoogleSheetProps } from '../utils/ggsheet';

export async function courseDataFetcher() {
    // Get data from GG Sheet api
    const courseDisplayDataRaw = await getGoogleSheetProps({
        id: null,
        ref: 'course',
        sheetName: "COURSE",
        rangeName: "A1:H"
      });
    
    return Object.values(courseDisplayDataRaw!);
}
    