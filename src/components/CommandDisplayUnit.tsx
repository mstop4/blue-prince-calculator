interface CommandDisplayUnitProps {
  value: number | null;
}

export default function CommandDisplayUnit(props: CommandDisplayUnitProps) {
  const { value } = props;

  return <>{(value !== null ? value : '_') + ' '}</>;
}
