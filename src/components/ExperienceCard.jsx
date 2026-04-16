import React from "react";

const ExperienceCard = ({ exp, darkMode }) => {
  // Clean, premium UI mapping without unnecessary state or clunky flips
  const border = darkMode ? "border-white/10" : "border-black/10";
  const bg = darkMode
    ? "bg-[#111] hover:bg-[#161616]"
    : "bg-[#fafafa] hover:bg-white";
  const text = darkMode ? "text-white" : "text-black";
  const subtext = darkMode ? "text-neutral-400" : "text-neutral-500";

  return (
    <div
      className={`group relative flex flex-col h-full min-h-[420px] p-6 sm:p-8 rounded-3xl border ${border} ${bg} transition-all duration-500 shadow-sm hover:shadow-xl cursor-default overflow-hidden`}
    >
      {/* Subtle hover gradient accent (matches your brand colors) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Row: Logo & Status */}
      <div className="flex justify-between items-center mb-8">
        <div className={`h-8 sm:h-10 flex items-center`}>
          <img
            src={exp.image}
            alt={exp.company}
            className={`max-h-full w-auto object-contain transition-all duration-500 ${
              darkMode
                ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                : "opacity-90"
            }`}
            loading="lazy"
          />
        </div>

        {exp.isCurrent && (
          <div
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${border} ${darkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-bold">
              Present
            </span>
          </div>
        )}
      </div>

      {/* Role & Company Info */}
      <div>
        <h3
          className={`text-xl font-bold tracking-tight leading-tight ${text} mb-1 group-hover:text-cyan-500 transition-colors`}
        >
          {exp.title}
        </h3>
        <div
          className={`text-sm font-medium ${darkMode ? "text-neutral-300" : "text-neutral-700"} mb-5`}
        >
          {exp.company}
        </div>

        <div
          className={`flex flex-col gap-1.5 text-[10px] font-mono uppercase tracking-widest ${subtext} mb-8`}
        >
          <span>{exp.duration}</span>
          <span>{exp.type}</span>
        </div>
      </div>

      {/* Details / Impact (Replacing tech stacks and flip gimmicks) */}
      <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5">
        <ul className="space-y-3">
          {exp.details.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={`mt-0.5 text-[12px] opacity-60 ${darkMode ? "text-cyan-400" : "text-cyan-600"}`}
              >
                ▹
              </span>
              <span
                className={`text-xs sm:text-[13px] leading-relaxed ${subtext}`}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
