import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ThreadCanvasProps {
  className?: string;
}

export const ThreadCanvas: React.FC<ThreadCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      if (prefersReducedMotion) drawStaticThread();
    };

    window.addEventListener('resize', handleResize);

    // Embroidery thread strand definitions
    const strands = [
      {
        color: isDark ? 'rgba(251, 113, 133, 0.28)' : 'rgba(244, 63, 94, 0.22)',
        width: 1.5,
        speed: 0.0006,
        offset: 0,
        amplitude: 45,
        yRatio: 0.35,
      },
      {
        color: isDark ? 'rgba(253, 186, 116, 0.25)' : 'rgba(251, 146, 60, 0.2)',
        width: 1.8,
        speed: 0.0004,
        offset: Math.PI / 3,
        amplitude: 55,
        yRatio: 0.52,
      },
      {
        color: isDark ? 'rgba(254, 205, 211, 0.2)' : 'rgba(225, 29, 72, 0.15)',
        width: 1.2,
        speed: 0.0007,
        offset: Math.PI / 1.5,
        amplitude: 35,
        yRatio: 0.68,
      },
    ];

    let t = 0;

    const drawStaticThread = () => {
      ctx.clearRect(0, 0, width, height);
      strands.forEach((strand) => {
        ctx.beginPath();
        ctx.lineWidth = strand.width;
        ctx.strokeStyle = strand.color;
        ctx.setLineDash([8, 8]); // Running stitch style

        const baseY = height * strand.yRatio;
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= width; x += 30) {
          const y = baseY + Math.sin(x * 0.004 + strand.offset) * strand.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });
    };

    if (prefersReducedMotion) {
      drawStaticThread();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      strands.forEach((strand) => {
        ctx.beginPath();
        ctx.lineWidth = strand.width;
        ctx.strokeStyle = strand.color;
        ctx.setLineDash([9, 9]); // Running stitch dashed look

        const baseY = height * strand.yRatio;
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= width; x += 25) {
          const wave =
            Math.sin(x * 0.0035 + t * strand.speed * 60 + strand.offset) * strand.amplitude;
          const subtleHarmonic =
            Math.cos(x * 0.007 + t * strand.speed * 40) * (strand.amplitude * 0.3);
          ctx.lineTo(x, baseY + wave + subtleHarmonic);
        }

        ctx.stroke();
        ctx.setLineDash([]);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
};
