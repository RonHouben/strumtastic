interface Props {
  children: React.ReactNode;
}

export const ButtonGroup = ({ children }: Props) => {
  return (
    <div className="flex gap-2" role="group">
      {children}
    </div>
  );
};
