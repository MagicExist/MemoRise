export type FlashcardStatus = "new" | "learning" | "review" | "lapsed";

export interface Flashcard {
  id: number;                 // PK from Django
  deck: number;               // FK (deck id)
  front: string;              // Question / prompt
  back: string;               // Answer / solution
  created_at: string;         // ISO datetime
  updated_at: string;         // ISO datetime
  due_date: string | null;    // ISO datetime or null
  last_reviewed: string | null; // ISO datetime or null
  interval: number;           // Days until next review
  ease_factor: number;        // Growth multiplier (1.30–5.00)
  streak: number;             // Consecutive correct reviews
  lapses: number;             // Times forgotten
  status: FlashcardStatus;    // Learning stage
}

/**
 * For creating a new Flashcard (POST payload).
 * Backend auto-generates id, timestamps, spaced-repetition fields.
 */
export interface FlashcardCreate {
  deck: number;     // required → deck id
  front: string;    // required
  back: string;     // required
}
