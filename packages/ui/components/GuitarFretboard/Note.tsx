import { classNames } from 'ui/utils';

interface Props {
  noteName: string;
  isCurrentlyPlaying: boolean;
  isPlayed?: boolean;
  isRoot?: boolean;
  toBePlayed?: boolean;
}

export const Note = ({ noteName, isCurrentlyPlaying, isPlayed, isRoot, toBePlayed }: Props) => {
  return (
    <span
      className={classNames(
        isCurrentlyPlaying ? 'bg-blue-500' : '',
        toBePlayed && !isCurrentlyPlaying ? 'bg-orange-500' : '',
        isRoot && !isCurrentlyPlaying ? 'bg-gray-400' : '',
      )}
    >
      {noteName.replace(/\d/g, '')}
    </span>
  );
};
