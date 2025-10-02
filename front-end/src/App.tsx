import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/AuthComponents/Login";
import Registration from "./components/AuthComponents/Registration";
import MainPanel from "./components/DeckComponents/MainPanel"
import DeckDetail from "./components/DeckComponents/DeckDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para login (pantalla principal) */}
        <Route path="/" element={<Login />} />

        {/* Ruta para registro */}
        <Route path="/register" element={<Registration />} />

        {/* Panel with all decks */}
        <Route path="/mainpanel" element={<MainPanel/>} />

        <Route path="/decks/:deckId" element={<DeckDetail/>} />
      </Routes>
    </Router>
  );
}
export default App;
