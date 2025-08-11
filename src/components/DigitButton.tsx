interface DigitButtonProps {
  value: number;
  addDigit: (value: number) => void;
}

export default function DigitButton(props: DigitButtonProps) {
  const { value, addDigit } = props;

  const handleClick = () => {
    addDigit(value);
  };

  return (
    <>
      <button onClick={handleClick}>{value}</button>
    </>
  );
}
