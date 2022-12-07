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

	private streamInputAudio() {
		this.requestAnimationFrameId = requestAnimationFrame(() => this.streamInputAudio());
		this.analyser.getByteTimeDomainData(this.frequencyData);

		this.calculateCurrentFrequency();
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
