import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlashcardsByDeck } from "../../services/flashcardService"; // 👈 create this
import type { Flashcard } from "../../types/flashcard";

const DeckDetail = () => {
  const { deckId } = useParams<{ deckId: string }>(); // 👈 get :deckId from URL
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        if (!deckId) return;
        const data = await getFlashcardsByDeck(Number(deckId));
        setFlashcards(data);
      } catch (error) {
        console.error("❌ Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [deckId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-700 text-white p-6">
      <h2 className="text-4xl font-bold mb-6">Flashcards</h2>

      {loading ? (
        <p>Loading flashcards...</p>
      ) : flashcards.length === 0 ? (
        <p>No flashcards in this deck yet 📭</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((card) => (
            <div
              key={card.id}
              className="bg-[#1E1E1E]/60 backdrop-blur-lg p-4 rounded-xl shadow-md"
            >
              <p className="text-lg font-semibold">Front:</p>
              <p className="mb-2">{card.front}</p>
              <p className="text-lg font-semibold">Back:</p>
              <p>{card.back}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckDetail;
