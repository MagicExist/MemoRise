import React, { useState } from "react";
import { createDeck } from "../../services/deckService";
import type { Deck } from "../../types/deck";
import DeckCard from "./DeckCard";

interface DeckFormProps {
  onCreated?: (deck: Deck) => void;
}

// ✅ Predefined colors for deck selection
const colors = ["#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EF4444", "#F43F5E"];

const DeckForm: React.FC<DeckFormProps> = ({ onCreated }) => {
  const [title, setTitle] = useState("Title");
  const [color, setColor] = useState(colors[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle deck creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("⚠️ Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call backend service
      const newDeck = await createDeck({ title, color });

      // Notify parent component
      if (onCreated) onCreated(newDeck);

      // Reset form
      setTitle("Title");
      setColor(colors[0]);
    } catch {
      setError("Error creating deck. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 flex gap-10 w-full h-full items-center justify-center"
    >
      {/* 👈 Deck Preview (left side) */}
      <div className="flex-shrink-0 relative">
        <h2 className="absolute -top-15 text-white text-3xl font-bold">
          New Deck
        </h2>
        <DeckCard
          id={0}
          title={title}
          color={color}
          showOptions={false}
          clickable={false}
        />
      </div>

      {/* 👉 Form Fields (right side) */}
      <div className="flex flex-col gap-6 w-1/3">
        {/* Title input */}
        <div>
          <label className="text-gray-200 text-sm">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 bg-transparent border border-gray-500 rounded text-white focus:outline-none focus:border-purple-500"
            placeholder="Title"
          />
        </div>

        {/* Color picker */}
        <div>
          <label className="text-gray-200 text-sm">Color</label>
          <div className="grid grid-cols-3 gap-3 mt-2 w-1/2">
            {colors.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition ${
                  color === c ? "border-white scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Create button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white py-2 px-6 rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default DeckForm;
