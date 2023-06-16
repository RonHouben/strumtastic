import { cn } from "@ui/utils";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function Container({ children, className, ...props }: Props) {
	return <div className={cn('container relative', className)} {...props}>{children}</div>
}