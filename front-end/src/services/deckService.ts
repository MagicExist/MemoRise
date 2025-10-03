import api from "../api/axios";
import type { Deck } from "../types/deck";

/**
 * Fetch all decks that belong to the authenticated user
 * @returns List of decks
 */
export const getDecks = async (): Promise<Deck[]> => {
  const response = await api.get<Deck[]>("/decks/");
  return response.data;
};

/**
 * Create a new deck
 * @param payload - Object containing title and color
 * @returns The newly created deck
 */
export const createDeck = async (payload: { title: string; color: string }): Promise<Deck> => {
  const response = await api.post<Deck>("/decks/", payload);
  return response.data;
};

/**
 * Delete an existing deck
 * @param deckId - The ID of the deck to delete
 */
export const deleteDeck = async (deckId: number): Promise<void> => {
  await api.delete(`/decks/${deckId}/`);
};

/**
 * Update an existing deck
 * @param id - The ID of the deck to update
 * @param payload - Object containing new title and/or color
 * @returns The updated deck
 */
export const updateDeck = async (
  id: number,
  payload: { title: string; color: string }
): Promise<Deck> => {
  const response = await api.put<Deck>(`/decks/${id}/`, payload);
  return response.data;
};
