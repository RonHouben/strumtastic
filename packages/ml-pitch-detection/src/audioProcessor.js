export class AudioProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super(options);

    // this.port.onmessage = event => {
      // if (event.data.type === 'init') {
        // this.sharedArray = new Float32Array(event.data.payload.array);
      // }
    // }
  }

  process(inputs, outputs, parameters) {
    // this.sharedArray = inputs[0];
    this.port.postMessage({ type: 'update', payload: { input: inputs[0][0] } })

    return true;
  }
}

registerProcessor("audio-processor", AudioProcessor);
