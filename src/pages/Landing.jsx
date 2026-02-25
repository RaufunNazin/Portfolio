import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn, FaRegCopy } from "react-icons/fa6";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  FiExternalLink,
  FiMapPin,
  FiActivity,
  FiLayers,
  FiCpu,
} from "react-icons/fi";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import SnakeGame from "../components/SnakeGame";
import ExperienceCard from "../components/ExperienceCard";

gsap.registerPlugin(ScrollTrigger);

const STORAGE_KEY = "darkMode";
const NOW_YEAR = 2026;

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

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
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    )?.matches;
    const next = Boolean(prefersDark);
    setDarkMode(next);
    applyThemeToDom(next);
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

  const clampToViewport = (x, y, w = 320, h = 210, pad = 10) => {
    const maxX = window.innerWidth - w - pad;
    const maxY = window.innerHeight - h - pad;
    return {
      x: Math.max(pad, Math.min(maxX, x)),
      y: Math.max(pad, Math.min(maxY, y)),
    };
  };

  const handleMouseMove = (e, src) => {
    const rawX = e.clientX + 8;
    const rawY = e.clientY + 8;
    const { x, y } = clampToViewport(rawX, rawY, 320, 210);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setCursorPos({ x, y });
      setHoveredImage(src);
    });
  };

  const handleMouseLeave = () => setHoveredImage(null);

  useEffect(() => {
    initTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShowFab(y > 160);

      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(p);
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

    const accentRing = "focus:ring-2 focus:ring-cyan-400/40";
    return {
      bg,
      panel,
      panelSolid,
      text,
      subtext,
      border,
      chip,
      button,
      accentRing,
    };
  }, [darkMode]);

  // GSAP reveal (more reliable than IO)
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf("[data-reveal]");

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    const els = Array.from(root.querySelectorAll("[data-reveal]"));

    if (reduceMotion) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    els.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        },
      );
    });

    // small header shimmer line
    const headerGlow = root.querySelector("[data-hero-glow]");
    if (headerGlow && !reduceMotion) {
      gsap.fromTo(
        headerGlow,
        { opacity: 0.5 },
        {
          opacity: 1,
          duration: 1.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [darkMode]);

  const Button = ({ children, className = "", ...props }) => (
    <button
      {...props}
      className={`cursor-pointer select-none rounded-2xl border ${ui.border} ${ui.button} px-5 py-3 transition active:scale-[0.98] btn-shimmer ${ui.accentRing} ${className}`}
    >
      {children}
    </button>
  );

  // technologies reordered: core dev first
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
        title: "OLT Module Extension (Maestro ISP Billing)",
        status: "Finished",
        subtitle: "Extension feature integrated into Maestro billing system",
        bullets: [
          "Integrated extension capability into billing workflows.",
          "Designed for speed and minimal operator friction.",
          "Aligned with existing Maestro patterns and data model.",
        ],
        tags: ["Maestro", "Billing", "Integration", "UX", "System Design"],
      },
    ],
    [],
  );

  // reordered exactly as requested; swadeshfood + snapgenix now under development
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
        src: "/snapgenix.png",
        title: "Snapgenix",
        type: "Portfolio",
        description:
          "Photography & videography company portfolio (food, product, event).",
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
      {
        src: "/editpdf.png",
        title: "EditPDF (Zoopsign)",
        type: "Product Feature",
        description:
          "In-browser PDF editor module. Still under polish after final release.",
        tech: ["Next.js", "TypeScript", "Node.js", "SVG"],
        state: "Polishing",
      },
    ],
    [],
  );

  return (
    <div
      ref={rootRef}
      className={`min-h-screen ${ui.bg} ${ui.text} transition-colors duration-300 overflow-x-hidden`}
    >
      {/* scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 noise" />
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

      {/* right social rail (desktop) */}
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

      {/* FAB */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        {showFab && (
          <>
            {/* <button
              className={`cursor-pointer rounded-2xl border ${ui.border} backdrop-blur-xl ${ui.panel} shadow-lg p-3 transition active:scale-[0.98] inline-flex items-center justify-center ${ui.accentRing}`}
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button> */}

            <button
              className={`cursor-pointer rounded-2xl border ${ui.border} backdrop-blur-xl ${ui.panel} shadow-lg p-3 transition active:scale-[0.98] ${ui.accentRing}`}
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
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-xl overflow-hidden`}
          data-reveal
        >
          {/* top bar */}
          <div className="flex items-center justify-between p-4 lg:p-8 ">
            <div className="flex items-center gap-3">
              <img
                src={darkMode ? "/signature.png" : "/signature-white.png"}
                alt="signature"
                className="h-8 opacity-90"
              />
              <div className={`hidden sm:block text-xs ${ui.subtext}`}>
                Software Engineer • Full Stack • Bangladesh
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* <button
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} h-10 w-10 inline-flex items-center justify-center transition active:scale-[0.98] ${ui.accentRing}`}
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <FaSun className="text-sm" />
                ) : (
                  <FaMoon className="text-sm" />
                )}
              </button> */}

              <button
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} px-4 py-2 transition active:scale-[0.98] btn-shimmer inline-flex items-center gap-2 ${ui.accentRing}`}
                onClick={() => window.open("/Resume___Raufun_Nazin_Srizon.pdf")}
              >
                <span className="text-sm font-semibold">View Resume</span>
                <FiExternalLink className="text-sm" />
              </button>
            </div>
          </div>

          {/* hero content */}
          <div className="p-4 lg:p-8 ">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-end">
              <div className="flex flex-col h-full justify-between">
                <div
                  className={`inline-flex items-center gap-2 rounded-full border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} px-3 py-1 w-fit h-fit`}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                  <span className={`text-xs ${ui.subtext}`}>
                    Open for collaboration
                  </span>
                  <span
                    data-hero-glow
                    className="ml-1 h-[2px] w-10 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 opacity-80"
                  />
                </div>

                <div className="mt-5 flex flex-col justify-between h-full">
                  <div className={`text-base sm:text-lg ${ui.subtext}`}>
                    Hello, I&apos;m
                  </div>
                  <div className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
                    Raufun Nazin Srizon
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      Software Engineer
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      Full Stack
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      4 YoE
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${ui.border} ${ui.chip}`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <FiCpu /> React • FastAPI
                      </span>
                    </span>
                  </div>

                  {/* stable-height copy button */}
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      className={`cursor-pointer select-none rounded-2xl border ${ui.border} ${ui.button} px-5 py-3 transition active:scale-[0.98] btn-shimmer inline-flex items-center gap-2 min-h-[48px] min-w-[160px] justify-center ${ui.accentRing}`}
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
                      } px-5 py-3 transition active:scale-[0.98] inline-flex items-center justify-center min-h-[48px] ${ui.accentRing}`}
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

              {/* right hero panel: Portfolio Highlights (replaces copy section) */}
              <div
                className={`rounded-3xl border ${ui.border} ${ui.panelSolid} shadow-lg overflow-hidden`}
              >
                <div className={`p-5 border-b ${ui.border}`}>
                  <div className="text-sm font-semibold">
                    Portfolio Highlights
                  </div>
                  <div className={`mt-1 text-sm ${ui.subtext}`}>
                    A quick snapshot of what you’ll see below.
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`rounded-2xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-4`}
                    >
                      <div className="text-xs uppercase tracking-wide opacity-70">
                        Focus
                      </div>
                      <div className="mt-1 font-semibold inline-flex items-center gap-2">
                        <FiActivity /> UI + Systems
                      </div>
                    </div>
                    <div
                      className={`rounded-2xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-4`}
                    >
                      <div className="text-xs uppercase tracking-wide opacity-70">
                        Now
                      </div>
                      <div className="mt-1 font-semibold inline-flex items-center gap-2">
                        <FiLayers /> Network SaaS
                      </div>
                    </div>
                    <div
                      className={`rounded-2xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-4`}
                    >
                      <div className="text-xs uppercase tracking-wide opacity-70">
                        Location
                      </div>
                      <div className="mt-1 font-semibold inline-flex items-center gap-2">
                        <FiMapPin /> Dhaka
                      </div>
                    </div>
                    <div
                      className={`rounded-2xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-4`}
                    >
                      <div className="text-xs uppercase tracking-wide opacity-70">
                        Availability
                      </div>
                      <div className="mt-1 font-semibold text-emerald-300">
                        Open
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full opacity-80" />
                </div>
              </div>
              {/* end right hero panel */}
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
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg`}
        >
          <div className="px-4 sm:px-6 py-6 sm:py-8">
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

      {/* Technologies */}
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
                    className={`group rounded-2xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-3 sm:p-4 transition hover:shadow-lg`}
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
                    <div className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full opacity-90" />
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

      {/* Flagship */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg`}
        >
          <div className="px-4 sm:px-6 py-8">
            <div>
              <div className="text-lg font-semibold">Flagship work</div>
              <div
                className={`mt-1 h-[2px] w-16 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full`}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {flagship.map((c) => (
                <div
                  key={c.title}
                  className={`rounded-3xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-5 hover:shadow-lg transition`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-base font-semibold">{c.title}</div>
                      <div className={`mt-1 text-sm ${ui.subtext}`}>
                        {c.subtitle}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-xs px-2 py-1 rounded-full border ${ui.border} ${ui.chip}`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <ul
                    className={`mt-4 space-y-2 text-sm ${ui.subtext} list-disc pl-5`}
                  >
                    {c.bullets.map((b) => (
                      <li key={`${c.title}-${b}`}>{b}</li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={`${c.title}-${t}`}
                        className={`text-xs px-2.5 py-1 rounded-full border ${ui.border} ${ui.chip}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full opacity-80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
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
              <div
                className={`mt-1 h-[2px] w-16 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full`}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {projects.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onMouseMove={(e) => handleMouseMove(e, p.src)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setActiveProject(p)}
                  className={`cursor-pointer text-left rounded-3xl border ${ui.border} ${
                    darkMode
                      ? "bg-white/6 hover:bg-white/8"
                      : "bg-black/5 hover:bg-black/7"
                  } transition p-5 hover:shadow-lg active:scale-[0.99] ${ui.accentRing}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xl font-semibold truncate">
                        {p.title}
                      </div>
                      <div
                        className={`mt-1 text-sm ${ui.subtext} line-clamp-2`}
                      >
                        {p.description}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-xs px-2 py-1 rounded-full border ${ui.border} ${ui.chip}`}
                    >
                      {p.state}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.slice(0, 8).map((t) => (
                      <span
                        key={`${p.title}-${t}`}
                        className={`text-xs px-2.5 py-1 rounded-full border ${ui.border} ${ui.chip}`}
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 8 && (
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border ${ui.border} ${ui.chip}`}
                      >
                        +{p.tech.length - 8}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className={`text-xs ${ui.subtext}`}>Open details</div>
                    <div className="text-sm font-semibold">→</div>
                  </div>
                </button>
              ))}
            </div>

            {/* hover preview */}
            {hoveredImage && (
              <div
                className={`hidden lg:block fixed z-50 pointer-events-none rounded-2xl border ${ui.border} shadow-xl overflow-hidden`}
                style={{ top: cursorPos.y, left: cursorPos.x, width: 320 }}
              >
                <div className={`${darkMode ? "bg-neutral-900" : "bg-white"}`}>
                  <img
                    src={hoveredImage}
                    alt="preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Games window (single window only) */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12 hidden lg:block"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panelSolid} shadow-lg overflow-hidden`}
        >
          {/* window chrome */}
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${ui.border} ${darkMode ? "bg-neutral-900" : "bg-white"}`}
          >
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <div className={`ml-3 text-sm font-semibold ${ui.text}`}>
                Nostalgia.exe
              </div>
            </div>
            <div className={`text-xs ${ui.subtext}`}>Choose a game</div>
          </div>

          {/* light bg in light mode, dark components inside games */}
          <div
            className={`${darkMode ? "bg-neutral-950" : "bg-[#f7f7f2]"} p-4 sm:p-6`}
          >
            <SnakeGame darkMode={darkMode} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12 pb-10"
        id="contact-section"
        data-reveal
      >
        <div
          className={`rounded-3xl border ${ui.border} ${ui.panel} backdrop-blur-xl shadow-lg`}
        >
          <div className="px-4 sm:px-6 py-8">
            <div>
              <div className="text-lg font-semibold">Get in touch</div>
              <div
                className={`mt-1 h-[2px] w-16 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full`}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <button
                className={`cursor-pointer rounded-3xl border ${ui.border} ${
                  darkMode
                    ? "bg-white/6 hover:bg-white/8"
                    : "bg-black/5 hover:bg-black/7"
                } transition p-5 text-left active:scale-[0.99] ${ui.accentRing}`}
                onClick={() =>
                  copyToClipboard("raufun.nazin13@gmail.com", "contact-email")
                }
                type="button"
              >
                <div className="text-sm font-semibold">Email</div>
                <div className={`mt-1 text-sm ${ui.subtext}`}>
                  raufun.nazin13@gmail.com
                </div>
                <div className={`mt-4 text-xs ${ui.subtext}`}>
                  {copiedKey === "contact-email" ? "Copied" : "Click to copy"}
                </div>
              </button>

              <button
                className={`cursor-pointer rounded-3xl border ${ui.border} ${
                  darkMode
                    ? "bg-white/6 hover:bg-white/8"
                    : "bg-black/5 hover:bg-black/7"
                } transition p-5 text-left active:scale-[0.99] ${ui.accentRing}`}
                onClick={() =>
                  copyToClipboard("+8801682386618", "contact-phone")
                }
                type="button"
              >
                <div className="text-sm font-semibold">Phone</div>
                <div className={`mt-1 text-sm ${ui.subtext}`}>
                  +880-1682-386618
                </div>
                <div className={`mt-4 text-xs ${ui.subtext}`}>
                  {copiedKey === "contact-phone" ? "Copied" : "Click to copy"}
                </div>
              </button>

              <div
                className={`rounded-3xl border ${ui.border} ${darkMode ? "bg-white/6" : "bg-black/5"} p-5`}
              >
                <div className="text-sm font-semibold">Links</div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} px-3 py-2 text-sm transition active:scale-[0.98] ${ui.accentRing}`}
                    onClick={() => window.open("https://wa.me/8801682386618")}
                    type="button"
                  >
                    WhatsApp
                  </button>
                  <button
                    className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} px-3 py-2 text-sm transition active:scale-[0.98] ${ui.accentRing}`}
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/RaufunNazin/")
                    }
                    type="button"
                  >
                    LinkedIn
                  </button>
                  <button
                    className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} px-3 py-2 text-sm transition active:scale-[0.98] ${ui.accentRing}`}
                    onClick={() =>
                      window.open("https://www.github.com/RaufunNazin")
                    }
                    type="button"
                  >
                    GitHub
                  </button>
                </div>
                <div className={`mt-4 text-sm ${ui.subtext}`}>
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>

            <div
              className={`mt-7 pt-6 border-t ${ui.border} text-center text-xs ${ui.subtext}`}
            >
              2025 &copy; Raufun Nazin Srizon. All rights reserved.
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setActiveProject(null)}
            aria-hidden="true"
          />
          <div
            className={`relative w-full max-w-2xl rounded-3xl border ${ui.border} ${ui.panelSolid} shadow-xl overflow-hidden`}
            role="dialog"
            aria-modal="true"
          >
            <div
              className={`p-5 sm:p-6 border-b ${ui.border} flex items-start justify-between gap-4`}
            >
              <div className="min-w-0">
                <div className="text-xl font-semibold truncate">
                  {activeProject.title}
                </div>
                <div className={`mt-1 text-sm ${ui.subtext}`}>
                  {activeProject.type}
                </div>
              </div>
              <button
                className={`cursor-pointer rounded-2xl border ${ui.border} ${ui.button} px-3 py-2 text-sm transition active:scale-[0.98] ${ui.accentRing}`}
                onClick={() => setActiveProject(null)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div
                className={`rounded-2xl border ${ui.border} overflow-hidden`}
              >
                <img
                  src={activeProject.src}
                  alt={activeProject.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className={`mt-4 text-sm ${ui.subtext}`}>
                {activeProject.description}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.tech.map((t) => (
                  <span
                    key={`${activeProject.title}-${t}`}
                    className={`text-xs px-2.5 py-1 rounded-full border ${ui.border} ${ui.chip}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
