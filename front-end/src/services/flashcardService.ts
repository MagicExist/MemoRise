import api from "../api/axios";
import type { Flashcard,FlashcardCreate } from "../types/flashcard";

// fetch flashcards for a given deck
export const getFlashcardsByDeck = async (deckId: number): Promise<Flashcard[]> => {
  const response = await api.get<Flashcard[]>(`/decks/${deckId}/flashcards/`);
  return response.data;
};

// Create flashcard
export const createFlashcard = async (payload: FlashcardCreate): Promise<Flashcard> => {
  const response = await api.post<Flashcard>("/flashcards/", payload);
  return response.data;
};

export const updateFlashcard = async (id: number, data: Partial<Flashcard>): Promise<Flashcard> => {
  const response = await api.put<Flashcard>(`/flashcards/${id}/`, data);
  return response.data;
};

export const reviewFlashcard = async (
  id: number,
  answer: "again" | "good" | "easy"
): Promise<Flashcard> => {
  const response = await api.post<Flashcard>(`/flashcards/${id}/review/`, {
    answer, // 👈 lo único que necesita el backend
  });
  return response.data;
};

// Fetch flashcards available for study (new + due)
export const getStudyCards = async (deckId?: string): Promise<Flashcard[]> => {
  const url = deckId ? `/flashcards/study/?deck=${deckId}` : "/flashcards/study/";
  const response = await api.get<Flashcard[]>(url);
  return response.data;
};