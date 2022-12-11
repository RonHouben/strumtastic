import { IMusicNote } from "music-notes";

interface Props {
  musicNote: IMusicNote | null;
}

export const MusicNote = ({ musicNote }: Props) => {
  return <div>{JSON.stringify(musicNote)}</div>;
};
