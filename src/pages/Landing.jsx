import { useEffect, useMemo, useRef, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaFacebookF, FaWhatsapp, FaCheck } from "react-icons/fa";
import { FaLinkedinIn, FaRegCopy } from "react-icons/fa6";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  FiExternalLink,
  FiLayers,
  FiCpu,
  FiServer,
  FiPieChart,
  FiPenTool,
  FiDatabase,
  FiLayout,
  FiActivity,
} from "react-icons/fi";

import SnakeGame from "../components/SnakeGame";
import ExperienceCard from "../components/ExperienceCard";
import CodeEditor from "../components/CodeEditor";
import TerminalContact from "../components/TerminalContact";

const STORAGE_KEY = "darkMode";
const NOW_YEAR = 2026;

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);

  const [copiedKey, setCopiedKey] = useState(null);

  const rootRef = useRef(null);

  const applyThemeToDom = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  };

  const initTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "true" || stored === "false") {
      const next = stored === "true";
      setDarkMode(next);
      applyThemeToDom(next);
      return;
    }

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (mq && typeof mq.matches === "boolean") {
      const next = mq.matches;
      setDarkMode(next);
      applyThemeToDom(next);
      return;
    }

    setDarkMode(true);
    applyThemeToDom(true);
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem(STORAGE_KEY, String(next));
    applyThemeToDom(next);
  };

  const setCopied = (key) => {
    setCopiedKey(key);
    window.clearTimeout(setCopied._t);
    setCopied._t = window.setTimeout(() => setCopiedKey(null), 1200);
  };

  const copyToClipboard = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
    } catch {
      setCopied(key);
    }
  };

  useEffect(() => {
    initTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true" || stored === "false") return;

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;

    const handler = (e) => {
      setDarkMode(e.matches);
      applyThemeToDom(e.matches);
    };

    mq.addEventListener?.("change", handler);
    mq.addListener?.(handler);

    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShowFab((prev) => {
        const next = y > 160;
        return prev !== next ? next : prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ui = useMemo(() => {
    const bg = darkMode ? "bg-neutral-950" : "bg-[#f6f6f1]";
    const panel = darkMode ? "bg-neutral-900/70" : "bg-white/70";
    const panelSolid = darkMode ? "bg-neutral-900" : "bg-white";
    const text = darkMode ? "text-neutral-100" : "text-neutral-900";
    const subtext = darkMode ? "text-neutral-300" : "text-neutral-600";
    const border = darkMode ? "border-white/10" : "border-black/10";

    const chip = darkMode
      ? "bg-white/8 text-neutral-100"
      : "bg-black/5 text-neutral-900";

    const button = darkMode
      ? "bg-white/10 hover:bg-white/14 text-white"
      : "bg-black/5 hover:bg-black/10 text-neutral-900";

    const mutedButton = darkMode
      ? "bg-white/5 hover:bg-white/10 text-neutral-300"
      : "bg-black/5 hover:bg-black/10 text-neutral-600";

    return {
      bg,
      panel,
      panelSolid,
      text,
      subtext,
      border,
      chip,
      button,
      mutedButton,
    };
  }, [darkMode]);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduceMotion) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const Button = ({ children, className = "", ...props }) => (
    <button
      {...props}
      className={`cursor-pointer select-none rounded-2xl border ${ui.border} ${ui.button} px-5 py-3 transition active:scale-[0.98] btn-shimmer ${className}`}
    >
      {children}
    </button>
  );

  const expertise = useMemo(
    () => [
      { title: "React", image: "/react.png", since: 2022 },
      { title: "Next.js", image: "/nextjs.png", since: 2023 },
      { title: "FastAPI", image: "/fastapi.svg", since: 2022 },
      { title: "Docker", image: "/docker.svg", since: 2022 },
      { title: "Figma", image: "/figma.png", since: 2022 },
      { title: "Photoshop", image: "/photoshop.png", since: 2017 },
    ],
    [],
  );

  const experiences = useMemo(
    () => [
      {
        title: "Software Engineer",
        company: "Maestro Solutions Ltd.",
        duration: "May 2025 - Present",
        type: "On-site, Full-time",
        image: darkMode ? "/maestro-white.png" : "/maestro.png",
        summary:
          "Building SaaS platforms and deployment tools that drive real revenue.",
        details: [
          "Built an automated network monitor that brings in 450,000+ BDT in monthly revenue.",
          "Designed a core system handling 1.6M+ users and 958,000+ devices for 88 ISPs.",
          "Set up automated CI/CD pipelines to speed up deployments across multiple company projects.",
        ],
        isCurrent: true,
      },
      {
        title: "Software Engineer",
        company: "Shaped.ai",
        duration: "April 2023 - March 2024",
        type: "Remote, Contract",
        image: darkMode ? "/shaped-white.png" : "/shaped.png",
        summary:
          "Built fast, custom data visualization tools for AI evaluation.",
        details: [
          "Wrote a custom graphics engine that renders 20,000+ data points with zero lag.",
          "Replaced heavy charting libraries with custom SVGs to drastically cut browser memory use.",
          "Built the main dashboard clients use to verify how much their AI models are improving.",
        ],
        isCurrent: false,
      },
      {
        title: "Full Stack Developer",
        company: "Zoopsign",
        duration: "June 2022 - March 2023",
        type: "Remote, Contract",
        image: darkMode ? "/zoopsign-white.png" : "/zoopsign.png",
        summary: "Built a fast, browser-based PDF editing engine.",
        details: [
          "Created a fast PDF editor designed to compete directly with tools like iLovePDF.",
          "Wrote the complex 2D math needed to easily drag, resize, and rotate shapes and text.",
          "Used raw SVG instead of standard HTML elements to keep the editor smooth on huge documents.",
        ],
        isCurrent: false,
      },
      {
        title: "Developer Intern",
        company: "Amicsoft",
        duration: "January 2022 - May 2022",
        type: "On-site, Internship",
        image: darkMode ? "/amicsoft-white.png" : "/amicsoft.png",
        summary:
          "Learned end-to-end system design and shipped production code.",
        details: [
          "Built and launched a complete, production-ready web app from scratch.",
          "Used frontend optimization techniques to make page load speeds significantly faster.",
          "Worked in a fast agile team and learned strict QA and deployment standards.",
        ],
        isCurrent: false,
      },
    ],
    [darkMode],
  );

  const flagship = useMemo(
    () => [
      {
        title: "OLT Module Extension - maXim ISP Billing",
        status: "Finished",
        subtitle: "Automated fault detection and diagnostics algorithm",
        bullets: [
          "Deployed across 88 ISPs, actively monitoring 5,100+ OLTs and nearly 1 million ONUs.",
          "Built an algorithm that instantly finds all disconnected users the moment a main wire breaks.",
          "Saved hours of debugging time by putting automated fault reports straight into the operator dashboard.",
        ],
        impact: ["1.6M+ Users", "958K+ ONUs", "5,100+ OLTs"],
      },
      {
        title: "Network Diagram + OLT Monitoring",
        status: "In progress",
        subtitle: "Standalone SaaS for end-to-end network visibility",
        bullets: [
          "Building a standalone SaaS platform targeting 200+ ISPs to unify network monitoring and mapping.",
          "Creating real-time visual maps that connect main OLT hardware directly to client ONUs.",
          "Integrating geospatial mapping so field teams can easily locate physical broken wires.",
        ],
        impact: ["200+ Target ISPs", "Standalone SaaS", "Geo-Spatial"],
      },
      // {
      //   title: "Swadesh Food E-Commerce Platform",
      //   status: "Under Dev",
      //   subtitle: "High-concurrency full-stack e-commerce architecture",
      //   bullets: [
      //     "Building a complete direct-to-consumer grocery delivery web application from scratch.",
      //     "Solving complex inventory issues so multiple users can buy the exact same item simultaneously without errors.",
      //     "Designing the intuitive user interface and resilient database structures needed for high-volume transactions.",
      //   ],
      //   impact: ["Full Stack Web App", "ACID Transactions", "Real-time Sync"],
      // },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        src: "/msadmission.png",
        title: "MS Admission Portal - CSE, DU",
        type: "Admission Portal",
        description:
          "Secure digital portal replacing the university's legacy paper-based admissions.",
        metrics: [
          { value: "3,000+", label: "Applicants / Batch" },
          { value: "60M+ BDT", label: "Processed Vol." },
          { value: "500+", label: "Concurrent Users" },
        ],
        state: "Live",
        link: "https://msadmission.cse.du.ac.bd/",
      },
      {
        src: "/pmics.png",
        title: "PMICS Admission Portal - CSE, DU",
        type: "Admission Portal",
        description:
          "Highly resilient admission system with distributed architecture and strict data security.",
        metrics: [
          { value: "2,500+", label: "Applicants / Batch" },
          { value: "25M+ BDT", label: "Processed Vol." },
          { value: "Zero", label: "Downtime" },
        ],
        state: "Live",
        link: "https://pmics.cse.du.ac.bd/",
      },
    ],
    [],
  );

  return (
    <div
      ref={rootRef}
      className={`min-h-screen ${ui.bg} ${ui.text} transition-colors duration-300 overflow-x-hidden`}
    >
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0" />
        <div
          className={`absolute -top-24 -left-24 h-[420px] w-[420px] blob blob-a ${darkMode ? "opacity-40" : "opacity-22"}`}
        />
        <div
          className={`absolute top-[18%] -right-24 h-[420px] w-[420px] blob blob-b ${darkMode ? "opacity-36" : "opacity-18"}`}
        />
        <div
          className={`absolute bottom-[-120px] left-[22%] h-[520px] w-[520px] blob blob-c ${darkMode ? "opacity-30" : "opacity-14"}`}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        {showFab && (
          <>
            <button
              className={`cursor-pointer rounded-2xl border ${ui.border} backdrop-blur-xl ${ui.panel} shadow-lg p-3 transition active:scale-[0.99] inline-flex items-center justify-center `}
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </>
        )}
      </div>

      {/* HERO */}
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 pt-6">
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-xl overflow-hidden animate-fade-up`}
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between p-5 lg:p-8">
            <img
              src={darkMode ? "/signature.png" : "/signature-white.png"}
              alt="signature"
              className="h-7 sm:h-8 opacity-90"
            />

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.mutedButton} h-10 w-10 inline-flex items-center justify-center transition active:scale-[0.98]`}
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <FaSun className="text-sm" />
                ) : (
                  <FaMoon className="text-sm" />
                )}
              </button>

              <button
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} px-4 py-2 transition active:scale-[0.98] btn-shimmer inline-flex items-center gap-2 h-10`}
                onClick={() => window.open("/Resume___Raufun_Nazin_Srizon.pdf")}
              >
                <span className="text-sm font-semibold">Resume</span>
                <FiExternalLink className="text-sm" />
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="p-5 lg:p-8 pt-0 lg:pt-0">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-8 items-end">
              {/* LEFT SIDE: Intro Text & Custom Widgets */}
              <div className="flex flex-col w-full h-full justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <p className={`text-base sm:text-lg ${ui.subtext}`}>
                    Hello, I&apos;m
                  </p>
                </div>

                <div className="text-[10vw] sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05]">
                  Raufun Nazin <br className="hidden lg:block" /> Srizon
                </div>

                {/* Unified Typography Line */}
                <div
                  className={`mt-4 text-[15px] sm:text-base font-medium ${ui.subtext} leading-relaxed max-w-lg`}
                >
                  Software Engineer <span className="opacity-40 mx-2">•</span>
                  Full Stack <span className="opacity-40 mx-2">•</span>
                  React & FastAPI <span className="opacity-40 mx-2">•</span>4
                  YoE
                </div>
              </div>

              {/* RIGHT SIDE: Highlight Cards */}
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* TILE 1: System Architect */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-rose-400/30 transition-colors`}
                  >
                    <div className="glass-shine" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} bg-gradient-to-br from-rose-500/10 to-orange-500/10 flex items-center justify-center`}
                    >
                      <FiPenTool className="text-rose-400 text-lg group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
                        System Architect
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        Scalable Foundations
                      </div>
                      <div
                        className={`text-[11px] ${ui.subtext} truncate mt-0.5`}
                      >
                        Designing robust B2B data models
                      </div>
                    </div>
                  </div>

                  {/* TILE 2: Frontend Engineer */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-cyan-500/30 transition-colors`}
                  >
                    <div className="bg-mesh-pattern" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} ${darkMode ? "bg-cyan-500/10" : "bg-cyan-500/5"} flex items-center justify-center`}
                    >
                      <FiLayout className="text-cyan-500 text-lg group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
                        Frontend Engineer
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        Interactive UI/UX
                      </div>
                      <div
                        className={`text-[11px] ${ui.subtext} truncate mt-0.5`}
                      >
                        Crafting pixel-perfect web apps
                      </div>
                    </div>
                  </div>

                  {/* TILE 3: Backend Engineer */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-violet-500/30 transition-colors`}
                  >
                    <div className="data-stream-line" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} ${darkMode ? "bg-violet-500/10" : "bg-violet-500/5"} flex items-center justify-center`}
                    >
                      <FiDatabase className="text-violet-500 text-lg group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
                        Backend Engineer
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        Core Server Logic
                      </div>
                      <div
                        className={`text-[11px] ${ui.subtext} truncate mt-0.5`}
                      >
                        Writing fast, secure APIs
                      </div>
                    </div>
                  </div>

                  {/* TILE 4: DevOps & Infra */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-emerald-500/30 transition-colors`}
                  >
                    <div className="bg-grid-pattern" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} ${darkMode ? "bg-emerald-500/10" : "bg-emerald-500/5"} flex items-center justify-center`}
                    >
                      <FiServer className="text-emerald-500 text-lg group-hover:animate-pulse" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
                        DevOps & Infra
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        Mass Deployment
                      </div>
                      <div
                        className={`text-[11px] ${ui.subtext} truncate mt-0.5`}
                      >
                        Managing 200+ production servers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-8 sm:mt-10"
        data-reveal
      >
        <div
          className={`card-sweep rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg p-8 sm:p-12 lg:p-14`}
        >
          <div className="mb-12 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Trusted By
            </h2>
            <div className={`text-base ${ui.subtext} max-w-md`}>
              Companies and teams I have worked with.
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-center grayscale opacity-90 relative z-10">
            <img
              src={darkMode ? "/maestro-white.png" : "/maestro.png"}
              alt="Maestro"
              className="h-7 mx-auto"
              loading="lazy"
            />
            <img
              src={darkMode ? "/shaped-white.png" : "/shaped.png"}
              alt="Shaped.ai"
              className="h-9 mx-auto"
              loading="lazy"
            />
            <img
              src={darkMode ? "/zoopsign-white.png" : "/zoopsign.png"}
              alt="Zoopsign"
              className="h-7 mx-auto"
              loading="lazy"
            />
            <img
              src={darkMode ? "/amicsoft-white.png" : "/amicsoft.png"}
              alt="Amicsoft"
              className="h-5.5 mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg p-8 sm:p-12 lg:p-14`}
        >
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Experience
            </h2>
            <div className={`text-base ${ui.subtext} max-w-md`}>
              My professional background and past roles.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {experiences.map((exp) => (
              <ExperienceCard
                key={`${exp.company}-${exp.title}`}
                exp={exp}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Active Ecosystems - Interactive Code Editor */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg p-8 sm:p-12 lg:p-14`}
        >
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Active Ecosystems
              </h2>
              <div className={`text-base ${ui.subtext} max-w-md`}>
                Live platforms in active development and maintenance.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 items-stretch">
            {flagship.map((project) => (
              <CodeEditor
                key={project.title}
                project={project}
                darkMode={darkMode}
                ui={ui}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Applications - Slanted UI Window */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        id="projects-section"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg p-8 sm:p-12 lg:p-14`}
        >
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Featured Applications
            </h2>
            <div className={`text-base ${ui.subtext} max-w-md`}>
              High-impact public portals handling massive traffic.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((p) => (
              <a
                key={p.title}
                className={`group relative w-full text-left rounded-3xl border ${ui.border} ${
                  darkMode ? "bg-[#111]" : "bg-[#fafafa]"
                } overflow-hidden min-h-[500px] flex flex-col transition-all duration-500 shadow-sm hover:shadow-xl block`}
              >
                {/* Top Text Content */}
                <div className="relative z-20 p-6 sm:p-8 flex flex-col pb-[240px]">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${ui.border} ${darkMode ? "bg-white/5" : "bg-black/5"}`}
                    >
                      <FiLayers
                        className={
                          p.state === "Live"
                            ? "text-emerald-500"
                            : "text-cyan-500"
                        }
                      />
                    </div>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border ${ui.border} ${ui.chip}`}
                    >
                      {p.state}
                    </span>
                  </div>

                  <div
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-2xl font-bold tracking-tight leading-tight ${ui.text} flex items-center gap-2 group-hover:text-cyan-500 transition-colors cursor-pointer`}
                  >
                    {p.title}
                    <FiExternalLink className="text-lg opacity-50" />
                  </div>

                  <div
                    className={`mt-3 text-sm leading-relaxed ${ui.subtext} sm:max-w-[90%]`}
                  >
                    {p.description}
                  </div>

                  {/* Scannable Metrics Grid */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {p.metrics.map((m, i) => (
                      <div
                        key={i}
                        className={`flex flex-col border-l-2 ${p.state === "Live" ? "border-emerald-500/30" : "border-cyan-500/30"} pl-3`}
                      >
                        <span
                          className={`text-lg sm:text-xl font-bold ${ui.text}`}
                        >
                          {m.value}
                        </span>
                        <span
                          className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-bold ${ui.subtext} mt-0.5`}
                        >
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slanted Floating Image - Bottom Right */}
                <div
                  className={`absolute -bottom-16 w-[110%] h-[240px] rounded-t-xl border border-white/20 shadow-2xl transform rotate-[8deg] group-hover:-translate-y-6 group-hover:rotate-[2deg] transition-all duration-500 ease-out overflow-hidden z-10 ${darkMode ? "bg-neutral-900" : "bg-neutral-200"}`}
                >
                  <div className="h-6 w-full bg-black/10 dark:bg-white/10 flex items-center px-4 gap-2 border-b border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-red-400/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                  </div>

                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-full object-cover object-top"
                  />

                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies - The Editorial Index */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg p-8 sm:p-12 lg:p-14`}
        >
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Technologies
            </h2>
            <div className={`text-base ${ui.subtext} max-w-md`}>
              The tools, languages, and frameworks I use every day.
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 sm:gap-12">
            {expertise.map((item) => {
              const years = Math.max(1, NOW_YEAR - item.since);
              return (
                <div
                  key={item.title}
                  className="group flex items-center justify-between mb-6 pb-2 border-b border-black/10 dark:border-white/10 hover:border-cyan-500 transition-colors break-inside-avoid cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-5 h-5 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      loading="lazy"
                    />
                    <span className="text-lg font-bold tracking-tight">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest ${ui.subtext} group-hover:text-cyan-500 transition-colors`}
                  >
                    {years} Yr{years > 1 && "s"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Games window */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12 hidden"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panelSolid} shadow-lg overflow-hidden`}
        >
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${ui.border} ${darkMode ? "bg-neutral-900" : "bg-white"}`}
          >
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <div className={`ml-3 text-sm font-semibold ${ui.text}`}>
                snakeoverflow.exe
              </div>
            </div>
            <div className={`text-xs ${ui.subtext} flex items-center gap-3`}>
              <span className="hidden sm:inline">
                Arrow/WASD • Enter start • P pause • Esc exit
              </span>
              <span className={`${ui.text} font-semibold`}>
                Score: {snakeScore}
              </span>
            </div>
          </div>

          <div
            className={`relative overflow-hidden p-0 ${darkMode ? "bg-neutral-950" : "bg-[#f7f7f2]"}`}
            style={{ height: 620 }}
          >
            <SnakeGame darkMode={darkMode} onScoreChange={setSnakeScore} />
          </div>
        </div>
      </section>

      {/* Contact - The Interactive Console */}
      <TerminalContact
        ui={ui}
        darkMode={darkMode}
        copyToClipboard={copyToClipboard}
        copiedKey={copiedKey}
      />
    </div>
  );
};

export default Landing;
