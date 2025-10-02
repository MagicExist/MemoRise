import React, { useState } from "react";
import type { Flashcard } from "../../types/flashcard";
import { updateFlashcard } from "../../services/flashcardService";

interface EditFlashCardProps {
  flashcard: Flashcard;
  onUpdated?: () => void;
}

const EditFlashCard: React.FC<EditFlashCardProps> = ({ flashcard, onUpdated }) => {
  const [front, setFront] = useState(flashcard.front);
  const [back, setBack] = useState(flashcard.back);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!front.trim() || !back.trim()) {
      setError("⚠️ Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await updateFlashcard(flashcard.id, {
        front,
        back,
        deck: flashcard.deck, // mantiene el deck
      });

      console.log("✅ Flashcard updated");

      if (onUpdated) onUpdated();
    } catch (err) {
      console.error("❌ Error updating flashcard:", err);
      setError("Failed to update flashcard. Try again.");
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
      <h2 className="text-2xl font-semibold mb-6">Edit Card</h2>

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

      {/* Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-md font-semibold text-white 
                     bg-gradient-to-b from-[#A855F7] to-[#7C3AED] 
                     shadow-[0_0_20px_rgba(138,43,226,0.25)]
                     hover:opacity-90 hover:scale-105 transition-transform 
                     disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditFlashCard;
