import api from "../api/axios";

export const generateFlashcardsAI = async (text: string) => {
  const response = await api.post("/ai/flashcards/", { text });
  return response.data.flashcards;
};
