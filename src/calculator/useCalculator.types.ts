export const ArithmeticOperator = {
  None: 'N/A',
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
} as const;

export type ArithmeticOperator =
  (typeof ArithmeticOperator)[keyof typeof ArithmeticOperator];

export const CircleOperator = {
  None: 'N/A',
  Square: 'S',
  Swap: 'D',
  RoundTo1: '~',
  RoundTo10: '~~',
  RoundTo100: '~~~',
} as const;

export type CircleOperator =
  (typeof CircleOperator)[keyof typeof CircleOperator];

export const OperandModifier = {
  None: 'N/A',
  Ignore: 'X',
  Half: '/',
  Double: ':',
  Swap: 'D',
} as const;

export type OperandModifier =
  (typeof OperandModifier)[keyof typeof OperandModifier];

export type CalculatorCommand = {
  value: number | null;
  arithmeticOperator: ArithmeticOperator;
  circleOperators: [CircleOperator, CircleOperator];
  operandModifier: OperandModifier;
  hasOneThirdModifier: boolean;
};

export type CalculatorState = {
  commands: Array<CalculatorCommand>;
  result: number | string;
};

export type CalculatorAction =
  | {
      type: 'addDigit';
      value: number;
    }
  | {
      type: 'changeOperator';
      operator: ArithmeticOperator;
    }
  | {
      type: 'changeOneThirdModifier';
    }
  | {
      type: 'calculate';
    }
  | {
      type: 'clear';
    };

export interface ICalculator {
  state: CalculatorState;
  addDigit: (value: number) => void;
  changeOperator: (operator: ArithmeticOperator) => void;
  changeOneThirdModifier: () => void;
  clear: () => void;
  calculate: () => void;
}
