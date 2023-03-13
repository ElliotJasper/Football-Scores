import "./App.css";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import Window from "./components/Window";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [data, setData] = useState();

  return (
    <div>
      <Navbar />
      <div className="flex-components">
        <Info />
        <div className="window-container">
          <Window />
        </div>
      </div>
    </div>
  );
}

export default App;
