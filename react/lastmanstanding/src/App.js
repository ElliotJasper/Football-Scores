import "./App.css";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import Window from "./components/Window";
import WithUse from "./components/WithUse";
import React from "react";

function App() {
  return (
    <>
      <div className="top-section">
        <Navbar />
        <div className="flex-components">
          <Info />
          <div className="window-container">
            <Window />
          </div>
        </div>
      </div>
      <WithUse />
    </>
  );
}

export default App;
