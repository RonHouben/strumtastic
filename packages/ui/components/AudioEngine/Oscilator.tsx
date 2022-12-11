'use client';

import { useEffect, useRef } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';

export const Oscilator = () => {
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

          const sliceWidth = WIDTH / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = frequencyData[i] / 128.0;
            const y = v * (HEIGHT / 2);

            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
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
