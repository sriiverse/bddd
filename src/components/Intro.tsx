import { useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { intro } from "../content/site";
import { ease } from "../lib/ease";
import { ParticleBackground } from "./ParticleBackground";

export function Intro({ onBegin }: { onBegin: () => void }) {
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, delay, ease },
        };

  const begin = () => {
    if (leaving) return;
    setLeaving(true);
    onBegin();
  };

  return (
    <m.div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-ink pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3, ease }}
    >
      <ParticleBackground variant="dust" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="float-slow absolute top-[18%] -left-16 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />
        <div className="float-slower absolute right-[-3rem] bottom-[16%] h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <m.p
          {...line(0.8)}
          className="font-serif text-[clamp(1.15rem,4.6vw,1.7rem)] leading-relaxed text-balance text-ivory/78 italic"
        >
          {intro.lineOne}
        </m.p>
        <m.p
          {...line(2.5)}
          className="mt-3 font-serif text-[clamp(1.15rem,4.6vw,1.7rem)] leading-relaxed text-balance text-ivory/78 italic"
        >
          {intro.lineTwo}
        </m.p>
        <m.p
          {...line(4.7)}
          className="mt-12 font-serif text-[clamp(1.45rem,5.4vw,2.25rem)] leading-tight text-balance text-ivory"
        >
          {intro.turn}
        </m.p>
        <m.div {...line(6.6)} className="mt-14 w-full">
          <span className="mx-auto mb-6 block h-px w-10 bg-gold/80" />
          <p className="font-serif text-[clamp(2.35rem,11vw,4.5rem)] leading-none font-medium tracking-tight text-balance text-ivory">
            {intro.title}
          </p>
        </m.div>
        <m.div {...line(8)}>
          <button
            ref={buttonRef}
            type="button"
            onClick={begin}
            onPointerMove={(event) => {
              if (event.pointerType !== "mouse" || !buttonRef.current) return;
              const rect = buttonRef.current.getBoundingClientRect();
              const x = event.clientX - (rect.left + rect.width / 2);
              const y = event.clientY - (rect.top + rect.height / 2);
              buttonRef.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.28}px, 0)`;
            }}
            onPointerLeave={() => {
              if (buttonRef.current) buttonRef.current.style.transform = "";
            }}
            className="group mt-16 flex flex-col items-center gap-3 transition-opacity duration-500"
          >
            <span className="text-[11px] tracking-[0.42em] text-gold uppercase">{intro.enter}</span>
            <span className="h-px w-8 bg-ivory/45 transition-all duration-700 group-hover:w-16" />
          </button>
        </m.div>
      </div>
    </m.div>
  );
}
