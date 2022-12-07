<script lang="ts">
	import { AudioEngine } from '../utils/audio-engine';
	import { onMount } from 'svelte';
	import type { MusicNote } from 'src/constants/musicnotes.constant';

	let canvasRef: HTMLCanvasElement | null;
	let canvasCtx: CanvasRenderingContext2D | null;
	let audioEngine: AudioEngine;
	let frequency = 0;
	let pitch = 0;
	let musicNote: MusicNote | undefined;

	onMount(() => {
		init();
	});

	function init() {
		if (!canvasRef) {
			throw new Error('Unable to find canvas element!');
		}

		canvasCtx = canvasRef.getContext('2d');
	}

	async function start() {
		const inputAudioStream = await window.navigator.mediaDevices.getUserMedia({
			audio: true
		});

		audioEngine = new AudioEngine({ inputAudioStream });

		audioEngine.startInputAudioStream();

		draw();
	}

	function draw() {
		const drawVisual = requestAnimationFrame(() => draw());

		frequency = audioEngine.currentFrequency;
		pitch = audioEngine.currentPitch;
		musicNote = audioEngine.currentMusicNote;

		const WIDTH = canvasRef!.width;
		const HEIGHT = canvasRef!.height;

		canvasCtx!.clearRect(0, 0, WIDTH, HEIGHT);
		canvasCtx!.fillStyle = 'rgb(0, 0, 0)';
		canvasCtx!.fillRect(0, 0, WIDTH, HEIGHT);
		canvasCtx!.lineWidth = 2;
		canvasCtx!.strokeStyle = 'rgb(255, 0, 0)';
		canvasCtx!.beginPath();

		const bufferLength = audioEngine.bufferLength;
		const sliceWidth = WIDTH / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = audioEngine.frequencyData[i] / 128.0;
			const y = v * (HEIGHT / 2);

			if (i === 0) {
				canvasCtx!.moveTo(x, y);
			} else {
				canvasCtx!.lineTo(x, y);
			}

			x += sliceWidth;
		}

		canvasCtx!.lineTo(WIDTH, HEIGHT / 2);
		canvasCtx!.stroke();
	}

	function stop() {
		audioEngine.stopInputAudioStream();
	}
</script>

<div class="container">
	<canvas bind:this={canvasRef} />
	<button on:click={start}>start</button>
	<button on:click={stop}>stop</button>

	<span>hertz: {Math.floor(frequency * 100) / 100}</span>
	<span>pitch: {pitch}</span>
	<span>music note: {JSON.stringify(musicNote)}</span>
</div>
