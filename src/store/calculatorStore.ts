import { create } from 'zustand';

interface CalculatorState {
  commands: Array<number>;
  addCommand: (value: number) => void;
  deleteCommand: () => void;
}

export const useCalculator = create<CalculatorState>((set) => ({
  commands: [],

  addCommand: (value) =>
    set((state) => {
      const newCommands = [...state.commands];
      newCommands.push(value);

      return {
        commands: newCommands,
      };
    }),

  deleteCommand: () =>
    set((state) => {
      const newCommands = [...state.commands];
      newCommands.pop();

      return {
        commands: newCommands,
      };
    }),
}));
