import './App.css';
import { useState } from 'react';
import { useCalculator } from './store/calculatorStore';

function App() {
  const [display, setDisplay] = useState('_');
  const addCommand = useCalculator((state) => state.addCommand);

  const handleAddClick = () => {
    addCommand(8);
  };

  const handleCalculateClick = () => {
    const { commands } = useCalculator.getState();
    console.log(commands);
    const result = commands.reduce((total, command) => total + command, 0);
    setDisplay(result.toString());
  };

  return (
    <>
      <button onClick={handleAddClick}>Add</button>
      <button onClick={handleCalculateClick}>Calculate</button>
      <p>{display}</p>
    </>
  );
}

export default App;
