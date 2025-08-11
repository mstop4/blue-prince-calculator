const ArithmeticOperator = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
} as const;

export type ArithmeticOperator =
  (typeof ArithmeticOperator)[keyof typeof ArithmeticOperator];

const CircleOperator = {
  Square: 'S',
  Swap: 'D',
  RoundTo1: '~',
  RoundTo10: '~~',
  RoundTo100: '~~~',
} as const;

export type CircleOperator =
  (typeof CircleOperator)[keyof typeof CircleOperator];

const OperandModifier = {
  Ignore: 'X',
  Half: '/',
  Double: ':',
  Swap: 'D',
} as const;

export type OperandModifier =
  (typeof OperandModifier)[keyof typeof OperandModifier];

export type CalculatorCommand = {
  value: number;
  arithmeticOperator: ArithmeticOperator | null;
  circleOperators: [CircleOperator?, CircleOperator?];
  operandModifier: OperandModifier | null;
  hasOneThirdModifier: boolean;
};

export type CalculatorState = {
  commands: Array<CalculatorCommand>;
  result: number;
};

export type CalculatorAction =
  | {
      type: 'addDigit';
      value: number;
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
  clear: () => void;
  calculate: () => void;
  commandDisplay: string;
}
