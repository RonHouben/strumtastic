export interface OscillatorOptions {
  type: OscillatorNode['type'];
  hertz: number;
}

export interface AudioEngineDebugOptions {
  oscillator?: OscillatorOptions;
}

interface AudioEngineOptions {
  inputAudioStream: MediaStream;
}

export class AudioEngine {
  private readonly audioContext: AudioContext;
  private readonly analyser: AnalyserNode;
  private readonly inputAudioStream: MediaStream;
  private readonly inputAudioStreamSource: MediaStreamAudioSourceNode;
  private oscillator?: OscillatorNode;
  private requestAnimationFrameId?: number;
  private _currentFrequency = -1;
  private _isStreamingAudio: boolean = false;

  public readonly bufferLength: number;
  public readonly frequencyData: Float32Array;

  constructor({ inputAudioStream }: AudioEngineOptions) {
    this.inputAudioStream = inputAudioStream;
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();

    this.analyser.fftSize = 2048;
    this.analyser.minDecibels = -50;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.85;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.frequencyData = new Float32Array(this.bufferLength);

    // connect inputAudioStreamSouce
    this.inputAudioStreamSource = this.audioContext.createMediaStreamSource(
      this.inputAudioStream
    );
    // this.analyser.connect(this.audioContext.destination);
  }

  get currentFrequency(): number {
    return this._currentFrequency;
  }

  get isStreamingAudio(): boolean {
    return this._isStreamingAudio;
  }

  private streamInputAudio(): void {
    this.requestAnimationFrameId = requestAnimationFrame(() =>
      this.streamInputAudio()
    );

    this.analyser.getFloatTimeDomainData(this.frequencyData);

    this._currentFrequency = this.getFrequency(
      this.frequencyData,
      this.audioContext.sampleRate
    );

    this.setIsStreamingAudio(true);
  }

  private getFrequency(buffer: Float32Array, sampleRate: number): number {
    // source: https://github.com/cwilso/PitchDetect
    // source: https://github.com/sablevsky/freelizer

    // Not enough signal check
    const RMS = Math.sqrt(
      buffer.reduce((acc, el) => acc + el ** 2, 0) / buffer.length
    );
    if (RMS < 0.001) return NaN;
    // console.log(RMS)
    // if (RMS < 0.2) return NaN;

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

  public startInputAudioStream(): void {
    this.inputAudioStreamSource.connect(this.analyser);

    // this is for debug purposes
    if (this.oscillator && this.oscillator?.context.state !== 'running') {
      this.oscillator.connect(this.analyser);
      this.oscillator.start();
    }

    this.streamInputAudio();
  }

  public stopInputAudioStream() {
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
  }

  public setOscillatorFrequency(frequency: number): void {
    if (this.oscillator) {
      this.oscillator.frequency.value = frequency;
    }

    console.warn(
      'No OscillatorNode has been initialised. Make sure to create an OscillatorNode first'
    );
  }
}
