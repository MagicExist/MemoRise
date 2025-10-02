import OptionsMenu from "./OptionsMenu";

interface DeckCardProps {
  id:number;
  title: string;
  color: string;
  onDelete?: () => void; 
  showOptions?: boolean;
}

const DeckCard: React.FC<DeckCardProps> = ({ id,title,color,onDelete,showOptions }) => {
  return (
    <div className="relative group w-65 h-55 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer">
      {/* Base background */}
      <div className={`w-full h-full`} style={{ backgroundColor: color }}/>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-3 left-3">
        <span className="text-white text-2xl font-semibold">{title}</span>
      </div>

      {/* Options Menu (always visible on hover) */}
      {showOptions && (
        <div className="absolute top-3 right-3 hidden group-hover:block">
          <OptionsMenu deckId={id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default DeckCard;