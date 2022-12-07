interface AudioEngineOptions {
	inputAudioStream: MediaStream;	
}

export class AudioEngine {
	private readonly audioContext: AudioContext;
	private readonly analyser: AnalyserNode;
	private readonly inputAudioStream: MediaStream;
	private inputAudioStreamSource?: MediaStreamAudioSourceNode;
	private requestAnimationFrameId?: number;
	private setIntervalId?: NodeJS.Timeout;
	private _currentFrequency = 0;

	public readonly bufferLength: number;
	public readonly frequencyData: Uint8Array;

	constructor({ inputAudioStream }: AudioEngineOptions) {
		this.audioContext = new AudioContext();
		this.inputAudioStream = inputAudioStream;
		this.analyser = this.audioContext.createAnalyser();

		this.analyser.fftSize = 2048;

		this.bufferLength = this.analyser.frequencyBinCount;
		this.frequencyData = new Uint8Array(this.bufferLength);

		this.connectInputAudioStream();
	}

	private connectInputAudioStream(): void {
		this.inputAudioStreamSource = this.audioContext.createMediaStreamSource(this.inputAudioStream);
		this.inputAudioStreamSource.connect(this.analyser);
		// this.analyser.connect(this.audioContext.destination);

	}

	public startInputAudioStream() {
		console.log('startInputAudioStream');

		this.streamInputAudio();
	}

	private streamInputAudio() {
		this.requestAnimationFrameId = requestAnimationFrame(() => this.streamInputAudio());
		console.log(this._currentFrequency)
		this.analyser.getByteTimeDomainData(this.frequencyData);

		this.calculateCurrentFrequency();
	}

	public stopInputAudioStream() {
		console.log('stopInputAudioStream');

		if (!this.requestAnimationFrameId) {
			console.warn('Unable to find requestAnimationFrameId');
		} else {
			cancelAnimationFrame(this.requestAnimationFrameId);
			this.requestAnimationFrameId = undefined;
		}

		if (!this.setIntervalId) {
			console.warn('Unable to find setIntervalId');
		} else {
			clearTimeout(this.setIntervalId);
			this.setIntervalId = undefined;
		}
	}

	private calculateCurrentFrequency() {
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

	get currentFrequency() {
		return this._currentFrequency;
	}
}
