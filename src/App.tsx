import './App.css';
import { useState } from 'react';
import { useCalculator } from './store/calculatorStore';

function App() {
  const [commandDisplay, setCommandDisplay] = useState('_');
  const [resultDisplay, setResultDisplay] = useState('_');
  const addCommand = useCalculator((state) => state.addCommand);

  const handleAddClick = () => {
    addCommand(8);
    const { commands } = useCalculator.getState();
    setCommandDisplay(
      commands.reduce((total, command) => `${total}${command.toString()} `, '')
    );
  };

  const handleCalculateClick = () => {
    const { commands } = useCalculator.getState();
    console.log(commands);
    const result = commands.reduce((total, command) => total + command, 0);
    setResultDisplay(result.toString());
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
