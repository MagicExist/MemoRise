// src/components/AI/FlashcardAI.tsx
import React, { useEffect, useState } from "react";
import { generateFlashcardsAI } from "../../services/aiService";
import { getDecks } from "../../services/deckService";
import { createFlashcard } from "../../services/flashcardService";
import Flashcard from "../FlashCardComponents/Flashcard";
import type { Deck } from "../../types/deck";

type Suggestion = {
  front: string;
  back: string;
  _saving?: boolean;
  _saved?: boolean;
};

interface FlashcardAIProps {
  onClose?: () => void; // cerrar modal desde MainPanel
  onSavedAny?: () => void; // callback si se guarda alguna
}

const FlashcardAI: React.FC<FlashcardAIProps> = ({ onClose, onSavedAny }) => {
  const [text, setText] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckId, setDeckId] = useState<number | "">("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingGen, setLoadingGen] = useState(false);
  const [error, setError] = useState("");

  // cargar mazos del usuario
  useEffect(() => {
    (async () => {
      try {
        const data = await getDecks();
        setDecks(data);
        if (data.length > 0) setDeckId(data[0].id);
      } catch {
        setError("No se pudieron cargar tus mazos.");
      }
    })();
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Escribe un tema o un texto.");
      return;
    }
    setError("");
    setLoadingGen(true);
    try {
      const ai = await generateFlashcardsAI(text.trim());
      const clean: Suggestion[] = Array.isArray(ai)
        ? ai
            .filter(
              (x) =>
                x && typeof x.front === "string" && typeof x.back === "string"
            )
            .map((x) => ({ front: x.front, back: x.back }))
        : [];
      if (clean.length === 0) {
        setError("La IA no devolvió sugerencias válidas.");
      }
      setSuggestions(clean);
    } catch (e: any) {
      console.error("❌ Error IA:", e);
      setError(
        e?.response?.status === 429
          ? "⚠️ Se agotó la cuota de IA. Intenta más tarde."
          : "Error generando flashcards."
      );
    } finally {
      setLoadingGen(false);
    }
  };

  const handleSave = async (idx: number) => {
    if (!deckId) {
      setError("Selecciona un mazo antes de guardar.");
      return;
    }
    setError("");
    setSuggestions((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, _saving: true } : s))
    );
    try {
      const s = suggestions[idx];
      await createFlashcard({
        deck: Number(deckId),
        front: s.front,
        back: s.back,
      });
      setSuggestions((prev) =>
        prev.map((s, i) =>
          i === idx ? { ...s, _saving: false, _saved: true } : s
        )
      );
      onSavedAny?.();
    } catch (e) {
      console.error("❌ Error guardando:", e);
      setError("No se pudo guardar la flashcard.");
      setSuggestions((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, _saving: false } : s))
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col text-white">
      <h2 className="text-2xl font-bold mb-4">Agente IA de Flashcards</h2>

      {/* input de texto */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un tema o texto (ej: 'Quiero aprender sobre Python')"
        className="w-full p-2 rounded bg-black/40 border border-white/20 mb-3 text-white"
        rows={3}
      />

      {/* selección de mazo */}
      <select
        value={deckId}
        onChange={(e) => setDeckId(Number(e.target.value))}
        className="p-2 mb-3 rounded bg-black/40 border border-white/20 text-white"
      >
        {decks.map((d) => (
          <option key={d.id} value={d.id}>
            {d.title}
          </option>
        ))}
      </select>

      {/* botón generar */}
      <button
        onClick={handleGenerate}
        disabled={loadingGen}
        className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50 mb-4"
      >
        {loadingGen ? "Generando..." : "Generar Flashcards"}
      </button>

      {error && <p className="text-red-400 mb-3">{error}</p>}

      {/* sugerencias */}
      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2">
          {suggestions.map((card, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <Flashcard card={card} index={idx} />
              <button
                onClick={() => handleSave(idx)}
                disabled={card._saved || card._saving}
                className={`mt-3 px-3 py-1 rounded text-white ${
                  card._saved
                    ? "bg-green-600"
                    : card._saving
                    ? "bg-gray-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {card._saved
                  ? "Guardado ✅"
                  : card._saving
                  ? "Guardando..."
                  : "Guardar"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardAI;
