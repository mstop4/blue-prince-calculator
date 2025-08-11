import './App.css';
import { useState, useEffect } from 'react';
import { useCalculator } from './calculator/useCalculator';
import DigitButton from './components/DigitButton';

function App() {
  const { state, add, calculate, clear, commandDisplay } = useCalculator();
  const [resultDisplay, setResultDisplay] = useState('0');

  useEffect(() => {
    setResultDisplay(state.result.toString());
  }, [state.result]);

  const handleCalculateClick = () => {
    calculate();
  };

  const handleClearClick = () => {
    clear();
  };

  const keypad = [];
  for (let i = 0; i <= 9; i++) {
    keypad.push(<DigitButton key={`key${i}`} value={i} add={add} />);
  }

  return (
    <>
      {keypad}
      <br />
      <button onClick={handleCalculateClick}>Calculate</button>
      <button onClick={handleClearClick}>Clear</button>
      <p>{commandDisplay}</p>
      <p>{resultDisplay}</p>
    </>
  );
}

export default App;
