interface Props {
	children: React.ReactNode;
}

export const Article = ({ children }: Props) => <article className="prose">{children}</article>