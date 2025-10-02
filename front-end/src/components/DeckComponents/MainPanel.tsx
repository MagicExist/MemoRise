import DeckCard from './DeckCard';

const MainPanel = () => {
    const decks = [
        { title: 'English', color: 'blue' },
        { title: 'Portuguese', color: 'amber' },
        { title: 'Math', color: 'purple' },
        { title: 'CyberSecurity', color: 'rose' },
        { title: 'Chess', color: 'red' },
        { title: 'Cook Recipes', color: 'teal' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black from-10% via-black via-40% to-purple-700 to-100%">
            <div className="p-6 flex flex-col items-center">
            
                <div className="w-full max-w-6xl">
                    <h2 className="text-5xl font-bold text-gray-50 mb-6">Deck Panel</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
                        {decks.map((deck, index) => (
                            <DeckCard 
                            key={index}
                            title={deck.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPanel;