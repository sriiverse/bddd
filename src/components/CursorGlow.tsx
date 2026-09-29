import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function CursorGlow() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFine(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!fine) return;
    const glow = document.getElementById("cursor-glow");
    if (!glow) return;
    const onMove = (event: PointerEvent) => {
      glow.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      id="cursor-glow"
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[360px] w-[360px] rounded-full mix-blend-screen md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(203,184,146,0.16), rgba(201,163,158,0.05) 42%, transparent 68%)",
      }}
    />
  );
}
