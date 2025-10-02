import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/AuthComponents/Login";
import Registration from "./components/AuthComponents/Registration";
import MainPanel from "./components/DeckComponents/MainPanel"
import DeckEdit from "./components/DeckComponents/DeckEdit";

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

        {/* Edit single deck */}
        <Route path="/decks/:deckId/edit" element={<DeckEdit/>} />
      </Routes>
    </Router>
  );
}
export default App;
