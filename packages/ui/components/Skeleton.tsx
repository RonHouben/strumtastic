interface Props {
  lines: number;
}

export default function Skeleton({ lines }: Props) {
  return (
    <>
      {[
        ...new Array(lines)
          .fill(1)
          .map((_, i) => (
            <span className="inline-block h-5 w-10/12 animate-pulse rounded-md bg-secondary-900" />
          ))
      ]}
    </>
  );
}
