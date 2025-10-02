interface DeckCardProps {
title: string;
description?: string;
color?: string;
}

const DeckCard = ({ title, description, color = 'blue' }: DeckCardProps) => {
const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-700',
    amber: 'bg-amber-500 hover:bg-amber-600',
    purple: 'bg-purple-600 hover:bg-purple-700',
    rose: 'bg-rose-500 hover:bg-rose-700',
    red: 'bg-red-500 hover:bg-red-600',
    teal: 'bg-teal-500 hover:bg-teal-700'
};

return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-18 text-white shadow-lg hover:shadow-xl transition duration-200 cursor-pointer transform hover:scale-105`}>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    {description && <p className="text-blue-100">{description}</p>}
    </div>
);
};

export default DeckCard;