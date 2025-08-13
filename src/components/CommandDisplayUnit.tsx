import styles from './CommandDisplayUnit.module.css';
import classNames from 'classnames';
import {
  ArithmeticOperator,
  type CalculatorCommand,
} from '../calculator/useCalculator.types';

interface CommandDisplayUnitProps {
  command: CalculatorCommand;
}

export default function CommandDisplayUnit(props: CommandDisplayUnitProps) {
  const { value, arithmeticOperator } = props.command;

  // NOTE: Seems verbose
  const operatorClasses = classNames(
    styles.unit,
    { [styles.add]: arithmeticOperator === ArithmeticOperator.Add },
    { [styles.subtract]: arithmeticOperator === ArithmeticOperator.Subtract },
    { [styles.multiply]: arithmeticOperator === ArithmeticOperator.Multiply },
    { [styles.divide]: arithmeticOperator === ArithmeticOperator.Divide }
  );

  return (
    <div className={operatorClasses}>
      {(value !== null ? value : '_') + ' '}
    </div>
  );
}
