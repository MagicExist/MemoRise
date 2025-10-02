import React, { useState } from "react";
import type { Deck } from "../../types/deck";
import { updateDeck } from "../../services/deckService";
import DeckCard from "./DeckCard";

interface DeckEditProps {
  deck: Deck; // 👈 required
  onUpdated: (updatedDeck: Deck) => void; // 👈 callback for parent
}

const colors = ["#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EF4444"] as const;

type Color = typeof colors[number];

const DeckEdit: React.FC<DeckEditProps> = ({ deck, onUpdated }) => {
  const [title, setTitle] = useState(deck.title);
  const [color, setColor] = useState<Color>(deck.color as Color);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("⚠️ Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const updatedDeck = await updateDeck(deck.id, { title, color });
      console.log("✅ Deck updated:", updatedDeck);

      onUpdated(updatedDeck); // 👈 notify parent
    } catch (err) {
      console.error("❌ Error updating deck:", err);
      setError("Error updating deck. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 flex gap-10 w-full h-full items-center justify-center"
    >
      {/* Left: Preview */}
      <div className="flex-shrink-0 relative">
        <h2 className="absolute -top-15 text-white text-3xl font-bold">Edit Deck</h2>        
        <DeckCard id={deck.id} title={title} color={color} showOptions={false} clickable={false} />
      </div>

      {/* Right: Edit Form */}
      <div className="flex flex-col gap-6 w-1/3">

        {/* Title */}
        <div>
          <label className="text-gray-200 text-sm">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 bg-transparent border border-gray-500 rounded text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Color Picker */}
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

        {/* Error */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Update Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white py-2 px-6 rounded-lg disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default DeckEdit;
