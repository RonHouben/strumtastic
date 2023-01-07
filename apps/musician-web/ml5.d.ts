declare module 'ml5' {
  export function pitchDetection(
    modelPath: string,
    audioContext: AudioContext,
    micStream: MediaStream,
    callback: () => void
  ): PitchDetector;

  export class PitchDetector {
    /**
     * The pitch detection model.
     * @type {model}
     * @public
     */
    public readonly model: unknown;

    /**
     * The AudioContext instance. Contains sampleRate, currentTime, state, baseLatency.
     * @type {AudioContext}
     * @public
     */
    public readonly audioContext: AudioContext;

    /**
     * The current pitch prediction results from the classification model.
     * @type {Result[]}
     * @public
     */
    public readonly results: Result[];

    /**
     * Shows wether or not the model is running. Contains a boolean.
     * @type {boolean}
     * @public
     */
    public readonly running: boolean;

    /**
     * The MediaStream instance. Contains an id and a boolean active value.
     * @type {MediaStream}
     * @public
     */
    public readonly stream: {
      id: string;
      active: boolean;
    };

    getPitch(callback?: () => void): Promise<number>;
  }

	type Result = {
		confidence: string;	
	}
}
