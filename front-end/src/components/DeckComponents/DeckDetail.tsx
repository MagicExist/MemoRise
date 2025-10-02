import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getFlashcardsByDeck } from "../../services/flashcardService";
import type { Flashcard as FlashcardType } from "../../types/flashcard";
import Flashcard from "../../components/FlashCardComponents/Flashcard";

const DeckDetail = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // 👈 initial batch
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 👇 color y título pasados desde DeckCard (MainPanel)
  const location = useLocation();
  const state = location.state as { color?: string; title?: string };

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

  // IntersectionObserver para infinite scroll
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, flashcards.length));
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [flashcards]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-700 text-white p-6">
      <h2 className="text-4xl font-bold mb-6">
        Flashcards {state?.title ? `of ${state.title}` : ""}
      </h2>

      {loading ? (
        <p>Loading flashcards...</p>
      ) : flashcards.length === 0 ? (
        <p>No flashcards in this deck yet 📭</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.slice(0, visibleCount).map((card,idx) => (
              <Flashcard
                key={card.id}
                card={card}
                index={idx}
              />
            ))}
          </div>

          {/* Sentinel para el observer */}
          {visibleCount < flashcards.length && (
            <div ref={observerRef} className="h-10 flex justify-center items-center">
              <p className="text-gray-300">Loading more...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeckDetail;
