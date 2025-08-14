import './App.css';
import { useMemo } from 'react';
import { useCalculator } from './calculator/useCalculator';
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';
import CommandDisplayUnit from './components/CommandDisplayUnit';

import { ArithmeticOperator } from './calculator/useCalculator.types';
import OneThirdButton from './components/OneThirdButton';

function App() {
  const {
    state,
    addDigit,
    changeOperator,
    changeOneThirdModifier,
    calculate,
    clear,
  } = useCalculator();

  const handleCalculateClick = () => {
    calculate();
  };

  const handleClearClick = () => {
    clear();
  };

  const commandDisplay = state.commands.map((command) => (
    <CommandDisplayUnit command={command} key={command.value} />
  ));

  const digitKeypad = useMemo(() => {
    const keys = [];

    for (let i = 0; i <= 9; i++) {
      keys.push(<DigitButton key={i} value={i} addDigit={addDigit} />);
    }

    return keys;
  }, [addDigit]);

  return (
    <>
      {digitKeypad}
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
      <OneThirdButton {...{ changeOneThirdModifier }} />
      <br />
      <button onClick={handleCalculateClick}>Calculate</button>
      <button onClick={handleClearClick}>Clear</button>
      <br />
      {commandDisplay}
      <p>{state.result}</p>
    </>
  );
}

export default App;
