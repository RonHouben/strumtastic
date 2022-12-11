interface Props {
	children: React.ReactNode;
}

export const Row = ({ children }: Props) => {
    return <div className="flex justify-between text-center items-center">{children}</div>
}