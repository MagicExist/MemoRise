import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/AuthComponents/Login";
import Registration from "./components/AuthComponents/Registration";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para login (pantalla principal) */}
        <Route path="/" element={<Login />} />

        {/* Ruta para registro */}
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
