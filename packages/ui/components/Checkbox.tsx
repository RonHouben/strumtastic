import { InputLabel } from "./InputLabel";

interface Props {
	id: string;
  checked: boolean;
  label?: string;
  onChange: () => void;
}

export const Checkbox = ({ id, label, checked, onChange }: Props) => {
  return (
    <>
      {label && <InputLabel label={label} htmlFor={id} />}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};
