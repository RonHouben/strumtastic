interface Props {
  children: React.ReactNode;
}

export const ButtonGroup = ({ children }: Props) => {
  return (
    <div className="flex rounded-md shadow-sm" role="group">
      {children}
    </div>
  );
};
