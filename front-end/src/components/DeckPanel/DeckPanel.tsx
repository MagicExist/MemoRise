import DeckCard from './DeckCard';

const DeckPanel = () => {
  const decks = [
    { title: 'English', color: 'blue' },
    { title: 'Portuguese', color: 'green' },
    { title: 'Math', color: 'purple' },
    { title: 'CyberSecurity', color: 'orange' },
    { title: 'Chess', color: 'red' },
    { title: 'Cook Recipes', color: 'teal' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Deck Panel</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck, index) => (
          <DeckCard 
            key={index}
            title={deck.title}
            color={deck.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DeckPanel;