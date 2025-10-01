import React from "react";
import "./Panel.css"; // Importamos los estilos

const Panel: React.FC = () => {
  return (
    <div className="panel">
      <h2>New Card</h2>

      <h4>Front</h4>
      <input type="text" />

      <h4>Back</h4>
      <input type="text" />

      <select className="box">
        <option>Select a deck</option>
      </select>

      <button>Add</button>
    </div>
  );
};

export default Panel;
