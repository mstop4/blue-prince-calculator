import { useReducer } from 'react';
import type {
  CalculatorAction,
  CalculatorState,
  ICalculator,
} from './useCalculator.types';

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        commands: [...state.commands, action.value],
      };

    case 'calculate':
      return {
        ...state,
        result: state.commands.reduce((total, command) => total + command, 0),
      };

    case 'clear':
      return {
        commands: [],
        result: 0,
      };

    default:
      return state;
  }
};

export const useCalculator = (
  initialState: Array<number> = []
): ICalculator => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    commands: initialState,
    result: 0,
  });

  const add = (value: number) => dispatch({ type: 'add', value });
  const clear = () => dispatch({ type: 'clear' });
  const calculate = () => dispatch({ type: 'calculate' });
  const commandDisplay = state.commands.reduce(
    (total, command) => `${total}${command} `,
    ''
  );

  return {
    state,
    add,
    clear,
    calculate,
    commandDisplay,
  };
};
