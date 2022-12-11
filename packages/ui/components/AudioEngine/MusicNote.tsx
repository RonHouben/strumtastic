import { IMusicNote } from 'audio-engine/constants/musicnotes.constant';

interface Props {
  musicNote: IMusicNote | null;
}

export const MusicNote = ({ musicNote }: Props) => {
  return <div>{JSON.stringify(musicNote)}</div>;
};
