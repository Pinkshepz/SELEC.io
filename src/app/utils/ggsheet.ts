import { google } from 'googleapis';

async function getServerSideProps({
    ref,
    sheetName,
    rangeName
}: { 
    ref: string,
    sheetName: string,
    rangeName: string
}) {
    // Function for fetching server-side data from GG Sheet api
    console.log("-6");
    // Client auth:
        // Local: stores env. variables in .env.local
        // Vercel: stores env. variables in project own env variables
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        credentials: {
            private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n') + '\n',
            client_email: process.env.GOOGLE_CLIENT_EMAIL
        }
    });
    console.log(process.env.GOOGLE_PRIVATE_KEY);
    console.log(auth);

    const sheets = google.sheets({ version: 'v4', auth });
  
    // Query
    const range = `${sheetName}!${rangeName}`;
  
    // Fetch data & error handling
    try {
        // Fetch data from GG Sheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range
        });

        // Result: array of each sheet's row data
        const data = response.data.values;
        
        // Show data status & preview
        console.log(`/START-----GGSHEETAPI at ${ref}-----`);
        console.log(data);
        console.log(`/END-----GGSHEETAPI at ${ref}-----`);
        
        return data;
    } catch (error) {
        // If sheet doesn't exist
        console.log(`googleapi sheet error - not found at ${ref}`);
        return undefined;
    }
}

// Export function
export function getGoogleSheetProps({
    ref,
    sheetName,
    rangeName
}: { 
    ref: string,
    sheetName: string,
    rangeName: string
}) {
    return getServerSideProps({sheetName, rangeName, ref});
}
