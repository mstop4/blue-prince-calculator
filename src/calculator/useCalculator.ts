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
  value: null,
  arithmeticOperator: null,
  circleOperators: [],
  operandModifier: null,
  hasOneThirdModifier: false,
});

const canGoToNextCommand = (command: CalculatorCommand) => {
  return command.value !== null && command.arithmeticOperator !== null;
};

const parseCommands = (commands: CalculatorCommand[]) => {
  // NOTE: will be expanded in the future to include more than addition
  try {
    return commands.reduce((result, command) => {
      if (command.value === null) throw new Error('No value given');

      switch (command.arithmeticOperator) {
        case ArithmeticOperator.Add:
          return result + command.value;

        case ArithmeticOperator.Subtract:
          return result - command.value;

        case ArithmeticOperator.Multiply:
          return result * command.value;

        case ArithmeticOperator.Divide:
          return result / command.value;

        default:
          return result;
      }
    }, 0);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return `Error: ${error.message}`;
    }

    return `Unknown error`;
  }
};

const calculatorReducer = produce<CalculatorState, [CalculatorAction]>(
  (draft, action) => {
    switch (action.type) {
      case 'addDigit': {
        const lastCommand = draft.commands.at(-1);

        if (!lastCommand || canGoToNextCommand(lastCommand)) {
          const newCommand = createNewCommand();
          newCommand.value = action.value;
          draft.goToNextCommand = false;
          draft.commands.push(newCommand);
        } else {
          if (lastCommand.value !== null) {
            lastCommand.value = lastCommand.value * 10 + action.value;
          } else {
            lastCommand.value = action.value;
          }
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

  return {
    state,
    addDigit,
    changeOperator,
    clear,
    calculate,
  };
};
