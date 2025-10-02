import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;      // the icon element (e.g. <FaPlusSquare />)
  onClick?: () => void;       // handler when button is clicked
  label?: string;             // optional text for accessibility / tooltip
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="text-white hover:text-purple-400 transform transition duration-200 ease-in-out hover:scale-115 hover:-translate-y-2 hover:cursor-pointer"
    >
      {icon}
    </button>
  );
};

export default ActionButton;
