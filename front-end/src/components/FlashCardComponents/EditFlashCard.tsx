import React, { useState } from "react";
import type { Flashcard } from "../../types/flashcard";
import { updateFlashcard, deleteFlashcard } from "../../services/flashcardService";

interface EditFlashCardProps {
  flashcard: Flashcard;
  onUpdated?: () => void;   // callback when a flashcard is updated
  onDeleted?: () => void;   // callback when a flashcard is deleted
}

const EditFlashCard: React.FC<EditFlashCardProps> = ({ flashcard, onUpdated, onDeleted }) => {
  const [front, setFront] = useState(flashcard.front);
  const [back, setBack] = useState(flashcard.back);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle flashcard update
  const handleSubmit = async () => {
    if (!front.trim() || !back.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await updateFlashcard(flashcard.id, {
        front,
        back,
        deck: flashcard.deck, // keep the same deck
      });

      if (onUpdated) onUpdated();
    } catch {
      setError("Failed to update flashcard. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle flashcard deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this flashcard?")) return;
    try {
      setLoading(true);
      await deleteFlashcard(flashcard.id);
      if (onDeleted) onDeleted();
    } catch {
      setError("Failed to delete flashcard. Try again.");
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

      {/* Front side input */}
      <label className="block mb-2 text-sm font-medium">Front</label>
      <textarea
        value={front}
        onChange={(e) => setFront(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg bg-[#1F1F2E] text-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={1}
        placeholder="Front"
      />

      {/* Back side input */}
      <label className="block mb-2 text-sm font-medium">Back</label>
      <textarea
        value={back}
        onChange={(e) => setBack(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg bg-[#1F1F2E] text-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={1}
        placeholder="Back"
      />

      {/* Error message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Action buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="px-6 py-3 rounded-md font-semibold text-white 
                     bg-gradient-to-b from-red-600 to-red-700 
                     shadow-[0_0_20px_rgba(220,20,60,0.25)]
                     hover:opacity-90 hover:scale-105 transition-transform 
                     disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>

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
