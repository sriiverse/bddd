import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  r: number;
  s: number;
  a: number;
  tw: number;
};

export function ParticleBackground({
  variant = "dust",
  className = "",
}: {
  variant?: "dust" | "stars";
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const count = variant === "stars" ? 64 : 26;
    let particles: Particle[] = [];

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: variant === "stars" ? Math.random() * 1.25 + 0.2 : Math.random() * 1.5 + 0.35,
        s: variant === "stars" ? Math.random() * 0.07 + 0.015 : Math.random() * 0.14 + 0.03,
        a: Math.random() * 0.4 + 0.12,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (time: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        if (!reduce) {
          particle.y -= particle.s;
          particle.tw += 0.01;
          if (particle.y < -4) {
            particle.y = height + 4;
            particle.x = Math.random() * width;
          }
        }
        const alpha = reduce
          ? particle.a * 0.7
          : particle.a * (0.62 + Math.sin(particle.tw + time * 0.001) * 0.38);
        ctx.beginPath();
        ctx.fillStyle =
          variant === "stars"
            ? `rgba(244, 239, 230, ${alpha})`
            : `rgba(228, 206, 168, ${alpha * 0.85})`;
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);

    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry?.isIntersecting ?? false;
      if (visible && !running && !reduce) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    observer.observe(parent);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [reduce, variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
