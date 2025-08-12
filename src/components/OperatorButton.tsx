import type { ArithmeticOperator } from '../calculator/useCalculator.types';

interface OperatorButtonProps {
  operator: ArithmeticOperator;
  changeOperator: (operator: ArithmeticOperator) => void;
}

export default function OperatorButton(props: OperatorButtonProps) {
  const { operator, changeOperator } = props;

  const handleClick = () => {
    changeOperator(operator);
  };

  return (
    <>
      <button onClick={handleClick}>{operator}</button>
    </>
  );
}
