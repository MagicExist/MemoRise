import { useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import { getDecks } from "../../services/deckService";
import type { Deck } from "../../types/deck";

const MainPanel = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const data = await getDecks();
        setDecks(data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const handleDeleteDeck = (deckId: number) => {
    setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-black from-10% via-black via-40% to-purple-700 to-100%">
      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h2 className="text-5xl font-bold text-gray-50 mb-6">Deck Panel</h2>

          {loading ? (
            <p className="text-gray-200">Loading decks...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
              {decks.map((deck) => (
                <DeckCard key={deck.id} id={deck.id} title={deck.title} color={deck.color} onDelete={()=>handleDeleteDeck(deck.id)}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPanel;