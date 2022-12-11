interface Props {
  children: React.ReactNode;
}

export const ButtonGroup = ({ children }: Props) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {children}
    </div>
  );
};
