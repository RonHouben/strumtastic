interface Props {
	label: string;
	htmlFor: string;
}

export const InputLabel = ({ htmlFor, label}: Props) => {
	return <label className="mr-2" htmlFor={htmlFor}>{label}</label>;
}