interface Props {
  children: string;
  htmlFor: string;
}

export const InputLabel = ({ htmlFor, children }: Props) => {
  return (
    <label className="mr-2 font-bold" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
