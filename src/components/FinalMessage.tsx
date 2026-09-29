import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { ending } from "../content/site";
import { ease } from "../lib/ease";
import { ParticleBackground } from "./ParticleBackground";

export function FinalMessage() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const [step, setStep] = useState(reduce ? ending.lines.length - 1 : -1);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    const delays = [600, 2500, 4600, 7000, 9600];
    const timers = delays.map((delay, index) =>
      window.setTimeout(() => {
        setStep((current) => Math.max(current, index));
      }, delay),
    );
    const fadeTimer = window.setTimeout(() => setFading(true), 13200);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(fadeTimer);
    };
  }, [inView, reduce]);

  const advance = () => {
    if (fading) return;
    setStep((current) => Math.min(ending.lines.length - 1, current + 1));
  };

  return (
    <section
      id="last"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#07060a] px-6"
      onClick={advance}
    >
      <ParticleBackground variant="stars" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_40px_rgba(0,0,0,0.55)]" />

      <div
        className={`relative z-10 mx-auto max-w-3xl text-center transition-opacity duration-[2800ms] ease-out ${
          fading && !reduce ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="space-y-7">
          {ending.lines.map((line, index) => {
            const visible = index <= step;
            const birthday = index === 3;
            return (
              <p
                key={line}
                className={`font-serif transition-all duration-1000 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                } ${
                  birthday
                    ? "pt-4 text-[clamp(1.9rem,8vw,3.5rem)] leading-none text-balance text-ivory"
                    : index === ending.lines.length - 1
                      ? "text-[clamp(1.05rem,3.2vw,1.5rem)] text-ivory/75 italic"
                      : "text-[clamp(1.2rem,4vw,1.85rem)] leading-snug text-balance text-ivory/88"
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>

      <m.p
        initial={false}
        animate={{ opacity: fading && !reduce ? 0.45 : 0 }}
        transition={{ delay: fading ? 2.4 : 0, duration: 1.6, ease }}
        className="absolute bottom-[max(5.25rem,calc(env(safe-area-inset-bottom)+4.75rem))] left-0 w-full text-center text-[10px] tracking-[0.46em] text-ivory uppercase"
      >
        {ending.credit}
      </m.p>
    </section>
  );
}
