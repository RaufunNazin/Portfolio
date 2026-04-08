import React, { useEffect, useMemo, useState } from "react";

const ExperienceCard = ({ exp, darkMode }) => {
  const [flipped, setFlipped] = useState(false);

  const ui = useMemo(() => {
    const text = darkMode ? "text-neutral-100" : "text-neutral-900";
    const sub = darkMode ? "text-neutral-300" : "text-neutral-600";
    const border = darkMode ? "border-white/10" : "border-black/10";
    const frontBg = darkMode ? "bg-neutral-900/80" : "bg-white/80";
    const backBg = darkMode ? "bg-neutral-950" : "bg-[#fbfbf8]";
    const chip = darkMode
      ? "bg-white/8 text-neutral-100"
      : "bg-black/5 text-neutral-900";
    return { text, sub, border, frontBg, backBg, chip };
  }, [darkMode]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFlipped(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      type="button"
      className="cursor-pointer min-w-full h-[320px] md:h-[420px] relative text-left focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded-3xl"
      onClick={() => setFlipped((v) => !v)}
      aria-label={`Experience card: ${exp.company}`}
      title="Click to flip"
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        {/* FRONT */}
        <div
          className={`flip-card-front rounded-3xl border ${ui.border} ${ui.frontBg} backdrop-blur-xl shadow-lg p-5 flex flex-col justify-between overflow-hidden`}
        >
          <div className="flex items-center justify-between gap-3">
            <img
              src={exp.image}
              alt={exp.company}
              className={`w-auto ${exp.company === "Amicsoft" ? "h-7" : "h-8"} opacity-95`}
              loading="lazy"
            />

            <div className="flex items-center gap-2 shrink-0 animate-pulse">
              {exp.isCurrent && (
                <span className="px-2 py-2 rounded-full text-[11px] font-semibold bg-emerald-500 text-white">
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div
              className={`${ui.text} text-[22px] md:text-[26px] font-semibold leading-tight`}
            >
              {exp.title}
            </div>
            <div className={`${ui.sub} text-[14px] md:text-[16px] mt-1`}>
              {exp.company}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className={`${ui.sub} text-[13px] md:text-[14px]`}>
              {exp.duration}
            </div>
            <div className={`${ui.sub} text-[13px] md:text-[14px]`}>
              {exp.type}
            </div>
          </div>

          <div
            className={`mt-4 text-[13px] md:text-[14px] ${ui.sub} leading-relaxed`}
          >
            {exp.summary}
          </div>

          <div className="mt-5">
            <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full opacity-80" />
            <div className={`mt-2 text-[11px] ${ui.sub}`}>
              Click for details
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className={`flip-card-back rounded-3xl border ${ui.border} ${ui.backBg} shadow-lg p-5 overflow-y-auto`}
        >
          <div className={`${ui.text} font-semibold text-base`}>What I did</div>
          <ul
            className={`mt-2 list-disc pl-5 space-y-1 text-[13px] md:text-[14px] ${ui.sub}`}
          >
            {exp.details.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>

          <div className="mt-5">
            <div className={`${ui.text} font-semibold text-base`}>Tech</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {exp.tech.map((tech) => (
                <span
                  key={tech}
                  className={`text-[12px] px-2.5 py-1 rounded-full border ${ui.border} ${ui.chip}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className={`text-[11px] ${ui.sub}`}>Press Esc to close</div>
            <div className={`text-[11px] ${ui.sub}`}>Click to flip back</div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ExperienceCard;
