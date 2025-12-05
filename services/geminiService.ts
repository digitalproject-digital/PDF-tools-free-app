import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractTextFromImage = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    // Clean base64 string if it contains the header
    const cleanBase64 = base64Data.split(',')[1] || base64Data;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: "Extract all legible text from this image. Return only the extracted text, preserving layout where possible. If there is no text, reply with 'No text detected'.",
          },
        ],
      },
    });

    return response.text || "No text detected.";
  } catch (error) {
    console.error("Gemini OCR Error:", error);
    throw new Error("Failed to extract text using AI.");
  }
};
