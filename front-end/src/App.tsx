import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/AuthComponents/Login";
import Registration from "./components/AuthComponents/Registration";
import MainPanel from "./components/DeckComponents/MainPanel";
import DeckDetail from "./components/DeckComponents/DeckDetail";
import DeckStudy from "./components/DeckComponents/DeckStudy";
import StudySession from "./components/StudySessionComponents/StudySession";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login screen */}
        <Route path="/" element={<Login />} />

        {/* Registration screen */}
        <Route path="/register" element={<Registration />} />

        {/* Main panel with all decks */}
        <Route path="/mainpanel" element={<MainPanel />} />

        {/* Deck details */}
        <Route path="/decks/:deckId" element={<DeckDetail />} />

        {/* Study overview for a deck */}
        <Route path="/decks/:deckId/study" element={<DeckStudy />} />

        {/* Study session for a deck */}
        <Route path="/decks/:deckId/session" element={<StudySession />} />
      </Routes>
    </Router>
  );
}

export default App;
