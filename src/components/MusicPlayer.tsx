import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { music } from "../content/site";
import { ease } from "../lib/ease";

export function MusicPlayer() {
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [muted, volume]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) audio.src = music.src;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      setOpen(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <m.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.9, ease }}
      className="fixed right-[max(0.75rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[90] max-w-[calc(100vw-1.5rem)]"
    >
      <audio
        ref={audioRef}
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <div className="flex max-w-full items-center gap-2 rounded-full border border-ivory/15 bg-ink/70 px-2.5 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause atmosphere" : "Play atmosphere"}
          className="flex h-9 w-9 items-center justify-center text-gold"
        >
          {playing ? (
            <span className="flex h-3.5 items-end gap-[3px]" aria-hidden>
              <span className="eq-bar h-full w-[2px] bg-gold" />
              <span className="eq-bar h-full w-[2px] bg-gold" />
              <span className="eq-bar h-full w-[2px] bg-gold" />
            </span>
          ) : (
            <span className="font-serif text-lg leading-none">♪</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="truncate pr-2 text-[10px] tracking-[0.22em] text-ivory/75 uppercase"
        >
          {music.label}
        </button>
        {open && (
          <>
            <input
              aria-label="Volume"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(event) => {
                const next = Number(event.target.value);
                setVolume(next);
                setMuted(next === 0);
              }}
              className="w-16 sm:w-20"
            />
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              aria-label={muted ? "Unmute atmosphere" : "Mute atmosphere"}
              className="mr-1 text-ivory/70"
            >
              {muted || volume === 0 ? (
                <VolumeX size={15} strokeWidth={1.4} />
              ) : (
                <Volume2 size={15} strokeWidth={1.4} />
              )}
            </button>
          </>
        )}
      </div>
    </m.div>
  );
}
