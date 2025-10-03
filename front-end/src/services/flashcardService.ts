import api from "../api/axios";
import type { Flashcard, FlashcardCreate } from "../types/flashcard";

/**
 * Fetch all flashcards that belong to a specific deck
 * @param deckId - The ID of the deck
 * @returns List of flashcards
 */
export const getFlashcardsByDeck = async (deckId: number): Promise<Flashcard[]> => {
  const response = await api.get<Flashcard[]>(`/decks/${deckId}/flashcards/`);
  return response.data;
};

/**
 * Create a new flashcard
 * @param payload - Front, back, and deck reference
 * @returns The newly created flashcard
 */
export const createFlashcard = async (payload: FlashcardCreate): Promise<Flashcard> => {
  const response = await api.post<Flashcard>("/flashcards/", payload);
  return response.data;
};

/**
 * Update an existing flashcard
 * @param id - Flashcard ID
 * @param data - Fields to update (front, back, etc.)
 * @returns The updated flashcard
 */
export const updateFlashcard = async (id: number, data: Partial<Flashcard>): Promise<Flashcard> => {
  const response = await api.put<Flashcard>(`/flashcards/${id}/`, data);
  return response.data;
};

/**
 * Review a flashcard (spaced repetition)
 * @param id - Flashcard ID
 * @param answer - The rating of the answer: "again", "good", or "easy"
 * @returns Flashcard with updated scheduling data
 */
export const reviewFlashcard = async (
  id: number,
  answer: "again" | "good" | "easy"
): Promise<Flashcard> => {
  const response = await api.post<Flashcard>(`/flashcards/${id}/review/`, {
    answer, // only the answer value is needed by the backend
  });
  return response.data;
};

/**
 * Get study-ready flashcards (new + due)
 * @param deckId - Optional deck ID to filter cards
 * @returns List of flashcards ready to be studied
 */
export const getStudyCards = async (deckId?: string): Promise<Flashcard[]> => {
  const url = deckId ? `/flashcards/study/?deck=${deckId}` : "/flashcards/study/";
  const response = await api.get<Flashcard[]>(url);
  return response.data;
};

/**
 * Delete a flashcard
 * @param id - Flashcard ID
 */
export const deleteFlashcard = async (id: number): Promise<void> => {
  await api.delete(`/flashcards/${id}/`);
};
