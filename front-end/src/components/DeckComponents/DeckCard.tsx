import { useNavigate } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";

interface DeckCardProps {
  id: number;
  title: string;
  color: string;
  onDelete?: (id: number) => void;
  onEdit?: () => void;
  showOptions?: boolean;
  clickable?: boolean; // 👈 default is true
  to?: string; // 👈 optional custom navigation path
}

const DeckCard: React.FC<DeckCardProps> = ({
  id,
  title,
  color,
  onDelete,
  onEdit,
  showOptions = true,
  clickable = true,
  to, // e.g. `/decks/${id}/flashcards`
}) => {
  const navigate = useNavigate();

  // ✅ Handle card click (navigate to deck route)
  const handleCardClick = () => {
    if (!clickable) return;
    navigate(to ?? `/decks/${id}/study`, {
      state: { color, title }, // pass props to deck detail
    });
  };

  // ✅ Allow keyboard navigation (Enter or Space)
  const handleKey = (e: React.KeyboardEvent) => {
    if (!clickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : -1}
      onClick={handleCardClick}
      onKeyDown={handleKey}
      className="relative group w-65 h-55 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer"
      aria-label={`Open deck ${title}`}
    >
      {/* Base background */}
      <div className="w-full h-full" style={{ backgroundColor: color }} />

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      {/* Deck title */}
      <div className="absolute bottom-3 left-3">
        <span className="text-white text-2xl font-semibold">{title}</span>
      </div>

      {/* Options menu (stops navigation when clicked) */}
      {showOptions && (
        <div
          className="absolute top-3 right-3 hidden group-hover:block"
          onClick={(e) => e.stopPropagation()} // prevent navigation
          onKeyDown={(e) => e.stopPropagation()}
        >
          <OptionsMenu
            deckId={id}
            onEdit={onEdit}
            onDelete={() => onDelete?.(id)}
          />
        </div>
      )}
    </div>
  );
};

export default DeckCard;
