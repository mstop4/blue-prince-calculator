import './App.css';
import { useState, useEffect } from 'react';
import { useCalculator } from './calculator/useCalculator';

function App() {
  const { state, add, calculate, commandDisplay } = useCalculator();
  const [resultDisplay, setResultDisplay] = useState('0');

  useEffect(() => {
    setResultDisplay(state.result.toString());
  }, [state.result]);

  const handleAddClick = () => {
    add(8);
  };

  const handleCalculateClick = () => {
    calculate();
  };

  return (
    <>
      <button onClick={handleAddClick}>Add</button>
      <button onClick={handleCalculateClick}>Calculate</button>
      <p>{commandDisplay}</p>
      <p>{resultDisplay}</p>
    </>
  );
}

export default App;
