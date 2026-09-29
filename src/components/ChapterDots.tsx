import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { chapters } from "../content/site";

export function ChapterDots() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>(chapters[0].id);

  useEffect(() => {
    const nodes = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.45], rootMargin: "-15% 0px -45% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col gap-3">
        {chapters.map((chapter) => {
          const current = chapter.id === active;
          return (
            <li key={chapter.id}>
              <button
                type="button"
                aria-label={chapter.label}
                aria-current={current ? "true" : undefined}
                onClick={() =>
                  document.getElementById(chapter.id)?.scrollIntoView({
                    behavior: reduce ? "auto" : "smooth",
                    block: "start",
                  })
                }
                className="group flex items-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    current ? "h-6 w-px bg-gold" : "h-1.5 w-1.5 bg-ivory/30 group-hover:bg-ivory/70"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
