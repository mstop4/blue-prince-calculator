import { useReducer } from 'react';
import {
  ArithmeticOperator,
  type CalculatorCommand,
  type ICalculator,
} from './useCalculator.types';
import { calculatorReducer } from './reducer';

export const useCalculator = (
  initialCommands: Array<CalculatorCommand> = []
): ICalculator => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    commands: initialCommands,
    result: 0,
  });

  const addDigit = (value: number) => dispatch({ type: 'addDigit', value });
  const changeOperator = (operator: ArithmeticOperator) =>
    dispatch({ type: 'changeOperator', operator });
  const changeOneThirdModifier = () =>
    dispatch({ type: 'changeOneThirdModifier' });
  const clear = () => dispatch({ type: 'clear' });
  const calculate = () => dispatch({ type: 'calculate' });

  return {
    state,
    addDigit,
    changeOperator,
    changeOneThirdModifier,
    clear,
    calculate,
  };
};
