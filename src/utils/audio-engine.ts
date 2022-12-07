import type { MusicNote } from '../constants/musicnotes.constant';
import { MUSIC_NOTES } from '../constants';

interface AudioEngineOptions {
	inputAudioStream: MediaStream;
}

export class AudioEngine {
	private readonly audioContext: AudioContext;
	private readonly analyser: AnalyserNode;
	private readonly inputAudioStream: MediaStream;
	private readonly inputAudioStreamSource: MediaStreamAudioSourceNode;
	private requestAnimationFrameId?: number;
	private _currentFrequency = 0;
	private _currentPitch = 0;
	private _currentMusicNote?: MusicNote;

	public readonly bufferLength: number;
	public readonly frequencyData: Uint8Array;

	constructor({ inputAudioStream }: AudioEngineOptions) {
		this.inputAudioStream = inputAudioStream;
		this.audioContext = new AudioContext();
		this.analyser = this.audioContext.createAnalyser();

		this.analyser.fftSize = 2048;

		this.bufferLength = this.analyser.frequencyBinCount;
		this.frequencyData = new Uint8Array(this.bufferLength);

		// connect inputAudioStreamSouce
		this.inputAudioStreamSource = this.audioContext.createMediaStreamSource(this.inputAudioStream);
		this.inputAudioStreamSource.connect(this.analyser);
		// this.analyser.connect(this.audioContext.destination);
	}

	get currentFrequency() {
		return this._currentFrequency;
	}

	get currentPitch() {
		return this._currentPitch;
	}

	get currentMusicNote() {
		return this._currentMusicNote;
	}

	private streamInputAudio() {
		this.requestAnimationFrameId = requestAnimationFrame(() => this.streamInputAudio());
		this.analyser.getByteTimeDomainData(this.frequencyData);

		this.setCurrentFrequency();
		this.setCurrentPitch();
		this.setCurrentMusicNote();
	}

	private setCurrentFrequency() {
		const stepsThreshold = 5;
		let lastItem = 0;
		let lastPos = 0;

		for (let i = 0; i < this.bufferLength; i++) {
			const currentItem = this.frequencyData[i];

			if (i > 0 && i < this.frequencyData.length && currentItem > 128 && lastItem <= 128) {
				const elapsedSteps = i - lastPos;
				lastPos = i;

				if (elapsedSteps > stepsThreshold) {
					this._currentFrequency = 1 / (elapsedSteps / this.audioContext.sampleRate);
				}
			}

			lastItem = currentItem;
		}
	}

	private setCurrentPitch() {
		const counts: { [key: string]: number } = {};

		let pitch = 0;
		let max = 0;

		this.frequencyData.forEach((item) => {
			const value = Math.round(item * 10) / 10;

			counts[value] = (counts[value] || 0) + 1;

			if (counts[value] > max) {
				max = counts[value];
				pitch = value;
			}
		});

		this._currentPitch = pitch;
	}

	private setCurrentMusicNote() {
		let closestLower: MusicNote = MUSIC_NOTES[0];
		let closestHigher: MusicNote = MUSIC_NOTES[MUSIC_NOTES.length - 1];

		for (const musicNote of MUSIC_NOTES) {
			if (musicNote.hz < this._currentPitch) closestLower = musicNote;
			if (musicNote.hz > this._currentPitch) {
				closestHigher = musicNote;
				break; // going from low to high so we can stop here
			}
		}

		const distanceToLower = Math.abs(this._currentPitch - closestLower.hz);
		const distanceToHigher = Math.abs(this._currentPitch - closestHigher.hz);

		this._currentMusicNote =
			Math.min(distanceToLower, distanceToHigher) === distanceToLower
				? closestLower
				: closestHigher;
	}

	public startInputAudioStream() {
		console.log('startInputAudioStream');

		this.streamInputAudio();
	}

	public stopInputAudioStream() {
		console.log('stopInputAudioStream');

		if (!this.requestAnimationFrameId) {
			console.warn('Unable to find requestAnimationFrameId');
		} else {
			cancelAnimationFrame(this.requestAnimationFrameId);
			this.requestAnimationFrameId = undefined;
		}
	}
}
