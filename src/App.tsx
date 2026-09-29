import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ChapterDots } from "./components/ChapterDots";
import { CursorGlow } from "./components/CursorGlow";
import { FinalMessage } from "./components/FinalMessage";
import { Gallery } from "./components/Gallery";
import { GrainOverlay } from "./components/GrainOverlay";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { LetterSection } from "./components/LetterSection";
import { MemoryTimeline } from "./components/MemoryTimeline";
import { MusicPlayer } from "./components/MusicPlayer";
import { ProgressBar } from "./components/ProgressBar";
import { ThingsToSay } from "./components/ThingsToSay";
import { VideoMemory } from "./components/VideoMemory";
import { Wish } from "./components/Wish";

const STORAGE_KEY = "for-maya";

function readEntered() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [entered, setEntered] = useState(readEntered);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const begin = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore private mode */
    }
    setEntered(true);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <GrainOverlay />
      <AnimatePresence>{!entered && <Intro key="intro" onBegin={begin} />}</AnimatePresence>
      {entered && (
        <>
          <ProgressBar />
          <CursorGlow />
          <ChapterDots />
          <MusicPlayer />
        </>
      )}
      <main inert={!entered ? true : undefined}>
        <Hero />
        <MemoryTimeline />
        <VideoMemory />
        <ThingsToSay />
        <Wish />
        <Gallery />
        <LetterSection />
        <FinalMessage />
      </main>
    </LazyMotion>
  );
}
