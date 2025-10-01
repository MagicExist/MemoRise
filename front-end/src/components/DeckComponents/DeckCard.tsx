import React from "react"

type DeckCardProps = {
    title:string;
}

const DeckCard: React.FC<DeckCardProps> = ({title}) => {
    return (
        <div className="relative w-50 h-50 rounded-xl shadow-lg overflow-hidden">
            {/* Base background */}
            <div className="w-full h-full bg-blue-500" />

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-3 left-3">
                <span className="text-white text-2xl font-semibold">{title}</span>
            </div>
        </div>
    )
}

export default DeckCard