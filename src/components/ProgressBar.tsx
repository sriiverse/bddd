import { useEffect, useRef, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const barRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <m.div
      ref={barRef}
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-[81] h-px origin-left bg-gold/80"
    />
  );
}
