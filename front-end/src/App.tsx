import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/AuthComponents/Login";
import Registration from "./components/AuthComponents/Registration";
import MainPanel from "./components/DeckComponents/MainPanel"

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para login (pantalla principal) */}
        <Route path="/" element={<Login />} />

        {/* Ruta para registro */}
        <Route path="/register" element={<Registration />} />

        <Route path="/mainpanel" element={<MainPanel/>} />
      </Routes>
    </Router>
  );
}
export default App;
