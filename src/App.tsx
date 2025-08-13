import './App.css';
import { useState, useEffect } from 'react';
import { useCalculator } from './calculator/useCalculator';
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';
import { ArithmeticOperator } from './calculator/useCalculator.types';

function App() {
  const { state, addDigit, changeOperator, calculate, clear, commandDisplay } =
    useCalculator();
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

  return (
    <>
      <DigitButton key={`key${0}`} value={0} {...{ addDigit }} />
      <DigitButton key={`key${1}`} value={1} {...{ addDigit }} />
      <DigitButton key={`key${2}`} value={2} {...{ addDigit }} />
      <DigitButton key={`key${3}`} value={3} {...{ addDigit }} />
      <DigitButton key={`key${4}`} value={4} {...{ addDigit }} />
      <DigitButton key={`key${5}`} value={5} {...{ addDigit }} />
      <DigitButton key={`key${6}`} value={6} {...{ addDigit }} />
      <DigitButton key={`key${7}`} value={7} {...{ addDigit }} />
      <DigitButton key={`key${8}`} value={8} {...{ addDigit }} />
      <DigitButton key={`key${9}`} value={9} {...{ addDigit }} />
      <br />
      <OperatorButton
        operator={ArithmeticOperator.Add}
        {...{ changeOperator }}
      />
      <OperatorButton
        operator={ArithmeticOperator.Subtract}
        {...{ changeOperator }}
      />
      <OperatorButton
        operator={ArithmeticOperator.Multiply}
        {...{ changeOperator }}
      />
      <OperatorButton
        operator={ArithmeticOperator.Divide}
        {...{ changeOperator }}
      />
      <br />
      <button onClick={handleCalculateClick}>Calculate</button>
      <button onClick={handleClearClick}>Clear</button>
      <p>{commandDisplay}</p>
      <p>{resultDisplay}</p>
    </>
  );
}

export default App;
