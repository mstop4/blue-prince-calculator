import styles from './CommandDisplayUnit.module.css';
import classNames from 'classnames';
import {
  ArithmeticOperator,
  type CalculatorCommand,
} from '../calculator/useCalculator.types';

interface CommandDisplayUnitProps {
  command: CalculatorCommand;
}

const operatorStyles = {
  [ArithmeticOperator.None]: styles.none,
  [ArithmeticOperator.Add]: styles.add,
  [ArithmeticOperator.Subtract]: styles.subtract,
  [ArithmeticOperator.Multiply]: styles.multiply,
  [ArithmeticOperator.Divide]: styles.divide,
};

export default function CommandDisplayUnit(props: CommandDisplayUnitProps) {
  const { value, arithmeticOperator, hasOneThirdModifier } = props.command;

  const operatorClasses = classNames(
    { [styles.thirdOp]: hasOneThirdModifier },
    arithmeticOperator !== null ? operatorStyles[arithmeticOperator] : ''
  );

  const label = value !== null ? value : '_';

  return (
    <div className={styles.unit}>
      <div className={operatorClasses}>{label}</div>
    </div>
  );
}
