import type { Memory } from "../content/site";
import { Photo } from "./Photo";

export function MemoryCard({
  memory,
  index,
  active,
  onSelect,
}: {
  memory: Memory;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      data-memory={memory.id}
      className={`group w-[78vw] shrink-0 snap-center transition-all duration-700 sm:w-[46vw] md:w-[340px] lg:w-[380px] ${
        active ? "scale-100 opacity-100" : "scale-[0.97] opacity-70"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`block w-full text-left transition-shadow duration-700 ${
          active ? "shadow-[0_24px_80px_rgba(203,184,146,0.14)]" : ""
        }`}
      >
        <div className="relative overflow-hidden ring-1 ring-ivory/10">
          <Photo
            src={memory.src}
            alt={memory.alt}
            width={memory.width}
            height={memory.height}
            objectPosition={memory.objectPosition}
            className="aspect-[3/4]"
            imgClassName={`transition-transform duration-[1400ms] ease-out ${
              active ? "scale-[1.05]" : "scale-100 md:group-hover:scale-[1.05]"
            }`}
          />
          <span className="pointer-events-none absolute top-3 left-3 text-[10px] tracking-[0.28em] text-ivory/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
              active ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(120% 80% at 50% 100%, rgba(203,184,146,0.18), transparent 55%)",
            }}
          />
        </div>
        <p
          className={`mt-4 min-h-[4.4rem] font-serif text-[1.2rem] leading-snug text-ivory transition-opacity duration-700 ${
            active ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
          }`}
        >
          {memory.caption}
        </p>
      </button>
    </article>
  );
}
