import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// IMPORTANT: For server-side API routes, use environment variables WITHOUT the NEXT_PUBLIC_ prefix.
// For example, define GEMINI_API_KEY in your .env.local file, not NEXT_PUBLIC_GEMINI_API_KEY.
// If GEMINI_API_KEY is undefined when this file loads, it can cause issues.

export async function POST(request) {
  // Log to the server console to confirm the route is being hit
  console.log('--- API route /api/gemini called! ---');

  // Log the presence of the API key early
  console.log('GEMINI_API_KEY status:', process.env.GEMINI_API_KEY ? 'Present' : 'MISSING');

  try {
    const { message } = await request.json();
    console.log('Received message from frontend:', message);

    // Basic validation for the incoming message
    if (!message) {
      console.log('Error: Message is required. Returning 400.');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check for API key presence before proceeding with Gemini API calls
    if (!process.env.GEMINI_API_KEY) {
      console.error('Error: GEMINI_API_KEY not found in environment variables.');
      return NextResponse.json(
        { error: 'Server API key not configured. Please check your .env.local file and ensure it\'s named GEMINI_API_KEY (without NEXT_PUBLIC_ prefix for server-side use).' },
        { status: 500 }
      );
    }

    // Initialize the Generative AI model with the API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Define the system instruction to give context about your project
    const systemInstruction = `
      You are a helpful assistant designed to answer questions about a specific project.
      Here is a detailed description of the project:

      --- Project Details ---
      YOUR_PROJECT_DESCRIPTION_HERE
      this is a project which is made for mental health safety its name if reflct which means reflect upon your thoughts  and one can log their thoughts about how they feel and what makes them proud 
      or what makes them sad and all the other mood about how the user feels it provides them a mood score using the logic behind and also
      provides the user their mood graph it also provides random images on how user is feeling based on his or her mood ypu can also delete a 
      collection or a particular entry which makes it more interactive and it was made with love and care 
      to write a new entry please click the button on top right which says write new 
      and after you have written your entry you can check it in the collections tab with the open folder icon 
      if user says NO or no just close 
      --- End Project Details ---

      When answering questions, prioritize information from the provided project details.
      If a question is outside the scope of the project, politely state that you can only answer questions related to the project.
    `;

    // --- FIX: Changed model from 'gemini-pro' to 'gemini-1.5-flash' ---
    // Added systemInstruction to the model configuration
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction, // Add the system instruction here
    });
    console.log('Gemini model initialized with gemini-1.5-flash and system instruction. Attempting to generate content...');

    // Generate content using the Gemini model
    const result = await model.generateContent(message);
    console.log('Content generation result received from Gemini.');

    // Access the GenerateContentResponse object
    const apiResponse = result.response; // This is the GenerateContentResponse object, no 'await' needed here.

    // Extract the text content from the GenerateContentResponse.
    // The .text() method returns a Promise, so it needs to be awaited.
    const generatedText = await apiResponse.text();
    console.log('Successfully extracted text from Gemini response.');

    console.log('Final generated response text:', generatedText);

    // Return the generated text as a JSON response to the frontend
    return NextResponse.json({ response: generatedText });

  } catch (error) {
    // Catch any errors that occur during the process
    console.error('--- Caught an error in /api/gemini route ---');
    console.error('Error details:', error);
    // Log the full error stack for more detailed debugging
    console.error('Error stack trace:', error.stack);

    // Return a JSON error response to the frontend
    return NextResponse.json(
      {
        error: 'Failed to generate response from Gemini API.',
        details: error.message || 'An unknown error occurred.',
        // Optionally, include error name for more context
        errorName: error.name || 'UnknownError'
      },
      { status: 500 }
    );
  } finally {
    console.log('--- API route /api/gemini execution finished. ---');
  }
}
