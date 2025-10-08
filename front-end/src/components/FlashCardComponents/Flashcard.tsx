import React from "react";

interface FlashcardProps {
  card: { front: string; back: string };
  index?: number; // index used to assign a color
}

const Flashcard: React.FC<FlashcardProps> = ({ card, index = 0 }) => {
  // Available front colors
  const frontColors = [
    "#3B82F6", // blue
    "#F59E0B", // amber
    "#10B981", // green
    "#8B5CF6", // purple
    "#EF4444", // red
  ];

  const frontColor = frontColors[index % frontColors.length];

  return (
    <div className="group relative w-full h-48 [perspective:1000px]">
      <div className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
        
        {/* Front side */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden [backface-visibility:hidden]"
          style={{ backgroundColor: frontColor }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl" />
          
          <p className="relative text-xl font-bold text-white text-center px-2">
            {card.front}
          </p>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl shadow-xl 
                     [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, #1E1E2F 0%, #111111 100%)",
          }}
        >
          <p className="text-lg text-white text-center px-2">{card.back}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
