import React from 'react';
import VendingMachine from './components/VendingMachine';
import './App.css';

const App: React.FC = () => {
  return (
      <div className="app-container">
        <h1>Vending Machine</h1>
        <VendingMachine />
      </div>
  );
};

export default App;
