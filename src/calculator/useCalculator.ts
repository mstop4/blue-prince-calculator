import { useReducer } from 'react';
import {
  ArithmeticOperator,
  type CalculatorAction,
  type CalculatorCommand,
  type CalculatorState,
  type ICalculator,
} from './useCalculator.types';
import { produce } from 'immer';

const createNewCommand = (): CalculatorCommand => ({
  value: 0,
  arithmeticOperator: null,
  circleOperators: [],
  operandModifier: null,
  hasOneThirdModifier: false,
});

const parseCommands = (commands: CalculatorCommand[]): number => {
  // NOTE: will be expanded in the future to include more than addition
  return commands.reduce((result, command) => {
    return result + command.value;
  }, 0);
};

const calculatorReducer = produce<CalculatorState, [CalculatorAction]>(
  (draft, action) => {
    switch (action.type) {
      case 'addDigit': {
        const lastCommand = draft.goToNextCommand
          ? undefined
          : draft.commands.at(-1);

        if (!lastCommand) {
          const newCommand = createNewCommand();
          newCommand.value = action.value;
          draft.goToNextCommand = false;
          draft.commands.push(newCommand);
        } else {
          lastCommand.value = lastCommand.value * 10 + action.value;
        }
        break;
      }

      case 'changeOperator': {
        const lastCommand = draft.commands.at(-1);

        if (lastCommand) {
          lastCommand.arithmeticOperator = action.operator;
          draft.goToNextCommand = true;
        }

        break;
      }

      case 'calculate':
        draft.result = parseCommands(draft.commands);
        break;

      case 'clear':
        draft.commands = [];
        draft.result = 0;
        draft.goToNextCommand = false;
        break;

      default:
        break;
    }
  }
);

export const useCalculator = (
  initialCommands: Array<CalculatorCommand> = []
): ICalculator => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    commands: initialCommands,
    result: 0,
    goToNextCommand: false,
  });

  const addDigit = (value: number) => dispatch({ type: 'addDigit', value });
  const changeOperator = (operator: ArithmeticOperator) =>
    dispatch({ type: 'changeOperator', operator });
  const clear = () => dispatch({ type: 'clear' });
  const calculate = () => dispatch({ type: 'calculate' });
  const commandDisplay = state.commands.reduce(
    (total, command) => `${total}${command.value} `,
    ''
  );

  return {
    state,
    addDigit,
    changeOperator,
    clear,
    calculate,
    commandDisplay,
  };
};
