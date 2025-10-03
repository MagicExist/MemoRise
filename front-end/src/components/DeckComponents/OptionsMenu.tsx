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

  // ✅ Close dropdown if user clicks outside
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

  // ✅ Delete deck and notify parent
  const handleDelete = async () => {
    try {
      await deleteDeck(deckId);
      if (onDelete) onDelete();
    } finally {
      setOpen(false);
    }
  };

  // ✅ Edit deck and notify parent
  const handleEdit = () => {
    if (onEdit) onEdit();
    setOpen(false);
  };

  // ✅ Navigate to deck details
  const handleDetails = () => {
    navigate(`/decks/${deckId}`);
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Three dots button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:bg-white/10"
      >
        <img src={ThreeDotsIcon} alt="options" className="w-6 h-6" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-[#1F1F2E] rounded-md shadow-lg ring-1 ring-black/10 z-10">
          <ul className="py-1 text-sm text-gray-200">
            <li
              onClick={handleDetails}
              className="px-4 py-2 hover:bg-blue-600 cursor-pointer"
            >
              📂 Details
            </li>
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
