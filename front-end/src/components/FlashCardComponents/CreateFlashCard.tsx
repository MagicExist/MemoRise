import React, { useState, useEffect } from "react";
import { getDecks } from "../../services/deckService";
import { createFlashcard } from "../../services/flashcardService"; // 👈 new service
import type { Deck } from "../../types/deck";

interface CreateFlashCardProps {
  onCreated?: () => void;
}

const CreateFlashCard: React.FC<CreateFlashCardProps> = ({ onCreated }) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const data = await getDecks();
        setDecks(data);
      } catch (error) {
        console.error("❌ Error fetching decks:", error);
      }
    };
    fetchUserDecks();
  }, []);

  const handleSubmit = async () => {
    if (!front.trim() || !back.trim() || !deck.trim()) {
      setError("⚠️ Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newCard = await createFlashcard({
        front,
        back,
        deck: Number(deck), // send as integer ID
      });

      console.log("✅ Flashcard created:", newCard);

      // Reset form
      setFront("");
      setBack("");
      setDeck("");

      if (onCreated) onCreated(); // close modal or refresh
    } catch (err) {
      console.error("❌ Error creating flashcard:", err);
      setError("Failed to create flashcard. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-200 h-full bg-gradient-to-b from-[#1E1E2F] to-[#111111] p-6 rounded-2xl text-white shadow-[0_0_20px_rgba(138,43,226,0.25)]"
    >
      <h2 className="text-2xl font-semibold mb-6">New Card</h2>

      {/* Front */}
      <label className="block mb-2 text-sm font-medium">Front</label>
      <textarea
        value={front}
        onChange={(e) => setFront(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg bg-[#1F1F2E] text-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={1}
        placeholder="Front"
      />

      {/* Back */}
      <label className="block mb-2 text-sm font-medium">Back</label>
      <textarea
        value={back}
        onChange={(e) => setBack(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg bg-[#1F1F2E] text-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={1}
        placeholder="Back"
      />

      {/* Error */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Select + Button */}
      <div className="flex justify-end gap-3 mt-6">
        <select
          value={deck}
          onChange={(e) => setDeck(e.target.value)}
          className="w-64 p-3 pr-10 rounded-md bg-[#1B1B1B] text-white border border-white/20 
             focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
        >
          <option value="">Select a deck</option>
          {decks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-md font-semibold text-white 
                     bg-gradient-to-b from-[#A855F7] to-[#7C3AED] 
                     shadow-[0_0_20px_rgba(138,43,226,0.25)]
                     hover:opacity-90 hover:scale-105 transition-transform 
                     disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default CreateFlashCard;
