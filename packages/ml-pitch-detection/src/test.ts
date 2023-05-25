import * as tensorflow from '@tensorflow/tfjs';

export default class MLPitchDetector {
	private readonly audioContext: AudioContext;
	private readonly modelUrl: string;
	private readonly mediaStream: MediaStream;
	private readonly mediaSource: MediaStreamAudioSourceNode;
	private readonly sampleRate: number;
	// private readonly analyser: AnalyserNode;
	private readonly channelData: Float32Array = new Float32Array();
	private readonly gainNode: GainNode;
	private model: tensorflow.LayersModel | undefined;
	private frequency: number = 0;
	private results: Record<string, unknown> = {};

	constructor(audioContext: AudioContext, mediaStream: MediaStream, modelUrl: string) {
		this.audioContext = audioContext;
		this.mediaStream = mediaStream;
		this.modelUrl = modelUrl;
		this.sampleRate = this.audioContext.sampleRate;

		this.mediaSource = this.audioContext.createMediaStreamSource(this.mediaStream);
		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
		this.gainNode.connect(this.audioContext.destination);
	}

	public async loadModel() {
		try {
			this.model = await tensorflow.loadLayersModel(this.modelUrl);
		} catch (error) {
			throw new Error(`Error loading model from URL ${this.modelUrl}: ${String(error)}`);
		}

		await this.processStream();

		return this;
	}

	private async processStream() {
		if (!this.audioContext) {
			throw new Error('Could not access microphone - getUserMedia not available');
		}

		await tensorflow.nextFrame();

		const minBufferSize = (this.audioContext.sampleRate / 16000) * 1024;

		let bufferSize = 4;

		while (bufferSize < minBufferSize) {
			bufferSize *= 2;
		}

		const scriptNode = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
		scriptNode.onaudioprocess = this.processMicrophoneBuffer.bind(this);
		this.mediaSource.connect(scriptNode);
		scriptNode.connect(this.gainNode);

		// const url = new URL('audioProcessor.js', import.meta.url);

		// 	try {
		// 		await this.audioContext.audioWorklet.addModule(url)
		// 	} catch (err) {
		// 		throw new Error(`Error loading audio worklet: ${String(err)}`);
		// 	}

		// const audioProcessorNode = new AudioProcessorNode(this.audioContext);
		// this.mediaSource.connect(audioProcessorNode);
		// audioProcessorNode.connect(this.gainNode);

		// audioProcessorNode.port.onmessage = this.processMicrophoneBuffer.bind(this);

		if (this.audioContext.state !== 'running') {
			console.warn('User gesture needed to start AudioContext, please click');
		}
	}

	private async processMicrophoneBuffer(event: AudioProcessingEvent) {
		await tensorflow.nextFrame();

		this.results = {};

		MLPitchDetector.resample(event.inputBuffer, (resampled) => {
			tensorflow.tidy(() => {
				if (!this.model) {
					throw new Error('Model not loaded');
				}

				const centMapping = tensorflow.add(tensorflow.linspace(0, 7180, 360), tensorflow.tensor(1997.3794084376191));

				// run the prediction on the model
				const frame = tensorflow.tensor(resampled.slice(0, 1024));
				const zeroMean = tensorflow.sub(frame, tensorflow.mean(frame));
				const zeroNormalized = tensorflow.norm(zeroMean).dataSync();
				const framestd = tensorflow.tensor(zeroNormalized).div(Math.sqrt(1024));
				const normalized = tensorflow.div(zeroMean, framestd);
				const input = normalized.reshape([1, 1024]);

				const output = this.model.predict([input]) as tensorflow.Tensor<tensorflow.Rank>
				const activation = tensorflow.reshape(output, [360])

				// the confidence of voicing activity and the argmax bin
				const confidence = activation.max().dataSync()[0];
				const center = activation.argMax().dataSync()[0];
				this.results.confidence = confidence.toFixed(3);

				// slice the local neighborhood around the argmax bin
				const start = Math.max(0, center - 4);
				const end = Math.min(360, center + 5);
				const weights = activation.slice([start], [end - start]);
				const cents = centMapping.slice([start], [end - start]);

				// take the local weighted average to get the predicted pitch
				const products = tensorflow.mul(weights, cents);
				const productSum = [...products.dataSync()].reduce((a, b) => a + b, 0);
				const weightSum = [...weights.dataSync()].reduce((a, b) => a + b, 0);
				const predictedCent = productSum / weightSum;
				const predictedHz = 10 * (2 ** (predictedCent / 1200.0));

				// update frequency
				this.frequency = (confidence > 0.5) ? predictedHz : 0;
			});
		});
	}

	public async getPitch() {
		await tensorflow.nextFrame();

		return this.frequency;
	}

	static resample(audioBuffer: AudioBuffer, onComplete: (resampled: Float32Array) => void) {
		const interpolate = (audioBuffer.sampleRate % 16000 !== 0);
		const multiplier = audioBuffer.sampleRate / 16000;
		const original = audioBuffer.getChannelData(0);
		const subsamples = new Float32Array(1024);

		for (let i = 0; i < 1024; i += 1) {
			if (!interpolate) {
				subsamples[i] = original[i * multiplier];
			} else {
				const left = Math.floor(i * multiplier);
				const right = left + 1;
				const p = (i * multiplier) - left;
				subsamples[i] = (((1 - p) * original[left]) + (p * original[right]));
			}
		}

		onComplete(subsamples);
	}
}