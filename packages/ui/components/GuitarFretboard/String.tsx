interface Props {
  children: React.ReactNode;
}
export const String = ({ children }: Props) => {
  return (
    <>
      <svg className="absolute z-0 stroke-slate-600">
        <line x1="0" y1="18" x2="45" y2="18" strokeWidth=".25rem" />
      </svg>
      <div className="relative z-10">{children}</div>
    </>
  );
};
