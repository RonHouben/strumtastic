'use client';

import { useEffect, useRef } from 'react';
import { useGlobalState } from '../../hooks/useGlobalState';

export const WaveFormAnayliser = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { audioEngine } = useGlobalState();

  // initialise canvas to draw when frequencyData changes
  useEffect(() => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');

      let requestAnimationFrameId = 0;

      if (!audioEngine.state.matches('listeningToMicrophone')) {
        cancelAnimationFrame(requestAnimationFrameId);
      }

      if (canvasCtx && audioEngine.state.matches('listeningToMicrophone')) {
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
          canvasCtx.moveTo(0, HEIGHT / 2);

          for (let i = 1; i < WIDTH; i++) {
            canvasCtx.lineTo(
              i,
              HEIGHT / 2 +
                (audioEngine.state.context.audioEngine?.frequencyData[i] || 0) * 128
            );
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
  }, [canvasRef, audioEngine]);

  return <canvas ref={canvasRef} />;
};
