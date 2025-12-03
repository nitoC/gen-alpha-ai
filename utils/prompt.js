const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.AI_KEY,
});

async function main(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });
  return response.text;
}

module.exports = main;
