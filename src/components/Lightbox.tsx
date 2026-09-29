import { useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "../content/site";
import { ease } from "../lib/ease";

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndex]);

  if (!item) return null;

  const previous = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  return (
    <m.div
      className="fixed inset-0 z-[75] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.45, ease }}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <button
        type="button"
        aria-label="Close photograph"
        className="absolute inset-0 bg-[#07060a]"
        onClick={onClose}
      />
      <img
        src={item.src}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/55" />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory"
      >
        <X size={18} strokeWidth={1.25} />
      </button>

      <button
        type="button"
        onClick={previous}
        aria-label="Previous photograph"
        className="absolute top-1/2 left-3 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 md:flex"
      >
        <ChevronLeft size={18} strokeWidth={1.25} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next photograph"
        className="absolute top-1/2 right-3 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 md:flex"
      >
        <ChevronRight size={18} strokeWidth={1.25} />
      </button>

      <figure className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5">
        <AnimatePresence mode="wait">
          <m.img
            key={item.id}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            draggable={false}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -56) next();
              else if (info.offset.x > 56) previous();
            }}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="max-h-[72svh] w-auto max-w-full object-contain"
          />
        </AnimatePresence>
        <figcaption className="mt-5 min-h-6 text-center font-serif text-lg text-ivory/85">
          {item.caption ?? ""}
        </figcaption>
        <p className="mt-2 text-[10px] tracking-[0.28em] text-ivory/45">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-2 text-gold/60">/</span>
          {String(items.length).padStart(2, "0")}
        </p>
        <div className="mt-4 flex gap-8 md:hidden">
          <button type="button" onClick={previous} className="text-[10px] tracking-[0.28em] text-ivory/70 uppercase">
            Previous
          </button>
          <button type="button" onClick={next} className="text-[10px] tracking-[0.28em] text-ivory/70 uppercase">
            Next
          </button>
        </div>
      </figure>
    </m.div>
  );
}
