export class AudioProcessorNode extends AudioWorkletNode {
  constructor(audioContext: AudioContext, options?: AudioWorkletNodeOptions) {
    super(audioContext, 'audio-processor', options);
  }
}