const Navbar = () => {
    return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg w-full">
    <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Logo y título a la izquierda */}
        <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">M</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            MemoRise
        </h1>
        </div>

        {/* Botones de navegación al centro */}
        <div className="flex space-x-6">
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200 font-medium">
            Decks
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition duration-200 font-medium">
            Study
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition duration-200 font-medium">
            Stats
        </button>
        </div>

        
    </div>
    </nav>
);
};

export default Navbar;