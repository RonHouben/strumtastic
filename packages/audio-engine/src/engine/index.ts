import { IMusicNote, MusicNotes } from 'music-notes';
import { ML5PitchDetector } from '../types/ml5-pitchdetector';

interface OscillatorOptions {
  type: OscillatorNode['type'];
  hertz: number;
}

interface AudioEngineDebugOptions {
  oscillator?: OscillatorOptions;
}

interface AudioEngineOptions {
  mediaStream: MediaStream;
}

export class AudioEngine {
  private readonly audioContext: AudioContext;
  private readonly analyserNode: AnalyserNode;
  private readonly mediaStream: MediaStream;
  private readonly mediaStreamSourceNode: MediaStreamAudioSourceNode;
  // TODO: chech this can be loaded in from the library instead of a CDN
  private readonly pitchDetectionModelPath: string =
    'https://cdn.jsdelivr.net/gh/ml5js/ml5-library/examples/javascript/PitchDetection/PitchDetection/model';
  private pitchDetector?: ML5PitchDetector;
  private oscillator?: OscillatorNode;
  private requestAnimationFrameId?: number;

  private _currentFrequency = -1;
  private _currentMusicNote?: IMusicNote;
  private _isAIPitchDetectorInitialized: boolean = false;
  private _isStreamingAudio: boolean = false;
  private _isOscillatorRunning: boolean = false;
  private _useAIPitchDetection: boolean = false;

  public readonly bufferLength: number;
  public readonly frequencyData: Float32Array;

  constructor({ mediaStream }: AudioEngineOptions) {
    this.mediaStream = mediaStream;
    this.audioContext = new AudioContext();

    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;
    this.analyserNode.minDecibels = -100;
    this.analyserNode.maxDecibels = -10;
    this.analyserNode.smoothingTimeConstant = 0.85;

    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.frequencyData = new Float32Array(this.bufferLength);

    // connect inputAudioStreamSouce
    this.mediaStreamSourceNode = this.audioContext.createMediaStreamSource(
      this.mediaStream
    );

    // this.analyser.connect(this.audioContext.destination);
  }

  get currentFrequency(): number {
    return this._currentFrequency;
  }

  get currentMusicNote(): IMusicNote | undefined {
    return this._currentMusicNote;
  }

  get isStreamingAudio(): boolean {
    return this._isStreamingAudio;
  }

  get isAIPitchDetectorInitialized(): boolean {
    return this._isAIPitchDetectorInitialized;
  }

  get isOscillatorCreated(): boolean {
    return this.oscillator !== undefined;
  }

  get isOscillatorRunning(): boolean {
    return this._isOscillatorRunning;
  }

  get useAIPitchDetection(): boolean {
    return this._useAIPitchDetection;
  }

  private async streamInputAudio(): Promise<void> {
    this.requestAnimationFrameId = requestAnimationFrame(() =>
      this.streamInputAudio()
    );

    this.analyserNode.getFloatTimeDomainData(this.frequencyData);

    this._currentFrequency = await this.getFrequency(
      this.frequencyData,
      this.audioContext.sampleRate
    );

    this._currentMusicNote = MusicNotes.getMusicNoteFromFrequency(this._currentFrequency);

    this.setIsStreamingAudio(true);
  }

  private async getFrequency(
    frequencyData: Float32Array,
    sampleRate: number
  ): Promise<number> {
    // RMS = root-mean-square value of a signal
    // https://en.wikipedia.org/wiki/Root_mean_square#RMS_in_frequency_domain
    const rms = Math.sqrt(
      frequencyData.reduce((acc, el) => acc + el ** 2, 0) / frequencyData.length
    );
    const hasEnoughSignal = rms < 0.2;

    if (hasEnoughSignal) {
      if (this.useAIPitchDetection) {
        return this.getAIPitchDetectionFrequency();
      } else {
        return this.getAutoCorrelateFrequency(frequencyData, sampleRate);
      }
    }

    return -1;
  }

  private getAIPitchDetectionFrequency(): Promise<number> {
    if (!this.pitchDetector) {
      throw new Error('AI Pitch Detection has not been initialised!');
    }

    return this.pitchDetector.getPitch();
  }

  private getAutoCorrelateFrequency(
    buffer: Float32Array,
    sampleRate: number
  ): number {
    // ACF2+ algorithm
    // source: https://github.com/cwilso/PitchDetect
    // source: https://github.com/sablevsky/freelizer

    const THRES = 0.2;
    let r1 = 0;
    let r2 = buffer.length - 1;
    for (let i = 0; i < buffer.length / 2; ++i) {
      if (Math.abs(buffer[i]) < THRES) {
        r1 = i;
        break;
      }
    }
    for (let i = 1; i < buffer.length / 2; ++i) {
      if (Math.abs(buffer[buffer.length - i]) < THRES) {
        r2 = buffer.length - i;
        break;
      }
    }

    const buf2 = buffer.slice(r1, r2);
    const c = new Array(buf2.length).fill(0);
    for (let i = 0; i < buf2.length; ++i) {
      for (let j = 0; j < buf2.length - i; ++j) {
        c[i] = c[i] + buf2[j] * buf2[j + i];
      }
    }

    let d = 0;
    for (; c[d] > c[d + 1]; ++d);

    let maxval = -1;
    let maxpos = -1;
    for (let i = d; i < buf2.length; ++i) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    let T0 = maxpos;

    let x1 = c[T0 - 1];
    let x2 = c[T0];
    let x3 = c[T0 + 1];
    let a = (x1 + x3 - 2 * x2) / 2;
    let b = (x3 - x1) / 2;

    return sampleRate / (a ? T0 - b / (2 * a) : T0);
  }

  private setIsStreamingAudio(isStreamingAudio: boolean): void {
    this._isStreamingAudio = isStreamingAudio;
  }

  public startListeningToMicrophone(): void {
    this.mediaStreamSourceNode.connect(this.analyserNode);

    // this is for debug purposes
    if (this.oscillator && this.oscillator?.context.state !== 'running') {
      this.oscillator.connect(this.analyserNode);
      this.oscillator.start();
    }

    this.streamInputAudio();
  }

  public stopListeningToMicrophone(): void {
    if (this.oscillator && this.oscillator.context.state === 'running') {
      this.oscillator.stop();
    }

    if (!this.requestAnimationFrameId) {
      console.warn('Unable to find requestAnimationFrameId');
    } else {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = undefined;
    }

    this.setIsStreamingAudio(false);
  }

  public createOscilator(options: OscillatorOptions): void {
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = options.type;
    this.oscillator.frequency.setValueAtTime(
      options.hertz,
      this.audioContext.currentTime
    );
    this.oscillator.start();
    this._isOscillatorRunning = true;
  }

  public setOscillatorFrequency(frequency: number): void {
    if (this.oscillator) {
      this.oscillator.frequency.value = frequency;
    }

    console.warn(
      'No OscillatorNode has been initialised. Make sure to create an OscillatorNode first'
    );
  }

  public async initAIPitchDetection(): Promise<void> {
    // dynamically import is necesary because when importing ML5
    // it looks for the `window` object. Since we're using NextJS
    // it happens that the window doesn't exists due to SSR.
    // it's also not necesary to have the complete ML5 library loaded
    // if the user doesn't want to use AI.
    const ml5 = await import('ml5');

    this.pitchDetector = ml5.pitchDetection(
      this.pitchDetectionModelPath,
      this.audioContext,
      this.mediaStream,
      () => {
        console.info('ml5 pitchDetection model has been loaded');
      }
    );

    this._isAIPitchDetectorInitialized = true;
  }

  public setUseAIPitchDetection(useAI: boolean): void {
    this._useAIPitchDetection = useAI; 
  }
}
