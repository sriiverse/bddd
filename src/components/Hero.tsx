import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { hero } from "../content/site";
import { ParticleBackground } from "./ParticleBackground";
import { Reveal } from "./Reveal";
import { ScrollHint } from "./ScrollHint";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="for-maya"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-16 sm:px-8 md:px-12 md:py-20 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-24">
        <div className="order-2 min-w-0 lg:order-1 lg:py-10">
          <Reveal>
            <p className="text-[11px] tracking-[0.38em] text-rose uppercase">{hero.kicker}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-6 font-serif text-[clamp(2.4rem,8vw,3.75rem)] leading-[1.05] font-medium text-ivory">
              {hero.salute}
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 max-w-md font-serif text-[clamp(1.25rem,3.4vw,1.7rem)] leading-snug text-balance text-ivory/86">
              {hero.body}
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <p className="mt-8 max-w-sm font-serif text-xl text-ivory/68 italic">{hero.closing}</p>
          </Reveal>
          <Reveal delay={0.46} className="mt-14 md:mt-16">
            <ScrollHint className="text-left">{hero.hint}</ScrollHint>
          </Reveal>
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <div className="relative mx-auto w-full max-w-[36rem] p-2.5 sm:p-3 lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 border border-ivory/15" />
            <div className="pointer-events-none absolute inset-[7px] border border-gold/20" />
            <div className="relative aspect-[4/3] overflow-hidden bg-dusk">
              <m.div style={reduce ? undefined : { y }} className="absolute inset-[-3%]">
                <img
                  src={hero.src}
                  alt={hero.alt}
                  width={hero.width}
                  height={hero.height}
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                  style={{ objectPosition: hero.objectPosition }}
                  className={`h-full w-full object-cover ${reduce ? "" : "kenburns"}`}
                />
              </m.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-gold/15 mix-blend-soft-light" />
              <ParticleBackground variant="dust" className="opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
