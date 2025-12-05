import React from 'react';
import './App.css';
import Header from './layout/header';
import AsCardComponent from './as/card';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Cards flex flex-wrap m-2">
        <AsCardComponent /> 
        <AsCardComponent />
        <AsCardComponent />
        <AsCardComponent />
      </div>
    </div>
  );
}



export default App;
