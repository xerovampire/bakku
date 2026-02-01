import { GoogleGenAI } from "@google/genai";

export const generateAiPlaylist = async (mood: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is missing");
      return "Sorry, I can't access my brain right now to make a playlist.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert DJ for a music app called RhythmoTune. 
      The user is asking for: "${mood}".
      Suggest 5 song titles and artists that fit this mood perfectly.
      Format the output as a simple numbered list. Do not add markdown bolding.
      Keep it brief and cool.`,
    });

    return response.text || "Couldn't generate a playlist at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the musical cosmos right now.";
  }
};