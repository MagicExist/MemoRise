import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Flashcard } from "../../types/flashcard";
import { getFlashcardsByDeck } from "../../services/flashcardService";

const DeckStudy = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const location = useLocation();

  // 👇 includes optional congratulation message
  const state = (location.state as { color?: string; title?: string; message?: string }) || {};

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCards, setNewCards] = useState<Flashcard[]>([]);
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [reviewCards, setReviewCards] = useState<Flashcard[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        if (!deckId) return;
        const data = await getFlashcardsByDeck(Number(deckId));
        setFlashcards(data);

        const now = new Date();

        setNewCards(data.filter((c) => c.status === "new"));
        setDueCards(
          data.filter((c) => c.due_date && new Date(c.due_date) <= now && c.status !== "new")
        );
        setReviewCards(
          data.filter(
            (c) => c.status === "review" && (!c.due_date || new Date(c.due_date) > now)
          )
        );
      } catch (error) {
        console.error("❌ Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [deckId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading study data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-700 text-white p-8">
      {/* 🎉 Success banner */}
      {state.message && (
        <div className="mb-6 p-4 rounded-lg bg-green-600 text-white font-semibold shadow-lg text-center">
          {state.message}
        </div>
      )}

      {/* Title with fallback */}
      <h2 className="text-4xl font-bold mb-6">
        {state.title ?? "Deck"} Study
      </h2>

      {/* Stats */}
      <div
        className="p-6 rounded-2xl shadow-xl mb-10"
        style={{ backgroundColor: state.color ?? "#1E1E1E" }}
      >
        <h3 className="text-3xl font-bold mb-6">Today's Cards</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* New cards */}
          <div className="bg-black/40 p-6 rounded-xl text-center shadow-lg">
            <p className="text-4xl font-bold text-blue-400">{newCards.length}</p>
            <p className="text-gray-300 mt-2 font-bold">New</p>
          </div>

          {/* Due cards */}
          <div className="bg-black/40 p-6 rounded-xl text-center shadow-lg">
            <p className="text-4xl font-bold text-green-400">{dueCards.length}</p>
            <p className="text-gray-300 mt-2 font-bold">Due</p>
          </div>

          {/* Review cards */}
          <div className="bg-black/40 p-6 rounded-xl text-center shadow-lg">
            <p className="text-4xl font-bold text-yellow-400">{reviewCards.length}</p>
            <p className="text-gray-300 mt-2 font-bold">Review</p>
          </div>
        </div>
      </div>

      {/* Start button */}
      <div className="flex justify-center">
        <button
          className="px-12 py-5 rounded-2xl text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 
                     hover:opacity-90 hover:scale-105 transition-transform shadow-lg cursor-pointer"
          onClick={() => navigate(`/decks/${deckId}/session`)}
        >
          ▶️ Start Study
        </button>
      </div>
    </div>
  );
};

export default DeckStudy;
