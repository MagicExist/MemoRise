import api from "../api/axios";
import type { Flashcard } from "../types/flashcard";

// fetch flashcards for a given deck
export const getFlashcardsByDeck = async (deckId: number): Promise<Flashcard[]> => {
  const response = await api.get<Flashcard[]>(`/decks/${deckId}/flashcards/`);
  return response.data;
};
