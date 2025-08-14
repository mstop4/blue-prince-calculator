interface OneThirdButtonProps {
  changeOneThirdModifier: () => void;
}

export default function OneThirdButton(props: OneThirdButtonProps) {
  const { changeOneThirdModifier } = props;

  const handleClick = () => {
    changeOneThirdModifier();
  };

  return (
    <>
      <button onClick={handleClick}>1/3</button>
    </>
  );
}
