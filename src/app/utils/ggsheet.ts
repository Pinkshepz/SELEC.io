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
        
        // Show data status
        // console.log(`-----API 200 - OK AT ${ref}-----`);
        return data;

    } catch (error) {
        // If sheet doesn't exist, show status
        // console.log(`-----API 404 - NOT FOUND AT ${ref}-----`);
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
