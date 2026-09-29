import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memories } from "../content/site";
import { ease } from "../lib/ease";
import { MemoryCard } from "./MemoryCard";
import { ScrollHint } from "./ScrollHint";

export function MemoryTimeline() {
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(memories[0]?.id ?? "");
  const active = memories.find((memory) => memory.id === activeId) ?? memories[0];
  const activeIndex = Math.max(
    0,
    memories.findIndex((memory) => memory.id === activeId),
  );

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-memory]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("data-memory");
        if (id) setActiveId(id);
      },
      { root, threshold: [0.5, 0.72] },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollByCard = (direction: number) => {
    const root = scroller.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>("[data-memory]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    root.scrollBy({
      left: direction * amount,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const centerCard = (id: string) => {
    const root = scroller.current;
    const card = root?.querySelector<HTMLElement>(`[data-memory="${id}"]`);
    card?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section id="little-things" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <AnimatePresence mode="sync">
          {active && (
            <m.img
              key={active.id}
              src={active.src}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease }}
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-3xl"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,163,158,0.09), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 md:px-14 lg:px-20">
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.38em] text-rose uppercase">Moments</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,7vw,3rem)] font-medium text-ivory">
              The little things
            </h2>
          </div>
          <p className="pb-1 font-sans text-[11px] tracking-[0.28em] text-ivory/55">
            <span className="text-ivory">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-gold/70">/</span>
            <span>{String(memories.length).padStart(2, "0")}</span>
          </p>
        </div>

        <div className="mt-6 hidden justify-end gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous memory"
            onClick={() => scrollByCard(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-colors hover:border-gold/50 hover:text-ivory"
          >
            <ChevronLeft size={16} strokeWidth={1.25} />
          </button>
          <button
            type="button"
            aria-label="Next memory"
            onClick={() => scrollByCard(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-colors hover:border-gold/50 hover:text-ivory"
          >
            <ChevronRight size={16} strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="filmstrip no-scrollbar relative mt-8 flex gap-5 overflow-x-auto px-[11vw] pt-2 pb-4 md:mt-6 md:gap-6 md:px-[calc(50%-190px)]"
      >
        {memories.map((memory, index) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            index={index}
            active={memory.id === activeId}
            onSelect={() => centerCard(memory.id)}
          />
        ))}
      </div>

      <div className="relative mt-8">
        <ScrollHint>there&apos;s more</ScrollHint>
      </div>
    </section>
  );
}
