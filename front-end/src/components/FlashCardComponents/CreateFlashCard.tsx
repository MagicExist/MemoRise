import React, { useState } from "react";

const CreateFlashCard: React.FC = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState("");

  // Auto resize textareas
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  // Handle submit (send data)
  const handleSubmit = () => {
    if (!front.trim() || !back.trim() || !deck.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    const newCard = {
      front,
      back,
      deck,
    };

    console.log("📩 Sending card:", newCard);

    // TODO: Replace with your Axios request
    // axios.post("/api/flashcards", newCard)

    // Reset form after submission
    setFront("");
    setBack("");
    setDeck("");
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-[#1E1E2F] to-[#111111] p-6 rounded-2xl text-white shadow-[0_0_20px_rgba(138,43,226,0.25)]">
      <h2 className="text-2xl font-semibold mb-6">New Card</h2>

      {/* Front field */}
      <label className="block mb-2 text-sm font-medium">Front</label>
      <textarea
        value={front}
        onChange={(e) => setFront(e.target.value)}
        onInput={handleInput}
        className="w-full p-3 mb-4 rounded-lg bg-[#1F1F2E] text-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={1}
        placeholder="Front"
      />

      {/* Back field */}
      <label className="block mb-2 text-sm font-medium">Back</label>
      <textarea
        value={back}
        onChange={(e) => setBack(e.target.value)}
        onInput={handleInput}
        className="w-full p-3 mb-6 rounded-lg bg-[#1F1F2E] text-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={1}
        placeholder="Back"
      />

      {/* Select + Button */}
      <div className="flex items-center gap-3">
        <select
          value={deck}
          onChange={(e) => setDeck(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#1F1F2E] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select a deck</option>
          <option value="deck1">Deck 1</option>
          <option value="deck2">Deck 2</option>
          <option value="deck3">Deck 3</option>
        </select>

        <button
          onClick={handleSubmit}
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 font-semibold hover:scale-105 transition-transform"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CreateFlashCard;
