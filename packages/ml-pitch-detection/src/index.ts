/*
	Crepe Pitch Detection model
	Based on https://github.com/marl/crepe/tree/gh-pages
	Original model and code: https://marl.github.io/crepe/crepe.js
*/

import tensorflow from '@tensorflow/tfjs';

export class MLPitchDetection {
	private readonly pitchDetectionModelPath: string = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-library/examples/javascript/PitchDetection/PitchDetection/model';
	private readonly audioContext: AudioContext;
	private readonly stream: MediaStream;
	private readonly modelPath: string = './model/crepe/model.json';
	private model: tensorflow.LayersModel | undefined;
	private frequency: number | null = null;
	private results: Record<string, unknown> = {};
	private running: boolean = false;
	private ready: boolean = false;

	constructor(audioContext: AudioContext, stream: MediaStream) {
		this.audioContext = audioContext;
		this.stream = stream;
	}

	public async loadModel() {
		try {
			this.model = await tensorflow.loadLayersModel(this.modelPath);
		} catch (error) {
			throw new Error(`Error loading model from URL ${this.modelPath}: ${String(error)}`);
		}

		await this.processStream();

		return this;
	}

	private async processStream() {
		if (!this.audioContext) {
			throw new Error('Could not access microphone - getUserMedia not available');
		}

		await tensorflow.nextFrame();

		const mic = this.audioContext.createMediaStreamSource(this.stream);
		const minBufferSize = (this.audioContext.sampleRate / 16000) * 1024;

		let bufferSize = 4;

		while (bufferSize < minBufferSize) {
			bufferSize *= 2;
		}

		const scriptNode = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
		scriptNode.onaudioprocess = this.processMicrophoneBuffer.bind(this);

		const gain = this.audioContext.createGain();
		gain.gain.setValueAtTime(0, this.audioContext.currentTime);

		mic.connect(scriptNode);
		scriptNode.connect(gain);
		gain.connect(this.audioContext.destination);

		if (this.audioContext.state !== 'running') {
			console.warn('User gesture needed to start AudioContext, please click');
		}
	}

	async processMicrophoneBuffer(event: AudioProcessingEvent) {
		await tensorflow.nextFrame();
		/**
		 * The current pitch prediction results from the classification model.
		 * @type {Object}
		 * @public
		 */
		this.results = {};

		MLPitchDetection.resample(event.inputBuffer, (resampled) => {
			tensorflow.tidy(() => {
				if (!this.model) {
					throw new Error('Model not loaded');
				}

				const centMapping = tensorflow.add(tensorflow.linspace(0, 7180, 360), tensorflow.tensor(1997.3794084376191));

				this.running = true;

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
				const frequency = (confidence > 0.5) ? predictedHz : null;
				this.frequency = frequency;
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