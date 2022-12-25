import { InputLabel } from './InputLabel';

interface Props {
  id: string;
  checked: boolean;
  label?: string;
  disabled?: boolean;
  onChange: () => void;
}

export const Checkbox = ({ id, label, checked, disabled, onChange }: Props) => {
  return (
    <>
      {label && <InputLabel label={label} htmlFor={id} />}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};
