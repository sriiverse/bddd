import { useEffect, useState } from "react";

export function GrainOverlay() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 180;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = ctx.createImageData(180, 180);
    for (let i = 0; i < image.data.length; i += 4) {
      const tone = 214 + Math.random() * 41;
      image.data[i] = tone;
      image.data[i + 1] = tone;
      image.data[i + 2] = tone;
      image.data[i + 3] = Math.random() * 46;
    }
    ctx.putImageData(image, 0, 0);
    setUrl(canvas.toDataURL("image/png"));
  }, []);

  if (!url) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] opacity-[0.32] mix-blend-overlay"
      style={{ backgroundImage: `url(${url})`, backgroundRepeat: "repeat" }}
    />
  );
}
