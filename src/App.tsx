import React from "react";
import Header from "./components/Header";
import GameArea from "./components/GameArea";
import Record from "./components/Record";

function App() {
  return (
    <div className="container m-auto max-h-screen">
      <Header />
      <main className="grid grid-cols-12">
        <GameArea />
        <Record />
      </main>
    </div>
  );
}

export default App;
