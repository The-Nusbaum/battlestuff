import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './layout/header';
import { AsCard, AsCardComponent, getAsCard } from './as/card';

function App() {
  const [cards, setCards] = useState<AsCard[]>([]);

  useEffect(() => {
    Promise.all([getAsCard(), getAsCard(), getAsCard()])
      .then(setCards);
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Cards flex flex-wrap m-2">
        {cards.map((card, index) => (
          <AsCardComponent key={index} asCard={card} />
        ))}
      </div>
    </div>
  );
}

export default App;