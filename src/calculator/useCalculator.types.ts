export type CalculatorState = {
  commands: Array<number>;
  result: number;
};

export type CalculatorAction =
  | {
      type: 'add';
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
  add: (value: number) => void;
  clear: () => void;
  calculate: () => void;
  commandDisplay: string;
}
