import { useRef, useState } from "react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ease } from "../lib/ease";

export function ScrollStory({
  id,
  kicker,
  lines,
  emphasizeLast = false,
  hint,
  className = "",
}: {
  id: string;
  kicker?: string;
  lines: readonly string[];
  emphasizeLast?: boolean;
  hint?: string;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    const next = Math.min(lines.length - 1, Math.floor(value * lines.length * 0.9999));
    setIndex((current) => (current === next ? current : next));
  });

  const goTo = (nextIndex: number) => {
    const section = ref.current;
    if (!section) return;
    const distance = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const progress = lines.length <= 1 ? 0 : (nextIndex + 0.45) / lines.length;
    window.scrollTo({
      top: top + distance * progress + 4,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const advance = () => {
    if (index >= lines.length - 1) {
      const next = ref.current?.nextElementSibling;
      if (next instanceof HTMLElement) {
        next.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
      return;
    }
    goTo(index + 1);
  };

  if (reduce) {
    return (
      <section id={id} className={`px-6 py-24 ${className}`}>
        <div className="mx-auto max-w-3xl">
          {kicker && (
            <h2 className="text-center text-[11px] tracking-[0.35em] text-rose uppercase">{kicker}</h2>
          )}
          <div className="mt-12 space-y-16">
            {lines.map((line, lineIndex) => (
              <p
                key={line}
                className={`text-center font-serif leading-snug text-balance text-ivory ${
                  emphasizeLast && lineIndex === lines.length - 1
                    ? "text-[clamp(2rem,8vw,3.75rem)]"
                    : "text-[clamp(1.3rem,4vw,2.4rem)]"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const line = lines[index] ?? "";
  const quiet = line.trim().startsWith("...");
  const last = emphasizeLast && index === lines.length - 1;

  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{ height: `calc(${lines.length} * 58svh + 100svh)` }}
    >
      <div className="sr-only">
        {kicker && <h2>{kicker}</h2>}
        {lines.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <div
        className="sticky top-0 flex h-svh flex-col items-center justify-center pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] text-center"
        onClick={advance}
      >
        {kicker && (
          <p
            aria-hidden
            className="absolute top-[16%] text-[11px] tracking-[0.36em] text-rose uppercase"
          >
            {kicker}
          </p>
        )}
        <div aria-hidden className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <m.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.75, ease }}
            >
              {last && <span className="mx-auto mb-8 block h-px w-10 bg-gold/80" />}
              <p
                className={`font-serif text-balance text-ivory ${
                  last
                    ? "text-[clamp(2.15rem,8vw,4.5rem)] leading-[1.05]"
                    : "text-[clamp(1.35rem,4.4vw,2.65rem)] leading-[1.35]"
                } ${quiet ? "italic" : ""}`}
              >
                {line}
              </p>
            </m.div>
          </AnimatePresence>
          <div className="mt-12 flex items-center justify-center gap-2">
            {lines.map((item, dash) => (
              <span
                key={item}
                className={`block h-px transition-all duration-500 ${
                  dash === index ? "w-8 bg-gold" : "w-3 bg-ivory/25"
                }`}
              />
            ))}
          </div>
          {hint && index === 0 && (
            <p className="mt-8 text-[10px] tracking-[0.34em] text-ivory/35 uppercase">{hint}</p>
          )}
        </div>
      </div>
    </section>
  );
}
