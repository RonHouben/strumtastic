interface Props {
	children: string;
}

export const H1 = ({ children }: Props) => <h1 className="text-5xl font-bold">{children}</h1>;
