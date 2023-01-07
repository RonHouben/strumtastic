import { useClassNames } from "../../hooks/useClassNames";
import { ButtonLink } from "../ButtonLink";

interface Props {
  className?: string;
}

export default function AdminMenu({ className }: Props) {
	const { classNames } = useClassNames();

  return (
    <div className={classNames(className || '')}>
			<ButtonLink label="Exercises" href="/admin/exercises" />
    </div>
  );
};