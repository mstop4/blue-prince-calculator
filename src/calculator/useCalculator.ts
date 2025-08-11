import { useReducer } from 'react';
import type {
  CalculatorAction,
  CalculatorCommand,
  CalculatorState,
  ICalculator,
} from './useCalculator.types';

const createNewCommand = (): CalculatorCommand => ({
  value: 0,
  arithmeticOperator: null,
  circleOperators: [],
  operandModifier: null,
  hasOneThirdModifier: false,
});

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case 'addDigit': {
      const newCommand = createNewCommand();
      newCommand.value = action.value;

      return {
        ...state,
        commands: [...state.commands, newCommand],
      };
    }

    case 'calculate':
      return {
        ...state,
        result: state.commands.reduce(
          (total, command) => total + command.value,
          0
        ),
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
  initialState: Array<CalculatorCommand> = []
): ICalculator => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    commands: initialState,
    result: 0,
  });

  const addDigit = (value: number) => dispatch({ type: 'addDigit', value });
  const clear = () => dispatch({ type: 'clear' });
  const calculate = () => dispatch({ type: 'calculate' });
  const commandDisplay = state.commands.reduce(
    (total, command) => `${total}${command.value} `,
    ''
  );

  return {
    state,
    addDigit,
    clear,
    calculate,
    commandDisplay,
  };
};
