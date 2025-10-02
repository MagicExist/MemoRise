import api from "../api/axios";
import type { Deck } from "../types/deck";

// Fetch all decks
export const getDecks = async (): Promise<Deck[]> => {
  const response = await api.get<Deck[]>("/decks/");
  return response.data;
};

export const createDeck = async (payload: { title: string; color: string }): Promise<Deck> => {
  const response = await api.post<Deck>("/decks/", payload);
  return response.data;
};

export const deleteDeck = async (deckId: number): Promise<void> => {
  await api.delete(`/decks/${deckId}/`);
};

export const updateDeck = async (id: number, payload: { title: string; color: string }): Promise<Deck> => {
  const response = await api.put<Deck>(`/decks/${id}/`, payload);
  return response.data;
};