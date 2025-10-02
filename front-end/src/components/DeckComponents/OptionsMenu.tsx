import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThreeDotsIcon from "../../assets/Deck/tree-dots-option.svg";
import { deleteDeck } from "../../services/deckService";

interface OptionsMenuProps {
  deckId: number;
  onDelete?: () => void;
  onEdit?: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ deckId, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDeck(deckId);
      console.log("✅ Deck deleted successfully");

      if (onDelete) {
        onDelete(); //notify parent
      }
    } catch (error) {
      console.error("Error deleting deck:", error);
    } finally {
      setOpen(false); // close the menu after action
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(); // notify parent
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* 3 dots button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:bg-white/10"
      >
        <img src={ThreeDotsIcon} alt="options" className="w-6 h-6" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-[#1F1F2E] rounded-md shadow-lg ring-1 ring-black/10 z-10">
          <ul className="py-1 text-sm text-gray-200">
            <li
              onClick={handleEdit}
              className="px-4 py-2 hover:bg-purple-600 cursor-pointer"
            >
              ✏️ Edit
            </li>
            <li
              onClick={handleDelete}
              className="px-4 py-2 hover:bg-red-600 cursor-pointer"
            >
              🗑️ Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
