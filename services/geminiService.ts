
import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (userMessage: string, history: ChatMessage[]) => {
  const model = "gemini-3-flash-preview";
  
  const menuContext = MENU_ITEMS.map(item => 
    `${item.name} ($${item.price}): ${item.description} (${item.calories} cal)`
  ).join('\n');

  const systemInstruction = `
    You are a friendly and professional AI Barista at "Aroma AI Café". 
    Your tone is sophisticated, welcoming, and helpful, similar to high-end coffee shop service.
    
    Here is our current menu:
    ${menuContext}
    
    Guidelines:
    1. If the user asks for recommendations, suggest items based on their preferences (e.g., sweet, strong, low calorie).
    2. Answer questions about ingredients or calories.
    3. Help the user decide what to order.
    4. Keep responses concise and engaging.
    5. Always refer to our items exactly as they appear in the menu.
    6. If they want to order, tell them they can click the "Add to Cart" button on the item card.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })).concat({ role: 'user', parts: [{ text: userMessage }] }),
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having a little trouble connecting to my coffee knowledge base. How else can I help you?";
  }
};
