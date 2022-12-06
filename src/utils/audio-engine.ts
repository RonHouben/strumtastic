export class AudioEngine {
	private readonly window: Window;
	private readonly audioContext: AudioContext;
	private readonly analyser: AnalyserNode;
	public frequencyData: Uint8Array;
	private inputAudioStream?: MediaStream;
	private inputAudioStreamSource?: MediaStreamAudioSourceNode;
	private requestAnimationFrameId?: number;
	private setIntervalId?: NodeJS.Timeout;
	private _currentFrequency = 0;

	public readonly bufferLength: number;

	constructor(window: Window) {
		this.window = window;
		this.audioContext = new AudioContext();
		this.analyser = this.audioContext.createAnalyser();

		this.analyser.fftSize = 2048;

		this.bufferLength = this.analyser.frequencyBinCount;
		this.frequencyData = new Uint8Array(this.bufferLength);
	}

	public async requestUserMedia(): Promise<void> {
		try {
			this.inputAudioStream = await this.window.navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			this.connectInputAudioStream();
		} catch (error) {
			console.error('Unable to get microphone stream from user');
			console.error(error);
		}
	}

	private connectInputAudioStream(): void {
		if (!this.inputAudioStream) {
			throw new Error(
				'Missing audio input stream! Make sure to first call AudioEngine.requestAudioInputStream'
			);
		}

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
