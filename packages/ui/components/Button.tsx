'use client';

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ label, onClick }: Props) => {
  return (
    <button className="inline-flex rounded-md shadow p-2 bg-slate-400" onClick={onClick}>
      {label}
    </button>
  );
};
