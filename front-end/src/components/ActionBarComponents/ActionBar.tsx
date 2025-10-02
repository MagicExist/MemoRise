import { FaPlusSquare, FaRegStickyNote, FaRobot } from "react-icons/fa";
import ActionButton from "./ActionButton";

interface ActionBarProps {
  onCreateDeck?: () => void;
  onCreateFlashcard?: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onCreateDeck, onCreateFlashcard }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-xl px-6 py-2 flex items-center justify-around gap-6 shadow-lg w-75">
      <ActionButton
        icon={<FaPlusSquare size={25} />}
        label="Create Deck"
        onClick={onCreateDeck} // 👈 hook up
      />
      <ActionButton
        icon={<FaRegStickyNote size={25} />}
        label="Create Flashcard"
        onClick={onCreateFlashcard} // 👈 hook it up
      />
      <ActionButton icon={<FaRobot size={25} />} label="AI Agent" />
    </div>
  );
};

export default ActionBar;
