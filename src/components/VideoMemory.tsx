import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { videoCopy, videos } from "../content/site";
import { Reveal } from "./Reveal";

export function VideoMemory() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heard = useRef(false);
  const inView = useInView(frameRef, { amount: 0.55 });
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [ended, setEnded] = useState(false);
  const [portrait, setPortrait] = useState(true);
  const clip = videos[index];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !clip) return;
    if (!inView) {
      video.pause();
      return;
    }
    if (!heard.current) {
      video.muted = true;
      setMuted(true);
    }
    const timer = window.setTimeout(async () => {
      try {
        await video.play();
        setNeedsTap(false);
      } catch {
        setNeedsTap(true);
      }
    }, reduce ? 0 : 600);
    return () => window.clearTimeout(timer);
  }, [inView, clip, reduce]);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (ended) {
      video.currentTime = 0;
      setEnded(false);
    }
    try {
      await video.play();
      setNeedsTap(false);
    } catch {
      setNeedsTap(true);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    heard.current = !nextMuted;
    setMuted(nextMuted);
    if (!nextMuted && video.paused) {
      void video.play().catch(() => setNeedsTap(true));
    }
  };

  const choose = (next: number) => {
    heard.current = false;
    setMuted(true);
    setEnded(false);
    setPlaying(false);
    setNeedsTap(false);
    setIndex(next);
  };

  if (!clip) return null;

  return (
    <section id="moment" className="relative bg-black px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <h2 className="mx-auto max-w-3xl text-center font-serif text-[clamp(1.55rem,5vw,3rem)] leading-snug font-normal text-balance text-ivory">
          {videoCopy.before}
        </h2>
      </Reveal>

      <div ref={frameRef} className="mx-auto mt-12 md:mt-16">
        <div
          className={`relative mx-auto overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.45)] ${
            portrait
              ? "aspect-[9/16] w-[min(420px,92vw,calc(78svh*0.5625))]"
              : "aspect-video w-full max-w-4xl"
          }`}
        >
          <video
            key={clip.id}
            ref={videoRef}
            src={clip.src}
            poster={clip.poster}
            playsInline
            muted
            preload="metadata"
            className="h-full w-full object-cover"
            onLoadedMetadata={(event) => {
              const video = event.currentTarget;
              setPortrait(video.videoHeight >= video.videoWidth);
            }}
            onPlay={() => {
              setPlaying(true);
              setEnded(false);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setEnded(true);
              setPlaying(false);
            }}
            onClick={() => {
              const video = videoRef.current;
              if (!video || needsTap) return;
              if (video.paused) void play();
              else video.pause();
            }}
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_28px_rgba(0,0,0,0.62)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />

          {(needsTap || ended || (!playing && needsTap)) && (
            <button
              type="button"
              onClick={() => void play()}
              className="absolute inset-0 z-10 flex items-center justify-center"
              aria-label={ended ? "Watch again" : "Play video"}
            >
              <span className="flex items-center gap-3 rounded-full border border-ivory/25 bg-black/35 px-5 py-3 text-[11px] tracking-[0.28em] text-ivory uppercase backdrop-blur-sm">
                {ended && <RotateCcw size={14} strokeWidth={1.4} />}
                {ended ? "Again" : "Play"}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute right-3 bottom-3 z-20 flex items-center gap-2 rounded-full border border-ivory/20 bg-black/40 px-3 py-2 text-[10px] tracking-[0.22em] text-ivory/90 uppercase backdrop-blur-sm"
          >
            {muted ? <VolumeX size={14} strokeWidth={1.4} /> : <Volume2 size={14} strokeWidth={1.4} />}
            {muted ? "Sound" : "On"}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          {videos.map((video, videoIndex) => (
            <button
              key={video.id}
              type="button"
              onClick={() => choose(videoIndex)}
              aria-pressed={videoIndex === index}
              className={`text-[10px] tracking-[0.28em] uppercase transition-colors ${
                videoIndex === index ? "text-ivory" : "text-ivory/35 hover:text-ivory/70"
              }`}
            >
              {video.label}
            </button>
          ))}
        </div>
      </div>

      <Reveal className="mt-14" delay={0.1}>
        <p className="text-center font-serif text-2xl text-ivory/72 italic sm:text-3xl">
          {videoCopy.after}
        </p>
      </Reveal>
    </section>
  );
}
