interface Props {
  children: React.ReactNode;
  disabled?: boolean;
}

export const ButtonGroup = ({ children, disabled }: Props) => {
  return (
    <fieldset className="flex flex-wrap gap-2" role="group" disabled={disabled}>
      {children}
    </fieldset>
  );
};
