import api from "../api/axios";
import type { Deck } from "../types/deck";

// Fetch all decks
export const getDecks = async (): Promise<Deck[]> => {
  const response = await api.get<Deck[]>("/decks/");
  return response.data;
};