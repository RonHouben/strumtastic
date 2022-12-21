'use client';

import { useEffect, useRef } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine.old';

export const WaveFormAnayliser = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { frequencyData, bufferLength, isStreamingAudio } = useAudioEngine();

  // initialise canvas to draw when frequencyData changes
  useEffect(() => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');

      let requestAnimationFrameId = 0;

      if (!isStreamingAudio) {
        cancelAnimationFrame(requestAnimationFrameId);
      }

      if (canvasCtx && frequencyData) {
        const draw = () => {
          requestAnimationFrameId = requestAnimationFrame(draw);

          const WIDTH = canvasCtx.canvas.width;
          const HEIGHT = canvasCtx.canvas.height;

          canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
          canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = 'rgb(255, 0, 0)';
          canvasCtx.beginPath();
          canvasCtx.moveTo(0, HEIGHT / 2)

          for (let i = 1; i < WIDTH ; i++) {
            canvasCtx.lineTo(i, (HEIGHT / 2 )+(frequencyData[i]*128))
          }

          canvasCtx.lineTo(WIDTH, HEIGHT / 2);
          canvasCtx.stroke();
        };

        draw();
      }

      return () => {
        cancelAnimationFrame(requestAnimationFrameId);
      };
    }
  }, [canvasRef, bufferLength, frequencyData, isStreamingAudio]);

  return <canvas ref={canvasRef} />;
};
