import { produce } from 'immer';
import {
  ArithmeticOperator,
  CircleOperator,
  type CalculatorAction,
  type CalculatorCommand,
  type CalculatorState,
  OperandModifier,
} from './useCalculator.types';

const createNewCommand = (): CalculatorCommand => ({
  value: null,
  arithmeticOperator: ArithmeticOperator.None,
  circleOperators: [CircleOperator.None, CircleOperator.None],
  operandModifier: OperandModifier.None,
  hasOneThirdModifier: false,
});

const canGoToNextCommand = (command: CalculatorCommand) => {
  return (
    command.value !== null &&
    command.arithmeticOperator !== ArithmeticOperator.None
  );
};

const parseCommands = (commands: CalculatorCommand[]) => {
  try {
    return commands.reduce((result, command) => {
      if (command.value === null) throw new Error('No value given');

      let actualOperand = command.value;
      if (command.hasOneThirdModifier) actualOperand /= 3;

      switch (command.arithmeticOperator) {
        case ArithmeticOperator.Add:
          return result + actualOperand;

        case ArithmeticOperator.Subtract:
          return result - actualOperand;

        case ArithmeticOperator.Multiply:
          return result * actualOperand;

        case ArithmeticOperator.Divide:
          return result / actualOperand;

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

export const calculatorReducer = produce<CalculatorState, [CalculatorAction]>(
  (draft, action) => {
    switch (action.type) {
      case 'addDigit': {
        const lastCommand = draft.commands.at(-1);

        if (!lastCommand || canGoToNextCommand(lastCommand)) {
          const newCommand = createNewCommand();
          newCommand.value = action.value;
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
        }

        break;
      }

      case 'changeOneThirdModifier': {
        const lastCommand = draft.commands.at(-1);

        if (lastCommand) {
          lastCommand.hasOneThirdModifier = !lastCommand.hasOneThirdModifier;
        }

        break;
      }

      case 'calculate':
        draft.result = parseCommands(draft.commands);
        break;

      case 'clear':
        draft.commands = [];
        draft.result = 0;
        break;

      default:
        break;
    }
  }
);
