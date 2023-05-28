import { MusicNotes } from 'music-notes';
import Button from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { useEffect } from 'react';
import { useGlobalState } from '../../hooks/useGlobalState';
import {
  useOpenSheetMusicDisplay,
  CursorButtons
} from 'react-opensheet-music-display';

export function Exercise() {
  const { audioEngine } = useGlobalState();
  const { osmdMachine } = useOpenSheetMusicDisplay();

  const handleStartListening = () => {
    audioEngine.send('START_LISTENING_TO_MICROPHONE');
  };

  useEffect(() => {
    if (osmdMachine.state.matches('uninitialized')) {
      // hacky workaround so OSMD doesn't get double spawned
      setTimeout(() => {
        osmdMachine.send('initialize');
      }, 100);
    }
  }, [osmdMachine]);

  // go to next note if the note was correctly played
  useEffect(() => {
    if (osmdMachine.state.matches('idle')) {
      const playedNote = MusicNotes.getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine?.currentFrequency || 0
      );

      if (
        playedNote?.pc === osmdMachine.state.context.cursor.musicNotes[0]?.pc
      ) {
        osmdMachine.send('cursor.next');
      }
    }
  }, [audioEngine.state.context.audioEngine?.currentFrequency]);

  return (
    <>
      <ButtonGroup>
        <Button
          size="md"
          variant="filled"
          color="primary"
          onClick={() => {
            audioEngine.send('INITIALIZE');
          }}
        >
          Init
        </Button>
        <Button
          size="md"
          variant="filled"
          color="primary"
          onClick={handleStartListening}
        >
          Start listening
        </Button>
      </ButtonGroup>
      <div>
        Curr freq: {audioEngine.state.context.audioEngine?.currentFrequency}
      </div>
      <div>
        Freq to play: {osmdMachine.state.context.cursor.musicNotes[0]?.freq}
      </div>
      <div>
        Note to play: {osmdMachine.state.context.cursor.musicNotes[0]?.pc}
      </div>
      <CursorButtons />
    </>
  );
}
