import { useEffect, useState, useRef } from "react";
import DeckCard from "./DeckCard";
import { getDecks } from "../../services/deckService";
import type { Deck } from "../../types/deck";
import ActionBar from "../ActionBarComponents/ActionBar";
import DeckForm from "./DeckForm";
import DeckEdit from "./DeckEdit";
import { FaTimes } from "react-icons/fa";
import CreateFlashCard from "../FlashCardComponents/CreateFlashCard";
import Navbar from "../Navbar/Navbar"; // 👈 importa tu navbar

const MainPanel = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [showFlashForm, setShowFlashForm] = useState(false);

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

  const handleAddDeck = (newDeck: Deck) => {
    setDecks((prev) => [...prev, newDeck]);
    setShowForm(false);
  };

  const handleUpdateDeck = (updatedDeck: Deck) => {
    setDecks((prev) =>
      prev.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
    );
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-700 text-white">
      {/* 👇 Navbar arriba */}
      <Navbar />

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h2 className="text-5xl font-bold text-gray-50 mb-6">Deck Panel</h2>

          {loading ? (
            <p className="text-gray-200">Loading decks...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
              {decks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  id={deck.id}
                  title={deck.title}
                  color={deck.color}
                  onDelete={() => handleDeleteDeck(deck.id)}
                  onEdit={() => {
                    setSelectedDeck(deck);
                    setShowEdit(true);
                  }}
                  showOptions={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ActionBar */}
      <ActionBar
        onCreateDeck={() => setShowForm(true)}
        onCreateFlashcard={() => setShowFlashForm(true)}
      />

      {/* CreateFlashCard modal */}
      {showFlashForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="relative flex justify-center bg-[#1E1E1E]/25 backdrop-blur-lg border border-white/10 p-7 rounded-xl shadow-xl w-220 h-125">
            <CreateFlashCard onCreated={() => setShowFlashForm(false)} />
            <button
              onClick={() => setShowFlashForm(false)}
              className="absolute top-3 right-3 p-2 rounded-full text-gray-300 hover:text-purple-500 hover:bg-purple-500/20 cursor-pointer transition transform hover:scale-110"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Edit deck modal */}
      {showEdit && selectedDeck && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="relative bg-[#1E1E1E]/25 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-xl w-250 h-125">
            <DeckEdit deck={selectedDeck} onUpdated={handleUpdateDeck} />
            <button
              onClick={() => setShowEdit(false)}
              className="absolute top-3 right-3 p-2 rounded-full text-gray-300 hover:text-purple-500 hover:bg-purple-500/20 cursor-pointer transition transform hover:scale-110"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Create deck modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="relative bg-[#1E1E1E]/25 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-xl w-250 h-125">
            <DeckForm onCreated={handleAddDeck} />
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 p-2 rounded-full text-gray-300 hover:text-purple-500 hover:bg-purple-500/20 cursor-pointer transition transform hover:scale-110"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPanel;
