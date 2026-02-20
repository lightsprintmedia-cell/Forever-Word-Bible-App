
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const explainVerse = async (verseRef: string, text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the meaning and context of the following Bible verse: ${verseRef}: "${text}". Provide a deep but simple theological reflection and one practical application.`,
      config: {
        systemInstruction: "You are a world-class Bible scholar and compassionate pastor.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Explanation failed:", error);
    return "Could not connect to the Word. Please check your connection.";
  }
};

export const generatePrayer = async (verseRef: string, text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heart-felt prayer based on this scripture: ${verseRef}: "${text}".`,
      config: {
        systemInstruction: "You are a compassionate prayer warrior.",
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Prayer failed:", error);
    return "Could not generate prayer. May God's peace be with you.";
  }
};

export const synthesizeSpeech = async (text: string) => {
  // Utilizing Gemini TTS model if available, otherwise falling back to standard Web Speech API
  // Note: Gemini-2.5-flash-preview-tts is for high-quality audio
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say with a calm, peaceful voice: ${text}` }] }],
      config: {
        responseModalities: ['AUDIO' as any],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (e) {
    console.warn("TTS API failed, using fallback speech synthesis");
    return null;
  }
};
