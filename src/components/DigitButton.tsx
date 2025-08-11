interface DigitButtonProps {
  value: number;
  add: (value: number) => void;
}

export default function DigitButton(props: DigitButtonProps) {
  const { value, add } = props;

  const handleClick = () => {
    add(value);
  };

  return (
    <>
      <button onClick={handleClick}>{value}</button>
    </>
  );
}
