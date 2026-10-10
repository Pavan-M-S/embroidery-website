import { useEffect, useRef } from 'react';

type Theme = 'light' | 'dark';
type Stitch = { x: number; y: number; vx: number; vy: number; size: number; phase: number };
type Ripple = { x: number; y: number; startedAt: number };

const TAU = Math.PI * 2;

export function InteractiveBackground({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -1000, y: -1000, active: false };
    const stitches: Stitch[] = [];
    const ripples: Ripple[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.min(56, Math.max(16, Math.round((width * height) / 26000)));
      stitches.length = 0;
      for (let index = 0; index < count; index += 1) {
        stitches.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: 1 + Math.random() * 1.2,
          phase: Math.random() * TAU,
        });
      }
    };

    const draw = (time: number) => {
      frame = 0;
      context.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';
      const rose = isDark ? '244,126,157' : '205,67,91';
      const coral = isDark ? '250,170,112' : '218,117,81';
      const linkColor = isDark ? '224,137,157' : '175,83,94';

      for (let index = 0; index < stitches.length; index += 1) {
        const stitch = stitches[index];
        if (!reducedMotion && pointer.active) {
          const dx = pointer.x - stitch.x;
          const dy = pointer.y - stitch.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 1 && distance < 175) {
            const pull = (1 - distance / 175) * 0.012;
            stitch.vx += (dx / distance) * pull;
            stitch.vy += (dy / distance) * pull;
          }
        }

        if (!reducedMotion) {
          stitch.x += stitch.vx;
          stitch.y += stitch.vy;
          stitch.vx *= 0.992;
          stitch.vy *= 0.992;
          if (stitch.x < -12) stitch.x = width + 12;
          if (stitch.x > width + 12) stitch.x = -12;
          if (stitch.y < -12) stitch.y = height + 12;
          if (stitch.y > height + 12) stitch.y = -12;
        }

        for (let otherIndex = index + 1; otherIndex < stitches.length; otherIndex += 1) {
          const other = stitches[otherIndex];
          const distance = Math.hypot(stitch.x - other.x, stitch.y - other.y);
          if (distance < 125) {
            const opacity = (1 - distance / 125) * (isDark ? 0.12 : 0.09);
            context.strokeStyle = `rgba(${linkColor},${opacity})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(stitch.x, stitch.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }

        const shimmer = reducedMotion ? 0.78 : 0.62 + Math.sin(time * 0.0012 + stitch.phase) * 0.12;
        context.fillStyle = `rgba(${index % 4 === 0 ? coral : rose},${shimmer})`;
        context.beginPath();
        context.arc(stitch.x, stitch.y, stitch.size, 0, TAU);
        context.fill();

        context.save();
        context.translate(stitch.x, stitch.y);
        context.rotate(stitch.phase);
        context.fillStyle = `rgba(${index % 4 === 0 ? coral : rose},${shimmer * 0.7})`;
        context.fillRect(-3.5, -0.45, 7, 0.9);
        context.restore();
      }

      if (!reducedMotion && pointer.active) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 54);
        glow.addColorStop(0, `rgba(${rose},0.08)`);
        glow.addColorStop(1, `rgba(${rose},0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 54, 0, TAU);
        context.fill();
      }

      const rippleLifetime = 900;
      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        const progress = (time - ripple.startedAt) / rippleLifetime;
        if (progress >= 1) {
          ripples.splice(index, 1);
          continue;
        }
        const radius = 8 + progress * 78;
        context.strokeStyle = `rgba(${coral},${(1 - progress) * 0.26})`;
        context.lineWidth = 1.1;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, TAU);
        context.stroke();
        context.strokeStyle = `rgba(${rose},${(1 - progress) * 0.16})`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius * 0.72, 0, TAU);
        context.stroke();
      }

      if (!reducedMotion && !document.hidden) frame = window.requestAnimationFrame(draw);
    };

    const redraw = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      draw(performance.now());
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = event.pointerType !== 'touch';
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!reducedMotion && event.isPrimary && event.button === 0) {
        ripples.push({ x: event.clientX, y: event.clientY, startedAt: performance.now() });
        if (ripples.length > 4) ripples.shift();
        if (!frame) frame = window.requestAnimationFrame(draw);
      }
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      redraw();
    };
    const onVisibilityChange = () => {
      if (document.hidden) window.cancelAnimationFrame(frame);
      else redraw();
    };

    resize();
    redraw();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('resize', redraw, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    motionQuery.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', redraw);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      motionQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-background" aria-hidden="true" />;
}
