import { letter, letterHeading } from "../content/site";
import { Reveal } from "./Reveal";

export function LetterSection() {
  return (
    <section id="letter" className="relative px-5 py-24 sm:px-8 md:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(203,184,146,0.08), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          <h2 className="text-center font-serif text-[clamp(2rem,6vw,3rem)] font-medium text-balance text-ivory">
            {letterHeading}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="letter-paper relative mt-12 overflow-hidden px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.38)] sm:px-10 sm:py-14 md:px-14 md:py-16 lg:rotate-[0.3deg]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 12% 0%, rgba(255,252,246,0.7), transparent 42%),
                  linear-gradient(180deg, #f6f0e6 0%, #efe3d2 100%)
                `,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(90,60,40,0.035) 28px)",
              }}
            />
            <div className="relative text-[#3a322c]">
              {letter.map((block, index) => {
                if (block.type === "salute") {
                  return (
                    <p key={index} className="font-serif text-[2rem] leading-none">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "lines") {
                  return (
                    <p key={index} className="mt-7 font-serif text-[1.2rem] leading-8 sm:text-[1.35rem]">
                      {block.text.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  );
                }
                if (block.type === "close") {
                  return (
                    <p
                      key={index}
                      className="mt-12 font-serif text-[1.85rem] leading-tight text-[#2a241e]"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "sign") {
                  return (
                    <p key={index} className="mt-10 font-serif text-2xl text-[#7d5d56] italic">
                      — {block.text}
                    </p>
                  );
                }
                return (
                  <p
                    key={index}
                    className="mt-7 font-serif text-[1.2rem] leading-[1.75] sm:text-[1.32rem]"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
