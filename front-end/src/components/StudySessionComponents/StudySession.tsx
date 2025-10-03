import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Flashcard } from "../../types/flashcard";
import {
  getFlashcardsByDeck,
  reviewFlashcard,
  getStudyCards,
} from "../../services/flashcardService";

const StudySession = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getStudyCards(deckId); // 👈 ahora solo carga las nuevas + due
        setFlashcards(data);
      } catch (error) {
        console.error("❌ Error fetching study cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [deckId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading study session...</p>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#18181B]">
        <p>No flashcards available in this deck 📭</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleAnswer = async (type: "again" | "good" | "easy") => {
    try {
      await reviewFlashcard(currentCard.id, type);
      setShowBack(false);

      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Redirect back to DeckStudy with success message
        navigate(`/decks/${deckId}/study`, {
          state: {
            message:
              "🎉 Congratulations! You have completed the study session.",
          },
        });
      }
    } catch (error) {
      console.error("❌ Error reviewing flashcard:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-700 flex flex-col items-center justify-center text-white p-6">
      <h2 className="text-3xl font-bold mb-8">
        Card {currentIndex + 1} of {flashcards.length}
      </h2>

      {/* Flashcard container */}
      <div className="w-full max-w-md h-64 flex items-center justify-center rounded-2xl shadow-xl bg-[#1E1E2F] p-6 mb-8 text-center">
        {!showBack ? (
          <p className="text-xl font-semibold">{currentCard.front}</p>
        ) : (
          <p className="text-xl">{currentCard.back}</p>
        )}
      </div>

      {/* Buttons */}
      {!showBack ? (
        <button
          onClick={() => setShowBack(true)}
          className="px-8 py-3 rounded-xl text-lg font-bold bg-purple-600 hover:bg-purple-500 shadow-lg transition"
        >
          Show Answer
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer("again")}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-bold shadow-lg"
          >
            🔁 Again
          </button>
          <button
            onClick={() => handleAnswer("good")}
            className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 font-bold shadow-lg text-black"
          >
            👍 Good
          </button>
          <button
            onClick={() => handleAnswer("easy")}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 font-bold shadow-lg"
          >
            💯 Easy
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySession;
