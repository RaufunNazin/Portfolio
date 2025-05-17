import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import SnakeGame from "../components/SnakeGame";
import { FaMoon, FaSun } from "react-icons/fa";
import ExperienceCard from "../components/ExperienceCard";
import { FaRegCopy } from "react-icons/fa6";

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Classes that change based on dark mode
  const mainBgClass = darkMode ? "bg-gray-900" : "bg-[#efefed]";
  const secondaryBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const expertiseClass = darkMode
    ? "bg-gray-800 hover:bg-gray-800/50"
    : "bg-white hpver:bg-white/50";
  const textClass = darkMode ? "text-gray-200" : "text-gray-800";
  const buttonBgClass = darkMode
    ? "bg-gray-700 hover:bg-gray-600"
    : "bg-white hover:bg-white/80";
  const buttonFixedBgClass = darkMode
    ? "bg-gray-700 hover:bg-gray-600 border-2 border-gray-200"
    : "bg-white hover:bg-white/80 border-2 border-gray-800";
  const buttonTextClass = darkMode ? "text-gray-200" : "text-gray-800";
  const buttonFixedTextClass = darkMode ? "text-gray-200" : "text-gray-800";
  const sectionAccentBgClass = darkMode ? "bg-gray-900" : "bg-[#efefed]";
  const borderClass = darkMode ? "border-gray-200" : "border-gray-800";
  const contactBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const underlineButtonClass = darkMode
    ? "underline-button-dark"
    : "underline-button-light";
  const socialButtonClass = darkMode
    ? "bg-[#efefed]/80 hover:bg-[#efefed]"
    : "bg-gray-800/80 hover:bg-gray-800";
  const socialButtonTextClass = darkMode ? "text-gray-800" : "text-[#efefed]";
  const socialButtonBorderClass = darkMode
    ? "border-b border-gray-800"
    : "border-b border-[#efefed]";
  const iconClass = darkMode ? "bg-gray-600/80" : "bg-gray-200/80";

  const projects = [
    {
      src: "/snapgenix.png",
      title: "Snapgenix",
      type: "Portfolio",
      description:
        "A photography and videography company specializing in food photography, as well as product and event photography.",
      tech: [
        "React",
        "FastAPI",
        "MySQL",
        "Tailwind CSS",
        "SQLAlchemy",
        "Docker",
      ],
    },
    {
      src: "/ukway.png",
      title: "UKWay",
      type: "Consultancy",
      description:
        "An education consultancy guiding students to apply to various universities across the UK.",
      tech: [
        "Next.js",
        "Typescript",
        "FastAPI",
        "PostgreSQL",
        "Tailwind CSS",
        "SaaS",
        "Docker",
      ],
    },
    {
      src: "/msadmission.png",
      title: "MS Admission Portal, CSEDU",
      type: "Admission Portal",
      description:
        "Official admission portal for MS students of the Department of CSE, University of Dhaka.",
      tech: ["React", "PHP", "Oracle", "Tailwind CSS", "RTL"],
    },
    {
      src: "/pmics.png",
      title: "PMICS Admission Portal, CSEDU",
      type: "Admission Portal",
      description:
        "Admission portal for PMICS master's program students of the Department of CSE, University of Dhaka.",
      tech: ["React", "PHP", "Oracle", "Tailwind CSS", "RTL"],
    },
    {
      src: "/swadeshfood.png",
      title: "Swadesh Food",
      type: "E-Commerce",
      description:
        "An agro-farm company focused on producing and delivering fresh farm products directly to consumers.",
      tech: [
        "React",
        "FastAPI",
        "MySQL",
        "Tailwind CSS",
        "SQLAlchemy",
        "Docker",
      ],
    },
  ];

  const expertise = [
    {
      title: "Figma",
      image: "/figma.png",
      desc: "Since 2022",
    },
    {
      title: "Typescript",
      image: "/ts.png",
      desc: "Since 2023",
    },
    {
      title: "React",
      image: "/react.png",
      desc: "Since 2022",
    },
    {
      title: "Next.js",
      image: "/nextjs.png",
      desc: "Since 2023",
    },
    {
      title: "Tailwind",
      image: "/tailwind.png",
      desc: "Since 2022",
    },
    {
      title: "Python",
      image: "/python.svg",
      desc: "Since 2022",
    },
    {
      title: "FastAPI",
      image: "/fastapi.svg",
      desc: "Since 2023",
    },
    {
      title: "MongoDB",
      image: "/mongodb.png",
      desc: "Since 2022",
    },
    {
      title: "Git",
      image: "/git.png",
      desc: "Since 2022",
    },
    {
      title: "Docker",
      image: "/docker.webp",
      desc: "Since 2022",
    },
    {
      title: "Linux",
      image: "/linux.png",
      desc: "Since 2020",
    },
    {
      title: "Photoshop",
      image: "/photoshop.png",
      desc: "Since 2017",
    },
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company: "Maestro Solutions Ltd.",
      duration: "May 2025 - Present",
      type: "On-site, Full-time",
      image: darkMode ? "/maestro-white.png" : "/maestro.png",
      summary: "Building tools for ISPs to monitor and manage.",
      details: [
        "Working on ISP tools like IP log servers, billing systems, and SMS gateways.",
        "Currently developing a network device monitoring app with ONU data and tree views.",
        "Designing scalable frontend and backend systems.",
        "Collaborating with network engineers to optimize real-time monitoring.",
      ],
      tech: [
        "React",
        "FastAPI",
        "Python",
        "Typescript",
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
      summary: "Visualized AI model performance data.",
      details: [
        "Implemented complex charts using Visx and custom libraries.",
        "Built an interactive dot plot from scratch for 10k+ points.",
        "Enabled zooming, panning, and full interactivity.",
        "Helped users understand the impact of ML recommendations.",
      ],
      tech: [
        "Next.js",
        "Express.js",
        "Typescript",
        "Node.js",
        "AWS EC2",
        "Jenkins",
        "VisX",
        "Chart.js",
        "SVG",
        "Recharts",
      ],
      isCurrent: false,
    },
    {
      title: "Full Stack Developer",
      company: "Zoopsign",
      duration: "June 2022 - March 2023",
      type: "Remote, Contract",
      image: darkMode ? "/zoopsign-white.svg" : "/zoopsign.svg",
      summary: "Developed a premium in-browser PDF editor.",
      details: [
        "Created the EditPDF module with drawing, text, and shape tools.",
        "Enabled size, color, rotation, and image manipulation.",
        "Used refs to handle dynamic positioning and transformations.",
        "Contributed to core features now part of the premium plan.",
      ],
      tech: [
        "Next.js",
        "Express.js",
        "Typescript",
        "Node.js",
        "SVG",
        "Github Actions",
      ],
      isCurrent: false,
    },
    {
      title: "Dev Intern",
      company: "Amicsoft",
      duration: "January 2022 - May 2022",
      type: "Remote, Internship",
      image: darkMode ? "/amicsoft-white.png" : "/amicsoft.png",
      summary: "Learned dev best practices through mentorship.",
      details: [
        "Worked under seniors to grasp core JavaScript and clean code.",
        "Contributed to live websites in production environments.",
        "Observed software lifecycles and sprint planning.",
        "First exposure to real-world collaboration and QA testing.",
      ],
      tech: [
        "React",
        "Next.js",
        "Express.js",
        "Node.js",
        "Typescript",
        "MySQL",
      ],
      isCurrent: false,
    },
  ];

  const handleMouseMove = (e, src) => {
    setCursorPos({ x: e.clientX + 20, y: e.clientY + 20 });
    setHoveredImage(src);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const checkDarkMode = () => {
    const darkModePreference = localStorage.getItem("darkMode");
    if (darkModePreference === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100); // Show after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    checkDarkMode();
  }, []);

  return (
    <div className={`h-full ${`${mainBgClass}  duration-200 transition-all`} overflow-x-hidden duration-200 transition-all`}>
      <div className="w-full mx-auto lg:px-0">
        {/* Social Links */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col rounded-l-lg overflow-hidden shadow-lg z-50">
          <button
            className={`cursor-pointer ${socialButtonClass} ${socialButtonBorderClass} duration-200 transition-all p-2`}
            onClick={() => {
              navigator.clipboard
                .writeText("raufun.nazin13@gmail.com")
                .then(() => toast.info("Email copied to clipboard!"))
                .catch(() => toast.error("Failed to copy email"));
            }}
          >
            <BiLogoGmail
              className={`${socialButtonTextClass} text-xl h-3 w-3 lg:h-5 lg:w-5 duration-200 transition-all`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} ${socialButtonBorderClass} duration-200 transition-all p-2`}
            onClick={() =>
              window.open("https://www.linkedin.com/in/RaufunNazin/")
            }
          >
            <FaLinkedinIn
              className={`${socialButtonTextClass} text-xl h-3 w-3 lg:h-5 lg:w-5 duration-200 transition-all`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} ${socialButtonBorderClass} duration-200 transition-all p-2`}
            onClick={() => window.open("https://www.github.com/RaufunNazin")}
          >
            <FaGithub
              className={`${socialButtonTextClass} text-xl h-3 w-3 lg:h-5 lg:w-5 duration-200 transition-all`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} ${socialButtonBorderClass} duration-200 transition-all p-2`}
            onClick={() => window.open("https://wa.me/8801682386618")}
          >
            <FaWhatsapp
              className={`${socialButtonTextClass} text-xl h-3 w-3 lg:h-5 lg:w-5 duration-200 transition-all`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} duration-200 transition-all p-2`}
            onClick={() => window.open("https://www.facebook.com/srizon13")}
          >
            <FaFacebookF
              className={`${socialButtonTextClass} text-xl h-3 w-3 lg:h-5 lg:w-5 duration-200 transition-all`}
            />
          </button>
        </div>
        {showButton && (
          <button
            className={`fixed bottom-5 right-5 cursor-pointer ${buttonFixedBgClass} ${buttonFixedTextClass} p-2 lg:p-4 rounded-full duration-200 transition-all flex items-center justify-center z-50 hover:-rotate-45`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun className="h-3 lg:h-5 w-3 lg:w-5" />
            ) : (
              <FaMoon className="h-3 lg:h-5 w-3 lg:w-5" />
            )}
          </button>
        )}
        {/* Hero section */}
        <div className={`${secondaryBgClass} p-2 lg:p-5 duration-200 transition-all`}>
          <div
            className={`pt-24 pb-8 md:pt-32 md:pb-16 ${sectionAccentBgClass} rounded-[20px] lg:rounded-[50px] relative duration-200 transition-all`}
          >
            {/* Navbar */}
            <div className="absolute top-2 lg:top-5 left-1/2 -translate-x-1/2 px-2 lg:px-0 md:w-5/6 lg:w-4/5 mx-auto flex w-full justify-between items-center py-3 lg:py-5">
              <div>
                <img
                  src={darkMode ? "signature.png" : "/signature-white.png"}
                  alt="signature"
                  className="h-8"
                />
              </div>

              <div className="flex gap-3 items-center">
                <button
                  className={`h-fit cursor-pointer ${buttonBgClass} ${buttonTextClass} p-3.5 lg:p-4 rounded-full duration-200 transition-all flex items-center justify-center hover:-rotate-45`}
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <FaSun className="h-3 w-3 lg:h-4 lg:w-4" />
                  ) : (
                    <FaMoon className="h-3 w-3 lg:h-4 lg:w-4" />
                  )}
                </button>
                <button
                  className={`cursor-pointer ${buttonBgClass} ${buttonTextClass} px-5 lg:px-8 py-2 lg:py-3 rounded-full duration-200 transition-all`}
                  onClick={() =>
                    window.open("/Resume___Raufun_Nazin_Srizon.pdf")
                  }
                >
                  View Resume
                </button>
              </div>
            </div>
            <div
              className={`px-2 lg:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col items-center lg:items-start gap-10 lg:gap-8 ${borderClass} duration-200 transition-all`}
            >
              <div className={`font-bold ${textClass} -mb-8 duration-200 transition-all`}>
                <div
                  className={`${textClass} fade-in-text text-[20px] lg:text-[32px] font-light text-center lg:text-left duration-200 transition-all`}
                >
                  Hello, I'm
                </div>
                <div
                  className={`${textClass} fade-in-text text-[36px] md:text-[64px] lg:text-[96px] uppercase text-center lg:text-left leading-tight font-normal duration-200 transition-all`}
                >
                  Raufun Nazin Srizon
                </div>
              </div>
              <div
                className={`flex flex-col items-center md:flex-row gap-x-2 ${underlineButtonClass} text-[20px] lg:text-[32px] fade-in-text underline-button w-fit text-center lg:text-left duration-200 transition-all`}
              >
                <span>Software Engineer | Full Stack</span>
                <span className="hidden md:inline">|</span>
                <span>4 YoE | Bangladesh</span>
              </div>
              <button
                className={`flex items-center gap-2 px-5 lg:px-8 py-2 lg:py-3 rounded-full ${buttonTextClass} ${buttonBgClass} cursor-pointer w-fit fade-in-text -mt-3 lg:-mt-0 duration-200 transition-all`}
                onClick={() => {
                  navigator.clipboard
                    .writeText("raufun.nazin13@gmail.com")
                    .then(() => toast.info("Email copied to clipboard!"))
                    .catch(() => toast.error("Failed to copy email!"));
                }}
              >
                <FaRegCopy className={`${textClass}text-sm -mt-0.5 duration-200 transition-all`} />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Companies section */}
        <div className={`${mainBgClass}  duration-200 transition-all`}>
          <div
            className={`py-12 lg:py-24 ${secondaryBgClass} rounded-b-[20px] lg:rounded-b-[50px] duration-200 transition-all`}
          >
            <div className="px-2 lg:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col items-center gap-5 lg:gap-10 fade-in-text">
              <div
                className={`underline-button ${underlineButtonClass} text-[20px] lg:text-[32px] duration-200 transition-all`}
              >
                Trusted by
              </div>
              <div className="flex flex-col items-center gap-10 w-full">
                <div className="grid grid-cols-2 gap-5 items-center md:flex w-full md:justify-between md:items-center grayscale">
                  <img
                    src={darkMode ? "maestro-white.png" : "/maestro.png"}
                    alt="Maestro Solutions"
                    className="h-5 lg:h-7 mx-auto duration-200 transition-all"
                  />
                  <img
                    src={darkMode ? "shaped-white.svg" : "/shaped.svg"}
                    alt="Shaped.ai"
                    className="h-6 lg:h-9 mx-auto duration-200 transition-all"
                  />
                  <img
                    src={darkMode ? "zoopsign-white.svg" : "/zoopsign.svg"}
                    alt="Zoopsign"
                    className="h-5 lg:h-7 mx-auto duration-200 transition-all"
                  />
                  <img
                    src={darkMode ? "amicsoft-white.png" : "/amicsoft.png"}
                    alt="Amicsoft"
                    className="h-4 lg:h-6 mx-auto duration-200 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies section */}
        <div
          className={`px-2 lg:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col gap-5 my-24 lg:my-52 items-center justify-center`}
        >
          <div
            className={`underline-button ${underlineButtonClass} text-[20px] lg:text-[32px] duration-200 transition-all`}
          >
            What I Am Experienced In
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 w-full">
            {expertise.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`flex items-center w-full gap-3 rounded-md ${expertiseClass} p-2 transition-all duration-200`}
                >
                  <div
                    className={`rounded-md ${iconClass} h-8 lg:h-12 w-8 lg:w-12 flex items-center justify-center duration-200 transition-all`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-6 lg:h-8"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={`${textClass} text-[20px] lg:text-[24px] underline-button duration-200 transition-all`}
                    >
                      {item.title}
                    </div>
                    <div
                      className={`${textClass} text-[14px] lg:text-[16px] -mt-3 duration-200 transition-all`}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Experience section */}
        <div className={`${`${mainBgClass} duration-200 transition-all`} p-2 lg:p-5`}>
          <div
            className={`py-16 lg:py-52 ${secondaryBgClass} rounded-[20px] lg:rounded-[50px] duration-200 transition-all`}
          >
            <div className="px-2 lg:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col gap-5 items-center justify-center">
              <div
                className={`${underlineButtonClass} text-[20px] lg:text-[32px] underline-button duration-200 transition-all`}
              >
                Where I Have Contributed
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 w-full">
                {experiences.map((exp, idx) => (
                  <ExperienceCard key={idx} exp={exp} darkMode={darkMode} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects section */}
        <div
          className={`px-2 lg:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col gap-5 my-24 lg:my-52 items-center justify-center`}
          id="projects-section"
        >
          <div
            className={`underline-button ${underlineButtonClass} text-[20px] lg:text-[32px] duration-200 transition-all`}
          >
            What I've Built So Far
          </div>
          <div className="flex flex-col w-full relative gap-5 lg:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                onMouseMove={(e) => handleMouseMove(e, project.src)}
                onMouseLeave={handleMouseLeave}
                className="flex flex-col gap-2 lg:gap-4 w-full"
              >
                <div className="flex flex-col md:flex-row w-full justify-between md:items-center gap-2 md:gap-0">
                  <div className="flex flex-col justify-between items-start">
                    <div className={`${textClass} text-[24px] lg:[32px] duration-200 transition-all`}>
                      {project.title}
                    </div>
                    <div
                      className={`hidden md:block ${textClass} text-[12px] lg:text-[16px] duration-200 transition-all`}
                    >
                      {project.description}
                    </div>
                    <div
                      className={`md:hidden ${textClass} text-[12px] lg:text-[16px] duration-200 transition-all`}
                    >
                      {project.type}
                    </div>
                  </div>
                  <div
                    className={`hidden md:block ${textClass} text-[12px] lg:text-[16px] duration-200 transition-all`}
                  >
                    {project.type}
                  </div>
                  <div
                    className={`md:hidden ${textClass} text-[12px] lg:text-[16px] duration-200 transition-all`}
                  >
                    {project.description}
                  </div>
                </div>
                <div className="flex md:flex-row w-full items-center gap-2 flex-wrap">
                  {project.tech.map((tech, idx) => (
                    <div
                      key={idx}
                      className={`rounded-full ${secondaryBgClass} ${textClass} px-3 py-0.5 text-center text-[12px] lg:text-[16px] duration-200 transition-all`}
                    >
                      {tech}
                    </div>
                  ))}
                </div>

                <hr className={`${borderClass} duration-200 transition-all`} />
              </div>
            ))}

            {hoveredImage && (
              <div
                className="fixed z-50 pointer-events-none rounded-md"
                style={{
                  top: cursorPos.y,
                  left: cursorPos.x,
                  width: "300px",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={hoveredImage}
                  alt="preview"
                  className="w-full h-auto rounded-md shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Snake Game */}
        <div className="hidden lg:flex flex-col gap-5 my-24 lg:my-52 items-center justify-center">
          <div
            className={`${underlineButtonClass} text-[20px] lg:text-[32px] underline-button duration-200 transition-all`}
          >
            Bored? Try This Nostalgia!
          </div>
          <SnakeGame />
        </div>

        {/* Contact section */}
        <div className={`${mainBgClass} duration-200 transition-all`}>
          <div
            className={`${contactBgClass} py-8 lg:py-20 rounded-t-[20px] lg:rounded-t-[50px] duration-200 transition-all`}
          >
            <div
              className="px-2 lg:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col gap-5 items-center justify-center"
              id="contact-section"
            >
              <div
                className={`underline-button ${underlineButtonClass} text-[20px] lg:text-[32px] duration-200 transition-all`}
              >
                Get in Touch
              </div>
              <div className="flex flex-col md:flex-row justify-around w-full items-center gap-10">
                <div className="flex flex-col md:flex-row justify-around md:items-center w-full gap-3 md:gap-0">
                  <div
                    className="flex gap-3 items-center cursor-pointer w-fit"
                    onClick={() => {
                      navigator.clipboard
                        .writeText("raufun.nazin13@gmail.com")
                        .then(() => toast.info("Email copied to clipboard!"))
                        .catch(() => toast.error("Failed to copy email!"));
                    }}
                  >
                    <div className="grayscale">
                      <img
                        src={darkMode ? "mail-white.png" : "/mail.png"}
                        alt="email"
                        className="h-8 lg:h-10 duration-200 transition-all"
                      />
                    </div>
                    <div>
                      <div
                        className={`${textClass} font-bold text-[12px] -mb-1 duration-200 transition-all`}
                      >
                        Email Address
                      </div>
                      <div className={`${textClass} duration-200 transition-all`}>raufun.nazin13@gmail.com</div>
                    </div>
                  </div>
                  <div
                    className="flex gap-3 items-center cursor-pointer w-fit"
                    onClick={() => {
                      navigator.clipboard
                        .writeText("+8801682386618")
                        .then(() =>
                          toast.info("Phone number copied to clipboard!")
                        )
                        .catch(() =>
                          toast.error("Failed to copy phone number!")
                        );
                    }}
                  >
                    <div className="grayscale">
                      <img
                        src={darkMode ? "call-white.png" : "/call.png"}
                        alt="phone"
                        className="h-8 lg:h-10 duration-200 transition-all"
                      />
                    </div>
                    <div>
                      <div
                        className={`${textClass} font-bold text-[12px] -mb-1 duration-200 transition-all`}
                      >
                        Phone Number
                      </div>
                      <div className={`${textClass} duration-200 transition-all`}>+880-1682-386618</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="grayscale">
                      <img
                        src={darkMode ? "location-white.png" : "/location.png"}
                        alt="location"
                        className="h-8 lg:h-10 duration-200 transition-all"
                      />
                    </div>
                    <div>
                      <div
                        className={`${textClass} font-bold text-[12px] -mb-1 duration-200 transition-all`}
                      >
                        Address
                      </div>
                      <div className={`${textClass} duration-200 transition-all`}>Dhaka, Bangladesh</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex flex-col items-center justify-center ${secondaryBgClass} duration-200 transition-all`}
        >
          <hr
            className={`w-full border-2 ${
              darkMode ? "border-gray-700" : "border-[#efefed]"
            } duration-200 transition-all`}
          />
          <div
            className={`${textClass} text-[12px] lg:text-[20px] text-center py-3 duration-200 transition-all`}
          >
            2025 &copy; Raufun Nazin Srizon. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
