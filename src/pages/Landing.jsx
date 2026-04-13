import { useEffect, useMemo, useRef, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn, FaRegCopy } from "react-icons/fa6";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  FiExternalLink,
  FiLayers,
  FiCpu,
  FiServer,
  FiPieChart,
} from "react-icons/fi";

import SnakeGame from "../components/SnakeGame";
import ExperienceCard from "../components/ExperienceCard";

const STORAGE_KEY = "darkMode";
const NOW_YEAR = 2026;

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);

  const [activeProject, setActiveProject] = useState(null);
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
      // Only trigger a state update if the boolean actually changes
      setShowFab((prev) => {
        const next = y > 160;
        return prev !== next ? next : prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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

  // NATIVE INTERSECTION OBSERVER
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    // Immediately reveal everything if animations are disabled
    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -5% 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

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
      { title: "TypeScript", image: "/ts.png", since: 2023 },
      { title: "Next.js", image: "/nextjs.png", since: 2023 },
      { title: "Tailwind", image: "/tailwind.png", since: 2022 },
      { title: "FastAPI", image: "/fastapi.svg", since: 2023 },
      { title: "Python", image: "/python.svg", since: 2022 },
      { title: "Docker", image: "/docker.webp", since: 2022 },
      { title: "Linux", image: "/linux.png", since: 2020 },
      { title: "Git", image: "/git.png", since: 2022 },
      { title: "MongoDB", image: "/mongodb.png", since: 2022 },
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
        summary: "Building tools for ISPs to monitor and manage networks.",
        details: [
          "Developing monitoring flows with SNMP and device metrics.",
          "Designing scalable frontend + backend systems for operator workflows.",
          "Collaborating with network engineers to optimize monitoring UX.",
        ],
        tech: [
          "React",
          "FastAPI",
          "Python",
          "TypeScript",
          "Oracle",
          "SNMP",
          "Docker",
          "Linux",
        ],
        isCurrent: true,
      },
      {
        title: "Software Engineer",
        company: "Shaped.ai",
        duration: "April 2023 - March 2024",
        type: "Remote, Contract",
        image: darkMode ? "/shaped-white.svg" : "/shaped.svg",
        summary:
          "Built high-performance statistical graphs and custom visualizations.",
        details: [
          "Implemented dense charts using Visx and custom primitives.",
          "Built interactions for zoom/pan and high-volume point rendering.",
          "Focused on interpretability and clarity for ML evaluation workflows.",
        ],
        tech: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "Visx",
          "SVG",
          "Recharts",
          "Chart.js",
        ],
        isCurrent: false,
      },
      {
        title: "Full Stack Developer",
        company: "Zoopsign",
        duration: "June 2022 - March 2023",
        type: "Remote, Contract",
        image: darkMode ? "/zoopsign-white.svg" : "/zoopsign.svg",
        summary: "Developed EditPDF module (text, shapes, images).",
        details: [
          "Delivered interactive PDF editing tools with transform controls.",
          "Built manipulation UX for shapes/images/text operations.",
          "Shipped features that became part of the premium plan.",
        ],
        tech: [
          "Next.js",
          "Express.js",
          "TypeScript",
          "Node.js",
          "SVG",
          "GitHub Actions",
        ],
        isCurrent: false,
      },
      {
        title: "Developer Intern",
        company: "Amicsoft",
        duration: "January 2022 - May 2022",
        type: "On-site, Internship",
        image: darkMode ? "/amicsoft-white.png" : "/amicsoft.png",
        summary: "Hands-on production work and development best practices.",
        details: [
          "Worked under seniors to learn clean code and collaboration habits.",
          "Contributed to production sites and observed QA/release flow.",
        ],
        tech: ["React", "Next.js", "Node.js", "TypeScript", "MySQL"],
        isCurrent: false,
      },
    ],
    [darkMode],
  );

  const flagship = useMemo(
    () => [
      {
        title: "Network Diagram + OLT Monitoring (SaaS)",
        status: "In progress",
        subtitle: "SNMP + Telnet • ONU metrics • map integration",
        bullets: [
          "Network diagram UI for operators (topology-centric workflow).",
          "ONU metrics via SNMP + Telnet for deeper device visibility.",
          "SaaS packaging with map integration for geo-aware operations.",
        ],
        tags: ["React", "FastAPI", "SNMP", "Telnet", "Map"],
      },
      {
        title: "OLT Module Extension (MaXim ISP Billing)",
        status: "Finished",
        subtitle: "Extension feature integrated into Maestro billing system",
        bullets: [
          "Integrated extension capability into billing workflows.",
          "Designed for speed and minimal operator friction.",
          "Aligned with existing MaXim patterns and data model.",
        ],
        tags: ["MaXim", "Billing", "Integration", "UX", "System Design"],
      },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        src: "/msadmission.png",
        title: "MS Admission Portal, CSEDU",
        type: "Admission Portal",
        description:
          "Official admission portal for MS students of CSEDU, University of Dhaka.",
        tech: ["React", "PHP", "Oracle", "Tailwind", "RTL"],
        state: "Stable",
      },
      {
        src: "/pmics.png",
        title: "PMICS Admission Portal, CSEDU",
        type: "Admission Portal",
        description:
          "Admission portal for PMICS master's program students of CSEDU, University of Dhaka.",
        tech: ["React", "PHP", "Oracle", "Tailwind", "RTL"],
        state: "Stable",
      },
      {
        src: "/swadeshfood.png",
        title: "Swadesh Food",
        type: "E-Commerce",
        description:
          "Agro-farm platform for delivering fresh farm products directly to consumers.",
        tech: ["React", "FastAPI", "MySQL", "Tailwind", "SQLAlchemy", "Docker"],
        state: "Under development",
      },
      {
        src: "/ukway.png",
        title: "UKWay",
        type: "Consultancy",
        description:
          "Education consultancy guiding students applying to universities across the UK.",
        tech: [
          "Next.js",
          "TypeScript",
          "FastAPI",
          "PostgreSQL",
          "Tailwind",
          "Docker",
        ],
        state: "Shipped",
      },
    ],
    [],
  );

  return (
    <div
      ref={rootRef}
      className={`min-h-screen ${ui.bg} ${ui.text} transition-colors duration-300 overflow-x-hidden`}
    >
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

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div
          className={`rounded-l-2xl border ${ui.border} backdrop-blur-xl ${ui.panel} shadow-lg overflow-hidden`}
        >
          <div className="flex flex-col">
            <button
              className="p-3 cursor-pointer hover:bg-white/5 transition"
              aria-label="Copy email"
              onClick={() =>
                copyToClipboard("raufun.nazin13@gmail.com", "rail-email")
              }
            >
              <BiLogoGmail className="text-xl" />
            </button>
            <div
              className={`h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`}
            />
            <button
              className="p-3 cursor-pointer hover:bg-white/5 transition"
              aria-label="Open LinkedIn"
              onClick={() =>
                window.open("https://www.linkedin.com/in/RaufunNazin/")
              }
            >
              <FaLinkedinIn className="text-lg" />
            </button>
            <div
              className={`h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`}
            />
            <button
              className="p-3 cursor-pointer hover:bg-white/5 transition"
              aria-label="Open GitHub"
              onClick={() => window.open("https://www.github.com/RaufunNazin")}
            >
              <FaGithub className="text-lg" />
            </button>
            <div
              className={`h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`}
            />
            <button
              className="p-3 cursor-pointer hover:bg-white/5 transition"
              aria-label="Open WhatsApp"
              onClick={() => window.open("https://wa.me/8801682386618")}
            >
              <FaWhatsapp className="text-lg" />
            </button>
            <div
              className={`h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`}
            />
            <button
              className="p-3 cursor-pointer hover:bg-white/5 transition"
              aria-label="Open Facebook"
              onClick={() => window.open("https://www.facebook.com/srizon13")}
            >
              <FaFacebookF className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        {showFab && (
          <>
            <button
              className={`cursor-pointer rounded-2xl border ${ui.border} backdrop-blur-xl ${ui.panel} shadow-lg p-3 transition active:scale-[0.98] inline-flex items-center justify-center `}
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button
              className={`cursor-pointer rounded-2xl border ${ui.border} backdrop-blur-xl ${ui.panel} shadow-lg p-3 transition active:scale-[0.98] `}
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="text-sm font-semibold">↑</span>
            </button>
          </>
        )}
      </div>

      {/* HERO */}
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 pt-6">
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-xl overflow-hidden animate-fade-up`}
          data-reveal
        >
          <div className="flex items-center justify-between p-4 lg:p-8 ">
            <div className="flex items-center gap-3">
              <img
                src={darkMode ? "/signature.png" : "/signature-white.png"}
                alt="signature"
                className="h-8 opacity-90"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center gap-2 px-3`}>
                <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className={`text-xs ${ui.subtext}`}>
                  Open for collaboration
                </span>
                <span
                  data-hero-glow
                  className="ml-1 h-[2px] w-10 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 opacity-80"
                />
              </div>
              <button
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.mutedButton} h-10 w-10 inline-flex items-center justify-center transition active:scale-[0.98] `}
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
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.mutedButton} px-4 py-2 transition active:scale-[0.98] inline-flex items-center gap-2 w-32 h-10 justify-center`}
                onClick={() =>
                  copyToClipboard("raufun.nazin13@gmail.com", "hero-email")
                }
                type="button"
              >
                <span className="text-sm font-semibold">
                  {copiedKey === "hero-email" ? "Copied" : "Copy Email"}
                </span>
                <FaRegCopy className="text-sm" />
              </button>

              <button
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} px-4 py-2 transition active:scale-[0.98] btn-shimmer inline-flex items-center gap-2 `}
                onClick={() => window.open("/Resume___Raufun_Nazin_Srizon.pdf")}
              >
                <span className="text-sm font-semibold">View Resume</span>
                <FiExternalLink className="text-sm" />
              </button>
            </div>
          </div>

          <div className="p-4 lg:p-8 pt-0 lg:pt-0">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-end">
              <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col justify-between h-full">
                  <p className={`text-base sm:text-lg ${ui.subtext}`}>
                    Hello, I&apos;m
                  </p>
                  <div className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
                    Raufun Nazin Srizon
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      Software Engineer
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      Full Stack
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      React • FastAPI
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      4 YoE
                    </button>
                  </div>

                  <div className="mt-7 hidden  flex-wrap gap-3">
                    <button
                      className={`cursor-pointer select-none rounded-2xl border ${ui.border} ${ui.button} px-5 py-3 transition active:scale-[0.98] btn-shimmer inline-flex items-center gap-2 min-h-[48px] min-w-[160px] justify-center `}
                      onClick={() =>
                        copyToClipboard(
                          "raufun.nazin13@gmail.com",
                          "hero-email",
                        )
                      }
                      type="button"
                    >
                      <FaRegCopy />
                      <span className="font-semibold">
                        {copiedKey === "hero-email" ? "Copied" : "Copy Email"}
                      </span>
                    </button>

                    <button
                      className={`cursor-pointer select-none rounded-2xl border ${ui.border} ${
                        darkMode
                          ? "bg-gradient-to-r from-emerald-400/90 via-cyan-400/90 to-violet-400/90 text-neutral-950 hover:opacity-95"
                          : "bg-neutral-900 text-white hover:bg-neutral-800"
                      } px-5 py-3 transition active:scale-[0.98] inline-flex items-center justify-center min-h-[48px] `}
                      onClick={() =>
                        document
                          .getElementById("projects-section")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      type="button"
                    >
                      <span className="font-semibold">See Projects</span>
                    </button>

                    <Button
                      onClick={() =>
                        document
                          .getElementById("contact-section")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      <span className="font-semibold">Contact</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative -mx-3 lg:mx-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* TILE 1: Scale (Server Grid) */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-emerald-500/30 transition-colors`}
                  >
                    <div className="bg-grid-pattern" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} ${darkMode ? "bg-emerald-500/10" : "bg-emerald-500/5"} flex items-center justify-center`}
                    >
                      <FiServer className="text-emerald-500 text-lg" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60">
                        Scale
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        Managing ~200 Servers
                      </div>
                      <div
                        className={`text-[11px] ${ui.subtext} truncate mt-0.5`}
                      >
                        CI/CD • Docker • Linux
                      </div>
                    </div>
                  </div>

                  {/* TILE 2: Frontend (Mesh Gradient) */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-cyan-500/30 transition-colors`}
                  >
                    <div className="bg-mesh-pattern" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} ${darkMode ? "bg-cyan-500/10" : "bg-cyan-500/5"} flex items-center justify-center`}
                    >
                      <FiPieChart className="text-cyan-500 text-lg" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60">
                        Frontend
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        High-Fidelity Rendering
                      </div>
                      <div
                        className={`text-[11px] ${ui.subtext} truncate mt-0.5`}
                      >
                        Visx • Canvas • Metrics UI
                      </div>
                    </div>
                  </div>

                  {/* TILE 3: Backend (Data Stream) */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-violet-500/30 transition-colors`}
                  >
                    <div className="data-stream-line" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} ${darkMode ? "bg-violet-500/10" : "bg-violet-500/5"} flex items-center justify-center`}
                    >
                      <FiCpu className="text-violet-500 text-lg" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60">
                        Backend
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        Hardware-to-Web
                      </div>
                      <div
                        className={`text-[11px] font-mono text-violet-400/80 truncate mt-0.5`}
                      >
                        &gt;_ SNMP, Telnet, OLTs
                      </div>
                    </div>
                  </div>

                  {/* TILE 4: Scope (Glass Sweep) */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${ui.border} ${darkMode ? "bg-neutral-900/40" : "bg-white/40"} p-4 flex items-center gap-4 group hover:border-emerald-400/30 transition-colors`}
                  >
                    <div className="glass-shine" />
                    <div
                      className={`relative z-10 shrink-0 h-12 w-12 rounded-xl border ${ui.border} bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center`}
                    >
                      <FiLayers className="text-emerald-400 text-lg" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest opacity-60">
                        Scope
                      </div>
                      <div className="text-[15px] font-semibold truncate mt-0.5">
                        B2B SaaS Engineering
                      </div>
                      <div
                        className={`text-[11px] ${ui.subtext} truncate mt-0.5`}
                      >
                        Operator workflows
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
          className={`card-sweep rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg`}
        >
          <div className="px-4 sm:px-6 py-6 sm:py-8 relative z-10">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-lg font-semibold">Trusted by</div>
                <div
                  className={`mt-1 h-[2px] w-16 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full`}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5 items-center grayscale opacity-90">
              <img
                src={darkMode ? "/maestro-white.png" : "/maestro.png"}
                alt="Maestro"
                className="h-7 mx-auto"
                loading="lazy"
              />
              <img
                src={darkMode ? "/shaped-white.svg" : "/shaped.svg"}
                alt="Shaped.ai"
                className="h-9 mx-auto"
                loading="lazy"
              />
              <img
                src={darkMode ? "/zoopsign-white.svg" : "/zoopsign.svg"}
                alt="Zoopsign"
                className="h-7 mx-auto"
                loading="lazy"
              />
              <img
                src={darkMode ? "/amicsoft-white.png" : "/amicsoft.png"}
                alt="Amicsoft"
                className="h-6 mx-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technologies - Applied float-y to icons and hover-color-shadow to cards */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg`}
        >
          <div className="px-4 sm:px-6 py-8">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-lg font-semibold">Technologies</div>
                <div
                  className={`mt-1 h-[2px] w-16 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full`}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {expertise.map((item) => {
                const years = Math.max(1, NOW_YEAR - item.since);
                return (
                  <div
                    key={item.title}
                    className={`card-sweep group rounded-2xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-3 sm:p-4 transition hover-color-shadow`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-11 w-11 rounded-2xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-white"} flex items-center justify-center overflow-hidden`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-7 w-7 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base sm:text-lg font-semibold truncate">
                          {item.title}
                        </div>
                        <div className={`text-xs sm:text-sm ${ui.subtext}`}>
                          {years} yr{years > 1 ? "s" : ""} • since {item.since}
                        </div>
                      </div>
                    </div>
                    <div className="hidden mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full opacity-90" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg`}
        >
          <div className="px-4 sm:px-6 py-8">
            <div>
              <div className="text-lg font-semibold">
                Where I have contributed
              </div>
              <div
                className={`mt-1 h-[2px] w-16 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full`}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {experiences.map((exp) => (
                <ExperienceCard
                  key={`${exp.company}-${exp.title}`}
                  exp={exp}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work - Version 9: The Focus Block */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg p-8 sm:p-12`}
        >
          <div className="mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Recent Work
            </h2>
            <p className={`mt-2 text-base ${ui.subtext} max-w-md`}>
              Deep dives into complex systems and architectures I've recently
              deployed.
            </p>
          </div>

          <div className="flex flex-col gap-12 sm:gap-16">
            {flagship.map((c, index) => (
              <div
                key={c.title}
                className={`relative ${index !== flagship.length - 1 ? "pb-12 sm:pb-16 border-b border-black/10 dark:border-white/10" : ""}`}
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  {/* Title Area */}
                  <div className="lg:w-1/3 shrink-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`w-2 h-2 rounded-full ${c.status === "Finished" ? "bg-emerald-500" : "bg-cyan-500"} animate-pulse`}
                      />
                      <span className="text-xs uppercase tracking-widest font-bold opacity-60">
                        {c.status}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                      {c.title}
                    </h3>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="lg:w-2/3">
                    <h4 className={`text-lg font-medium mb-6 ${ui.text}`}>
                      {c.subtitle}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                      {c.bullets.map((b, i) => (
                        <div
                          key={i}
                          className={`text-sm leading-relaxed ${ui.subtext} relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-400/50 before:rounded-full`}
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - V6: The Slanted UI Window */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        id="projects-section"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg`}
        >
          <div className="px-4 sm:px-6 py-8">
            <div>
              <div className="text-lg font-semibold">What I’ve built</div>
              <div className="mt-1 h-[2px] w-16 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full" />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {projects.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActiveProject(p)}
                  className={`group cursor-pointer relative w-full text-left rounded-3xl border ${ui.border} ${
                    darkMode
                      ? "bg-[#111] hover:bg-[#1a1a1a]"
                      : "bg-[#fafafa] hover:bg-white"
                  } overflow-hidden h-[380px] sm:h-[420px] transition-all duration-500 active:scale-[0.98] shadow-sm hover:shadow-xl`}
                >
                  {/* Top Text Content */}
                  <div className="absolute top-0 inset-x-0 p-6 flex flex-col z-20">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border ${ui.border} ${darkMode ? "bg-white/5" : "bg-black/5"}`}
                      >
                        <FiLayers
                          className={
                            p.state === "Stable"
                              ? "text-emerald-500"
                              : "text-cyan-500"
                          }
                        />
                      </div>
                      <span
                        className={`text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${ui.border} ${ui.chip}`}
                      >
                        {p.state}
                      </span>
                    </div>

                    <div
                      className={`text-xl font-bold tracking-tight leading-tight ${ui.text}`}
                    >
                      {p.title}
                    </div>
                    <div
                      className={`mt-2 text-[12px] line-clamp-2 ${ui.subtext}`}
                    >
                      {p.description}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] px-2 py-0.5 rounded-md border ${ui.border} ${darkMode ? "bg-white/5 text-neutral-300" : "bg-black/5 text-neutral-600"}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Slanted Floating Image - Bottom Right */}
                  {/* It rests at an 8 degree angle, and straightens to 2 degrees on hover */}
                  <div
                    className={`absolute -right-8 -bottom-16 w-[110%] h-[60%] rounded-t-xl border border-white/20 shadow-2xl transform rotate-[8deg] group-hover:-translate-y-6 group-hover:rotate-[2deg] transition-all duration-500 ease-out overflow-hidden z-10 ${darkMode ? "bg-neutral-900" : "bg-neutral-200"}`}
                  >
                    {/* Fake Browser/OS Header */}
                    <div className="h-5 w-full bg-black/10 dark:bg-white/10 flex items-center px-3 gap-1.5 border-b border-white/10 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                    </div>

                    {/* Screenshot */}
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Subtle inner shadow to blend the image */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
                  </div>
                </button>
              ))}
            </div>
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

      {/* Contact - Option 3: The Console */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12 pb-10"
        id="contact-section"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${darkMode ? "bg-[#0d0d0d]" : "bg-[#f8f9fa]"} shadow-xl overflow-hidden`}
        >
          {/* Terminal Window Chrome */}
          <div
            className={`px-5 py-3 border-b ${ui.border} ${darkMode ? "bg-neutral-900" : "bg-white"} flex items-center justify-between`}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className={`text-xs font-mono opacity-50`}>~/contact.sh</div>
            <div className="w-12" /> {/* Spacer for centering */}
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-10 lg:p-14 font-mono text-sm sm:text-base overflow-x-auto">
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-emerald-500 font-semibold">
                  &gt; init{" "}
                </span>
                <span className="opacity-80">--fetch contact-details</span>
              </div>

              <div className="opacity-70 animate-pulse">
                [OK] Connecting to server...
              </div>

              <div className="flex flex-col gap-4 pl-4 border-l-2 border-emerald-500/20">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="w-24 opacity-50">EMAIL:</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "raufun.nazin13@gmail.com",
                        "contact-email",
                      )
                    }
                    className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    raufun.nazin13@gmail.com
                    <span className="text-xs opacity-50 bg-cyan-500/10 px-2 py-0.5 rounded">
                      {copiedKey === "contact-email" ? "COPIED" : "COPY"}
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="w-24 opacity-50">PHONE:</span>
                  <button
                    onClick={() =>
                      copyToClipboard("+8801682386618", "contact-phone")
                    }
                    className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    +880-1682-386618
                    <span className="text-xs opacity-50 bg-violet-500/10 px-2 py-0.5 rounded">
                      {copiedKey === "contact-phone" ? "COPIED" : "COPY"}
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="w-24 opacity-50">LOCATION:</span>
                  <span className="opacity-90">Dhaka, Bangladesh</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-emerald-500 font-semibold">&gt; </span>
                <span className="animate-pulse opacity-80">_</span>
              </div>
            </div>
          </div>

          <div
            className={`px-6 py-4 border-t ${ui.border} text-xs ${ui.subtext} flex justify-between items-center`}
          >
            <span>v2.0.26</span>
            <span>2025 &copy; Raufun Nazin Srizon</span>
          </div>
        </div>
      </section>

      {/* Project Modal - The "Hero Statement & Control Pill" Layout */}
      {activeProject && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveProject(null)}
            aria-hidden="true"
          />

          <div
            className={`relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] rounded-[2rem] border ${ui.border} ${
              darkMode ? "bg-[#0d0d0d]" : "bg-white"
            } shadow-2xl flex flex-col overflow-hidden animate-fade-up`}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header / App Bar */}
            <div
              className={`px-5 py-4 flex items-center justify-between border-b ${ui.border} ${darkMode ? "bg-white/5" : "bg-black/5"} shrink-0`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${ui.border} ${darkMode ? "bg-black/20" : "bg-white"}`}
                >
                  <FiLayers
                    className={
                      activeProject.state === "Stable"
                        ? "text-emerald-500"
                        : "text-cyan-500"
                    }
                  />
                </div>
                <div>
                  <div className={`text-sm font-bold ${ui.text} leading-tight`}>
                    {activeProject.title}
                  </div>
                  <div
                    className={`text-[10px] uppercase tracking-wider ${ui.subtext}`}
                  >
                    {activeProject.type}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className={`h-8 w-8 rounded-full border ${ui.border} flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs cursor-pointer`}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-8 flex flex-col gap-8 lg:gap-10">
              {/* High-Fidelity Browser Window Presentation */}
              <div
                className={`w-full rounded-xl overflow-hidden border ${ui.border} shadow-xl ${darkMode ? "bg-[#1a1a1a]" : "bg-neutral-100"}`}
              >
                {/* OS Chrome */}
                <div
                  className={`h-9 px-4 flex items-center gap-2 border-b ${ui.border} ${darkMode ? "bg-[#222]" : "bg-neutral-200"}`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  {/* Fake URL Bar */}
                  <div
                    className={`ml-4 px-3 py-1 rounded-md text-[10px] font-mono border ${ui.border} ${darkMode ? "bg-black/40 text-neutral-400" : "bg-white/60 text-neutral-500"} hidden sm:block`}
                  >
                    https://portfolio.local/
                    {activeProject.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "-")}
                  </div>
                </div>
                {/* Project Image */}
                <div className="w-full bg-black/5 dark:bg-black/20">
                  <img
                    src={activeProject.src}
                    alt={activeProject.title}
                    className="w-full h-auto max-h-[50vh] object-cover object-top"
                  />
                </div>
              </div>

              {/* Creative Bottom Layout: Hero Statement & Tech Pill */}
              <div className="flex flex-col items-center text-center pb-4">
                {/* Short description treated as a bold headline */}
                <div
                  className={`text-lg sm:text-xl font-medium tracking-tight ${ui.text} max-w-2xl mb-6 sm:mb-8 leading-relaxed`}
                >
                  {activeProject.description}
                </div>

                {/* Unified "Dock/Pill" for Metadata */}
                <div
                  className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-2 rounded-3xl sm:rounded-full border ${ui.border} ${darkMode ? "bg-white/5" : "bg-black/5"} backdrop-blur-sm w-full sm:w-auto shadow-sm`}
                >
                  {/* Tech Stack */}
                  <div className="flex flex-wrap justify-center items-center gap-1.5 px-2 py-1">
                    <span
                      className={`text-[10px] uppercase tracking-widest font-bold ${ui.subtext} mr-1 hidden sm:block`}
                    >
                      Stack:
                    </span>
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-[11px] px-2.5 py-1 rounded-full border ${ui.border} ${darkMode ? "bg-black/30 text-neutral-300" : "bg-white text-neutral-600 shadow-sm"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Divider (Desktop) */}
                  <div className="hidden sm:block w-[1px] h-6 bg-black/10 dark:bg-white/10" />

                  {/* Divider (Mobile) */}
                  <div className="block sm:hidden w-full h-[1px] bg-black/10 dark:bg-white/10" />

                  {/* Status Badge */}
                  <div className="px-2 py-1 w-full sm:w-auto flex justify-center">
                    <span
                      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${activeProject.state === "Stable" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"}`}
                    >
                      <span className={`relative flex h-2 w-2`}>
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeProject.state === "Stable" ? "bg-emerald-400" : "bg-cyan-400"}`}
                        ></span>
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 ${activeProject.state === "Stable" ? "bg-emerald-500" : "bg-cyan-500"}`}
                        ></span>
                      </span>
                      {activeProject.state}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
