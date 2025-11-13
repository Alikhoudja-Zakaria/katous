import { GoogleGenAI } from "@google/genai";

/**
 * Lazily initializes and returns the Google Gemini AI Client.
 * This prevents the app from crashing on load if the API key is not available.
 * @returns An instance of the GoogleGenAI client.
 */
const getAiClient = () => {
  // The API key is securely managed by the environment and does not need to be set here.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not found.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Converts an image URL to a base64 encoded string.
 * @param imageUrl The URL of the image to convert.
 * @returns A promise that resolves to the base64 encoded string.
 */
const imageUrlToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // result is a data URL: "data:image/jpeg;base64,..."
        // We only need the base64 part
        const base64data = (reader.result as string).split(',')[1];
        resolve(base64data);
      };
      reader.onerror = (error) => {
        reject(new Error('FileReader error: ' + error));
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching or converting image:", error);
    throw error;
  }
};


/**
 * Generates an artistic description for an image using the Gemini API.
 * @param imageUrl The URL of the artwork image.
 * @returns A promise that resolves to the generated text description.
 */
export const generateArtDescription = async (imageUrl: string): Promise<string> => {
  try {
    const ai = getAiClient(); // Initialize the client on-demand
    const base64ImageData = await imageUrlToBase64(imageUrl);
    
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64ImageData,
      },
    };
    
    const textPart = {
      text: "You are a poetic art critic. Gaze upon this piece of art, which is in a modern anime/manga style. In a single, flowing paragraph, describe the scene. Evoke the mood, interpret the colors, and speculate on the character's story and emotions. Your tone should be elegant and insightful. Do not use markdown formatting.",
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
