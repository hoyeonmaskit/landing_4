import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Google Spreadsheet Configuration - Using your environment variables
const SPREADSHEET_ID = process.env.BETA_SIGNUP_SPREADSHEET_ID || '1wzmT0aTmQQNbkXmvfwOPh7oWdEunrKoqHh687uiGDtI';
const SHEET_ID = '0'; // Default to first sheet
// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Add the API key constant

// Email Configuration - Using your Gmail configuration from .env.local
const EMAIL_FROM = process.env.GMAIL_USER || 'maskit.public@gmail.com';
const EMAIL_TO = process.env.ADMIN_EMAIL || 'hoyeon.bae@maskit.co.kr';

// Define credential type for type safety
interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  [key: string]: string; // Allow other properties
}

// Get service account credentials from environment variable
let serviceAccountAuth: JWT;
try {
  // Use the credentials from the environment variable instead of a file
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
  }
  
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY) as ServiceAccountCredentials;
  
  // The private key might have escaped newlines that need to be replaced
  const privateKey = credentials.private_key.replace(/\\n/g, '\n');
  
  serviceAccountAuth = new JWT({
    email: credentials.client_email,
    key: privateKey,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
    ],
  });
  
  console.log("Successfully initialized Google service account with email:", credentials.client_email);
} catch (error) {
  console.error('Error initializing Google service account:', error);
  throw new Error('Failed to initialize Google authentication');
}

// Create email transporter using Gmail credentials from .env.local
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.GMAIL_USER || 'maskit.public@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'tgfd lido xzqz frhh', // This is your Gmail app password
  },
});

// Define form data type for better type safety
interface FormData {
  [key: string]: string | number | boolean;
}

// Function to save form data to Google Sheets
async function saveToGoogleSheet(data: FormData): Promise<boolean> {
  try {
    console.log('Starting saveToGoogleSheet with spreadsheet ID:', SPREADSHEET_ID);
    
    // Initialize the Google Spreadsheet with the document ID
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    
    // Add retry logic for loading sheet info
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        console.log(`Attempting to load spreadsheet info (attempt ${retryCount + 1})`);
        await doc.loadInfo();
        console.log('Successfully loaded spreadsheet info:', doc.title);
        break;
      } catch (loadError) {
        retryCount++;
        console.error(`Attempt ${retryCount} failed:`, loadError);
        
        if (retryCount >= maxRetries) {
          throw loadError;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }
    
    // Get the first sheet in the document (or a specific sheet by ID)
    let sheet;
    try {
      sheet = doc.sheetsById[Number(SHEET_ID)];
      if (!sheet) {
        console.log(`Sheet with ID ${SHEET_ID} not found, falling back to first sheet`);
        sheet = doc.sheetsByIndex[0];
      }
      console.log(`Using sheet: "${sheet.title}" (${sheet.sheetId})`);
    } catch (sheetError) {
      console.error('Error accessing sheet:', sheetError);
      throw sheetError;
    }
    
    // Process the data to convert arrays to strings before sending to Google Sheets
    const processedData: Record<string, string | number | boolean> = {
      timestamp: new Date().toISOString(),
    };
    
    // Convert arrays to comma-separated strings
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        processedData[key] = value.join(', ');
      } else {
        processedData[key] = value;
      }
    }
    
    // Log the processed data
    console.log('Attempting to add row with processed data:', processedData);
    
    // Add the processed row to the sheet
    await sheet.addRow(processedData);
    
    console.log('Data saved to Google Spreadsheet successfully');
    return true;
  } catch (error) {
    console.error('Error saving to Google Spreadsheet:', error);
    
    // Log detailed error info if available
    if (error && typeof error === 'object' && 'response' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorResponse = error.response as { status?: number; statusText?: string; data?: any };
      console.error('Google API error details:', {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
        data: errorResponse.data
      });
    }
    
    return false;
  }
}

// Function to send notification email
async function sendEmail(data: FormData): Promise<boolean> {
  try {
    // Format form data for email
    const formDataHtml = Object.entries(data)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join('');
    
    // Email content
    const mailOptions = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: '랜딩 페이지 새로운 문의',
      html: `
        <h1>새로운 문의가 접수되었습니다</h1>
        <div>${formDataHtml}</div>
        <p>제출 시간: ${new Date().toLocaleString('ko-KR')}</p>
      `,
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json() as FormData;
    
    console.log('Received form submission:', formData);
    
    // Save data to Google Spreadsheet
    const spreadsheetResult = await saveToGoogleSheet(formData);
    
    // Send notification email
    const emailResult = await sendEmail(formData);
    
    // Return success response with detailed results
    return NextResponse.json(
      { 
        message: 'Form submitted successfully', 
        spreadsheetSaved: spreadsheetResult,
        emailSent: emailResult
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Form submission error:', error instanceof Error ? error.message : String(error));
    
    // Return an error response
    return NextResponse.json(
      { message: 'Error processing form submission', error: String(error) },
      { status: 500 }
    );
  }
}

// You can also add other HTTP methods if needed
export async function GET() {
  // This route doesn't support GET requests
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 } // Method Not Allowed
  );
}
