interface DeckCardProps {
  title: string;
  description?: string;
  color?: string;
}

const DeckCard = ({ title, description, color = 'blue' }: DeckCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    red: 'bg-red-500 hover:bg-red-600',
    teal: 'bg-teal-500 hover:bg-teal-600'
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition duration-200 cursor-pointer transform hover:scale-105`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-blue-100">{description}</p>}
    </div>
  );
};

export default DeckCard;