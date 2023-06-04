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

  useEffect(() => {
    // console.log(osmdMachine.state.context.osmd?.Sheet?.Repetitions);
  }, [osmdMachine]);

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
    // console.log({ state: osmdMachine.state.value, noteToPlay: osmdMachine.state.context.cursorRef.state.context.notesUnderCursor[0]?.pc })
    if (osmdMachine.state.matches('idle')) {
      const playedNote = MusicNotes.getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine?.currentFrequency || 0
      );

      if (
        playedNote?.name ===
        osmdMachine.state.context.cursorRef.state.context.notesUnderCursor[1]
          ?.name
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
        Curr note:
        {MusicNotes.getMusicNoteFromFrequency(
          audioEngine.state.context.audioEngine?.currentFrequency || 0
        ).name}
      </div>
      <div>
        Freq to play:
        {osmdMachine.state.context.cursorRef.state?.context?.notesUnderCursor[1]
          ?.freq}
      </div>
      <div>
        Note to play:
        {osmdMachine.state.context.cursorRef.state?.context?.notesUnderCursor[1]
          ?.name || ''}
      </div>
      <CursorButtons />
    </>
  );
}
