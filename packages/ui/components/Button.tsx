'use client';

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ label, onClick }: Props) => {
  return <button className="border rounded-sm" onClick={onClick}>{label}</button>;
};
