import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { gallery, galleryCopy, type GalleryItem } from "../content/site";
import { ease } from "../lib/ease";
import { Lightbox } from "./Lightbox";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<GalleryItem | null>(null);

  return (
    <section id="photographs" className="relative overflow-hidden px-4 py-24 sm:px-8 md:px-14 md:py-32 lg:px-20">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <AnimatePresence>
          {hovered && (
            <m.img
              key={hovered.id}
              src={hovered.src}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.16 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-3xl"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-ink/55" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] tracking-[0.38em] text-rose uppercase">{galleryCopy.kicker}</p>
          <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight font-medium text-ivory sm:text-5xl">
            {galleryCopy.line}
          </h2>
        </Reveal>

        <div
          className="mt-12 grid grid-cols-2 items-start gap-3 md:gap-4 lg:mt-16 lg:grid-cols-12"
          onMouseLeave={() => setHovered(null)}
        >
          {gallery.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.alt}
              onClick={() => setOpen(index)}
              onMouseEnter={() => setHovered(item)}
              onFocus={() => setHovered(item)}
              className={`group relative block overflow-hidden text-left ring-1 ring-white/5 ${item.frame}`}
            >
              <Photo
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                objectPosition={item.objectPosition}
                className="h-full w-full"
                imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
              />
              {item.caption && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pt-16 pb-4 font-serif text-[0.95rem] text-ivory opacity-0 transition duration-700 group-hover:opacity-100 md:block">
                  {item.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            items={gallery}
            index={open}
            onClose={() => setOpen(null)}
            onIndex={(next) => setOpen(next)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
