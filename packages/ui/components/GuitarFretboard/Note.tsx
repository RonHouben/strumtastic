interface Props {
  noteName: string;
	isPlayed: boolean;
}

export const Note = ({ noteName, isPlayed }: Props) => {
  return <div className={isPlayed ? 'bg-blue-500' : ''}>{noteName.replace(/\d/g, '')}</div>;
};
