interface AudioEngineOptions {
  inputAudioStream: MediaStream;
}

export class AudioEngine {
  private readonly audioContext: AudioContext;
  private readonly analyser: AnalyserNode;
  private readonly inputAudioStream: MediaStream;
  private readonly inputAudioStreamSource: MediaStreamAudioSourceNode;
  private requestAnimationFrameId?: number;
  private _currentFrequency = -1 
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
    this.inputAudioStreamSource.connect(this.analyser);
    // this.analyser.connect(this.audioContext.destination);
  }

  get currentFrequency(): number {
    return this._currentFrequency;
  }

  get isStreamingAudio(): boolean {
    return this._isStreamingAudio;
  }

  private streamInputAudio() {
    this.requestAnimationFrameId = requestAnimationFrame(() =>
      this.streamInputAudio()
    );
    this.analyser.getFloatTimeDomainData(this.frequencyData);

    this._currentFrequency = this.getFrequency(this.frequencyData, this.audioContext.sampleRate);
    this.setIsStreamingAudio(true);
  }

  private getFrequency(frequencyData: Float32Array, sampleRate: number): number {
    // Implements the ACF2+ algorithm
    var SIZE = frequencyData.length;
    var rms = 0;

    for (var i = 0; i < SIZE; i++) {
      var val = frequencyData[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) {
      // not enough signal
      return -1;
    }

    var r1 = 0,
      r2 = SIZE - 1,
      thres = 0.2;
    for (var i = 0; i < SIZE / 2; i++)
      if (Math.abs(frequencyData[i]) < thres) {
        r1 = i;
        break;
      }
    for (var i = 1; i < SIZE / 2; i++)
      if (Math.abs(frequencyData[SIZE - i]) < thres) {
        r2 = SIZE - i;
        break;
      }

    frequencyData = frequencyData.slice(r1, r2);
    SIZE = frequencyData.length;

    var c = new Array(SIZE).fill(0);
    for (var i = 0; i < SIZE; i++)
      for (var j = 0; j < SIZE - i; j++)
        c[i] = c[i] + frequencyData[j] * frequencyData[j + i];

    var d = 0;
    while (c[d] > c[d + 1]) d++;
    var maxval = -1,
      maxpos = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    var T0 = maxpos;

    var x1 = c[T0 - 1],
      x2 = c[T0],
      x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  }

  private setIsStreamingAudio(isStreamingAudio: boolean) {
    this._isStreamingAudio = isStreamingAudio;
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

    this.setIsStreamingAudio(false);
  }
}
