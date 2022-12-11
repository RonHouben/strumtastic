import { classNames } from 'ui/utils';

interface Props {
  noteName: string;
  isPlayed?: boolean;
  isRoot?: boolean;
}

export const Note = ({ noteName, isPlayed, isRoot }: Props) => {
  return (
    <span
      className={classNames(
        isRoot && !isPlayed ? 'bg-gray-400' : '',
        isPlayed ? 'bg-blue-500' : ''
      )}
    >
      {noteName.replace(/\d/g, '')}
    </span>
  );
};
