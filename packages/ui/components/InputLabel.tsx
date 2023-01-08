interface Props {
  children: string;
  htmlFor: string;
  required?: boolean;
}

export const InputLabel = ({ htmlFor, children, required }: Props) => {
  return (
    <label className="mr-2 font-bold" htmlFor={htmlFor}>
      {children}
      {required && <span className="font-bold text-red-500"> *</span>}
    </label>
  );
};
