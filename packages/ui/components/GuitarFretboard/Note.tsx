import { classNames } from 'ui/utils';

interface Props {
  noteName: string;
  isPlayed?: boolean;
  isRoot?: boolean;
  toBePlayed?: boolean;
}

export const Note = ({ noteName, isPlayed, isRoot, toBePlayed }: Props) => {
  return (
    <span
      className={classNames(
        isPlayed ? 'bg-blue-500' : '',
        toBePlayed && !isPlayed ? 'bg-orange-500' : '',
        isRoot && !isPlayed ? 'bg-gray-400' : '',
      )}
    >
      {noteName.replace(/\d/g, '')}
    </span>
  );
};
