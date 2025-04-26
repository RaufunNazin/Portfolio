import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { AiOutlineLoading } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import SnakeGame from "../components/SnakeGame";
import { FaMoon, FaSun } from "react-icons/fa";

const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const projects = [
    {
      src: "/snapgenix.png",
      title: "Snapgenix",
      description:
        "A photography and videography company specializing in food photography, as well as product and event photography.",
    },
    {
      src: "/ukway.png",
      title: "UKWay",
      description:
        "An education consultancy guiding students to apply to various universities across the UK.",
    },
    {
      src: "/msadmission.png",
      title: "MS Admission Portal, CSEDU",
      description:
        "Official admission portal for MS students of the Department of CSE, University of Dhaka.",
    },
    {
      src: "/pmics.png",
      title: "PMICS Admission Portal, CSEDU",
      description:
        "Admission portal for PMICS master's program students of the Department of CSE, University of Dhaka.",
    },
    {
      src: "/swadeshfood.png",
      title: "Swadesh Food",
      description:
        "An agro-farm company focused on producing and delivering fresh farm products directly to consumers.",
    },
  ];

  var carouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: isMobile ? true : false,
    dots: isMobile ? true : false,
    centerMode: isMobile ? false : true,
    draggable: true,
    pauseOnHover: false,
  };

  const sendEmail = () => {
    if (!body) {
      return toast.error("Don't you want to say something? 😅");
    }
    setLoading(true);
    emailjs
      .send(
        "service_zoxiy5b",
        "template_ewxcftq",
        { message: body },
        "MFnvQ0EM3D9sI6-qZ"
      )
      .then(() => toast.success("I've received your email!"))
      .catch(() => toast.error("Failed to send email!"))
      .finally(() => {
        setLoading(false);
        setBody("");
      });
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    element.scrollIntoView({ behavior: "smooth" });
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
    checkDarkMode();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const projectSection = document.getElementById("slider-section");
    if (!projectSection) return;

    const handleScroll = () => {
      const rect = projectSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100 && rect.bottom >= 0) {
        projectSection.classList.add("show"); // Trigger the animation
        window.removeEventListener("scroll", handleScroll); // Remove the event listener once triggered
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Classes that change based on dark mode
  const mainBgClass = darkMode ? "bg-gray-900" : "bg-[#efefed]";
  const secondaryBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const textClass = darkMode ? "text-gray-200" : "text-gray-800";
  const buttonBgClass = darkMode
    ? "bg-gray-700 hover:bg-gray-600"
    : "bg-white hover:bg-white/80";
  const buttonTextClass = darkMode ? "text-gray-200" : "text-gray-800";
  const sectionAccentBgClass = darkMode ? "bg-gray-900" : "bg-[#efefed]";
  const borderClass = darkMode ? "border-gray-200" : "border-gray-800";
  const inputBorderClass = darkMode
    ? "border-gray-200 md:border-gray-700"
    : "border-gray-800 md:border-[#efefed]";
  const contactBgClass = darkMode ? "bg-gray-800" : "md:bg-white";
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
  const sendButtonClass = darkMode
    ? "bg-[#efefed]/80 text-gray-800 hover:bg-[#efefed]"
    : " bg-gray-800/80 text-[#efefed] hover:bg-gray-800";

  return (
    <div className={`h-full ${mainBgClass} overflow-x-hidden`}>
      <div className="w-full mx-auto md:px-0">
        {/* Navbar */}
        <div className="px-2 md:px-0 md:w-5/6 lg:w-4/5 mx-auto flex w-full justify-between items-center py-5">
          <div>
            <img
              src={darkMode ? "signature.png" : "/signature-white.png"}
              alt="signature"
              className="h-8"
            />
          </div>
          <div className="flex gap-3">
            <button
              className={`cursor-pointer ${buttonBgClass} ${buttonTextClass} py-2 px-4 rounded-full duration-200 transition-all flex items-center justify-center`}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </button>
            <button
              className={`cursor-pointer ${buttonBgClass} ${buttonTextClass} px-5 md:px-8 py-2 md:py-3 rounded-full duration-200 transition-all`}
              onClick={() => window.open("/Resume__Raufun_Nazin_Srizon.pdf")}
            >
              View Resume
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col rounded-r-lg overflow-hidden shadow-lg z-50">
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
              className={`${socialButtonTextClass} text-xl h-3 w-3 md:h-5 md:w-5`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} ${socialButtonBorderClass} duration-200 transition-all p-2`}
            onClick={() =>
              window.open("https://www.linkedin.com/in/RaufunNazin/")
            }
          >
            <FaLinkedinIn
              className={`${socialButtonTextClass} text-xl h-3 w-3 md:h-5 md:w-5`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} ${socialButtonBorderClass} duration-200 transition-all p-2`}
            onClick={() => window.open("https://www.github.com/RaufunNazin")}
          >
            <FaGithub
              className={`${socialButtonTextClass} text-xl h-3 w-3 md:h-5 md:w-5`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} ${socialButtonBorderClass} duration-200 transition-all p-2`}
            onClick={() => window.open("https://wa.me/8801682386618")}
          >
            <FaWhatsapp
              className={`${socialButtonTextClass} text-xl h-3 w-3 md:h-5 md:w-5`}
            />
          </button>
          <button
            className={`cursor-pointer ${socialButtonClass} duration-200 transition-all p-2`}
            onClick={() => window.open("https://www.facebook.com/srizon13")}
          >
            <FaFacebookF
              className={`${socialButtonTextClass} text-xl h-3 w-3 md:h-5 md:w-5`}
            />
          </button>
        </div>

        {/* Hero section */}
        <div className={secondaryBgClass}>
          <div
            className={`py-24 md:py-52 ${sectionAccentBgClass} rounded-b-[50px] md:rounded-b-[150px]`}
          >
            <div
              className={`px-2 md:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col items-center md:items-start gap-8 md:gap-5 md:border-r-4 ${borderClass}`}
            >
              <div className={`font-bold ${textClass} -mb-8`}>
                <div
                  className={`${textClass} fade-in-text text-[20px] md:text-[32px] font-light text-center md:text-left`}
                >
                  Hello, I'm Raufun Nazin Srizon
                </div>
                <div
                  className={`${textClass} fade-in-text text-[40px] md:text-[96px] uppercase text-center md:text-left`}
                >
                  I Transform Ideas Into
                  <br />
                  Digital Solutions
                </div>
              </div>
              <div
                className={`${underlineButtonClass} text-[20px] md:text-[32px] fade-in-text underline-button w-fit text-center md:text-left`}
              >
                Full Stack Software Engineer
              </div>
              <button
                className={`px-5 md:px-8 py-2 md:py-3 rounded-full ${buttonTextClass} ${buttonBgClass} cursor-pointer w-fit fade-in-text -mt-3 md:-mt-0`}
                onClick={() => scrollToSection("contact-section")}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        {/* Companies section */}
        <div className={mainBgClass}>
          <div
            className={`py-12 md:py-24 ${secondaryBgClass} rounded-b-[50px] md:rounded-b-[150px]`}
          >
            <div className="px-2 md:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col items-center gap-5 md:gap-10 fade-in-text">
              <div
                className={`underline-button ${underlineButtonClass} text-[20px] md:text-[32px]`}
              >
                Trusted by
              </div>
              <div className="flex flex-col items-center gap-10 w-full">
                <div className="grid grid-cols-2 gap-5 items-center md:flex w-full md:justify-between md:items-center grayscale">
                  <img
                    src={darkMode ? "genesys-white.svg" : "/genesys.svg"}
                    alt="Genesys Softwares"
                    className="h-7 md:h-9 mx-auto"
                  />
                  <img
                    src={darkMode ? "amicsoft-white.png" : "/amicsoft.png"}
                    alt="Amicsoft"
                    className="h-5 md:h-7 mx-auto"
                  />
                  <img
                    src={darkMode ? "shaped-white.svg" : "/shaped.svg"}
                    alt="Shaped.ai"
                    className="h-6 md:h-9 mx-auto"
                  />
                  <img
                    src={darkMode ? "zoopsign-white.svg" : "/zoopsign.svg"}
                    alt="Zoopsign"
                    className="h-6 md:h-7 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects section */}
        <div
          className={`px-2 md:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col gap-5 my-24 md:my-52 items-center justify-center`}
          id="projects-section"
        >
          <div
            className={`underline-button ${underlineButtonClass} text-[20px] md:text-[32px]`}
          >
            What I've Built So Far
          </div>
          <div className="w-full md:w-4/5 fade-in-up" id="slider-section">
            <Slider {...carouselSettings}>
              {projects.map((project, index) => (
                <div key={index} className="px-2 md:px-5">
                  <div className="flex flex-col justify-start gap-3">
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className={`${textClass} text-[20px] md:text-[24px]`}>
                      {project.title}
                    </div>
                    <div
                      className={`${textClass} text-[14px] md:text-[16px] -mt-3`}
                    >
                      {project.description}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Skills section */}
        <div className={mainBgClass}>
          <div
            className={`py-24 md:py-52 ${secondaryBgClass} rounded-[50px] md:rounded-[150px]`}
          >
            <div className="px-2 md:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col gap-5 items-center justify-center">
              <div
                className={`${underlineButtonClass} text-[20px] md:text-[32px] underline-button`}
              >
                What Sets Me Apart
              </div>

              {/* Bento Box */}
              <div className="w-full grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 gap-3 md:gap-5 rounded-md">
                <div className="rounded-md p-5 bg-green-400 md:bg-green-400/80 hover:bg-green-400 transition-all duration-200 flex flex-col justify-center items-center">
                  <div className="text-[40px]">4+</div>
                  <div className="text-[20px]">Years of experience</div>
                </div>
                <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 flex flex-col justify-center">
                  <div className="flex flex-col items-center justify-around gap-5">
                    <img
                      src="/gear.png"
                      alt="gear"
                      className="w-10 h-10 animate-spin"
                    />
                    <div className="text-gray-800 text-[20px]">
                      Problem Solver
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 rounded-md p-5 bg-blue-400 md:bg-blue-400/80 hover:bg-blue-400 transition-all duration-200 flex flex-col justify-around items-center text-gray-800">
                  <img src="/shaped.svg" alt="shaped" className="h-6" />
                  <div className="text-[32px]">Software Engineer</div>
                  <div className="text-[16px]">April 2023 - March 2024</div>
                </div>

                <div className="col-span-1 row-span-3 rounded-md p-5 bg-[#efefed] md:bg-[#efefed]/80 hover:bg-[#efefed] transition-all duration-200 flex flex-col justify-around items-center gap-3">
                  <div>Specialized Excellence</div>
                  <div className="grid grid-cols-5 md:grid-cols-2 gap-5">
                    <img
                      src="/expressjs.png"
                      alt="expressjs"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/tailwind.png"
                      alt="tailwind"
                      className="h-7 mx-auto my-auto"
                    />
                    <img
                      src="/nextjs.png"
                      alt="next"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/git.png"
                      alt="git"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/ts.png"
                      alt="typescript"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/nodejs.png"
                      alt="node"
                      className="h-6 mx-auto my-auto"
                    />
                    <img
                      src="/fastapi.svg"
                      alt="fastapi"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/react.png"
                      alt="react"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/python.svg"
                      alt="python"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/postgres.png"
                      alt="postgres"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/js.png"
                      alt="javascript"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/django.svg"
                      alt="django"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/mongodb.png"
                      alt="mongodb"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/mysql.svg"
                      alt="mysql"
                      className="h-12 mx-auto my-auto"
                    />
                  </div>
                </div>
                <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 flex flex-col justify-center">
                  <div className="flex flex-col items-center justify-around gap-5">
                    <img
                      src="/idea.png"
                      alt="idea"
                      className="w-10 h-10 animate-pulse"
                    />
                    <div className="text-gray-800 text-[20px]">
                      Critical Thinker
                    </div>
                  </div>
                </div>
                <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 flex flex-col justify-center">
                  <div className="flex flex-col gap-5 items-center justify-around">
                    <img
                      src="/detail.png"
                      alt="detail"
                      className="w-10 h-10 animate-pulse"
                    />
                    <div className="text-gray-800 text-[20px]">
                      Detail-Oriented
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 rounded-md p-5 bg-yellow-400 md:bg-yellow-400/80 hover:bg-yellow-400 transition-all duration-200 flex flex-col justify-around items-center">
                  <div className="flex gap-2 items-center">
                    <img src="/medal.png" alt="medal" className="h-7" />
                    <div className="text-[24px]">Finalist</div>
                  </div>
                  <div className="text-[32px]">ITVerse 2023</div>
                  <div className="text-[16px]">IIT, DU</div>
                </div>
                <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 flex flex-col justify-center">
                  <div className="flex flex-col gap-5 items-center justify-around">
                    <img
                      src="/hourglass.png"
                      alt="hourglass"
                      className="w-8 h-8 animate-spin"
                    />
                    <div className="text-gray-800 text-[20px]">
                      Deadline-Driven
                    </div>
                  </div>
                </div>
                <div className="col-span-1 row-span-2 rounded-md p-5 bg-[#efefed] md:bg-[#efefed]/80 hover:bg-[#efefed] transition-all duration-200 flex flex-col justify-around items-center gap-3">
                  <div>Growing Competence</div>
                  <div className="grid grid-cols-5 md:grid-cols-2 gap-5">
                    <img
                      src="/docker.webp"
                      alt="docker"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/cpp.png"
                      alt="cpp"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/java.webp"
                      alt="java"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/oracle.png"
                      alt="oracle"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/sass.png"
                      alt="sass"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/firebase.png"
                      alt="firebase"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/figma.png"
                      alt="figma"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/illustrator.png"
                      alt="illustrator"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/photoshop.png"
                      alt="photoshop"
                      className="h-10 mx-auto my-auto"
                    />
                    <img
                      src="/kubernetes.png"
                      alt="kubernetes"
                      className="h-10 mx-auto my-auto"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 rounded-md p-5 bg-yellow-400 md:bg-yellow-400/80 hover:bg-yellow-400 transition-all duration-200 flex flex-col justify-around items-center">
                  <div className="flex gap-2 items-center">
                    <img src="/medal.png" alt="medal" className="h-7" />
                    <div className="text-[24px]">Finalist</div>
                  </div>
                  <div className="text-[32px]">Code Samurai 2024</div>
                  <div className="text-[16px]">CSE, DU</div>
                </div>
                <div className="md:col-span-2 rounded-md p-5 bg-blue-400 md:bg-blue-400/80 hover:bg-blue-400 transition-all duration-200 flex flex-col justify-around items-center text-gray-800">
                  <img src="/zoopsign.svg" alt="shaped" className="h-6" />
                  <div className="text-[32px]">Full Stack Developer</div>
                  <div className="text-[16px]">June 2022 - March 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Snake Game */}
        <div className="hidden md:flex flex-col gap-5 my-24 md:my-52 items-center justify-center">
          <div
            className={`${underlineButtonClass} text-[20px] md:text-[32px] underline-button`}
          >
            Bored? Try This Mini Game!
          </div>
          <SnakeGame />
        </div>

        {/* Contact section */}
        <div className={mainBgClass}>
          <div
            className={`${contactBgClass} pt-24 md:pt-52 pb-8 md:pb-16 md:rounded-t-[150px]`}
          >
            <div
              className="px-2 md:px-0 md:w-5/6 lg:w-4/5 mx-auto flex flex-col gap-5 items-center justify-center"
              id="contact-section"
            >
              <div
                className={`${underlineButtonClass} text-[32px] md:text-[52px] underline-button`}
              >
                Get in Touch
              </div>
              <div className="flex flex-col md:flex-row justify-around w-full items-center gap-10">
                <div className="flex flex-col gap-5 w-full">
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
                        className="h-8 md:h-10"
                      />
                    </div>
                    <div>
                      <div
                        className={`${textClass} font-bold text-[12px] -mb-1`}
                      >
                        Email Address
                      </div>
                      <div className={textClass}>raufun.nazin13@gmail.com</div>
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
                        className="h-8 md:h-10"
                      />
                    </div>
                    <div>
                      <div
                        className={`${textClass} font-bold text-[12px] -mb-1`}
                      >
                        Phone Number
                      </div>
                      <div className={textClass}>+880-1682-386618</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="grayscale">
                      <img
                        src={darkMode ? "location-white.png" : "/location.png"}
                        alt="location"
                        className="h-8 md:h-10"
                      />
                    </div>
                    <div>
                      <div
                        className={`${textClass} font-bold text-[12px] -mb-1`}
                      >
                        Address
                      </div>
                      <div className={textClass}>Dhaka, Bangladesh</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className={textClass}>Have something to say?</div>
                  <textarea
                    placeholder="Greetings, human! I'm interested in whatever magic you're selling."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={`w-full border-b ${inputBorderClass} ${textClass} mt-3 ring-0 outline-none bg-transparent`}
                    rows={3}
                  ></textarea>
                  <button
                    className={`px-3 md:px-5 py-1 md:py-2 rounded-md cursor-pointer w-[150px] duration-200 transition-all flex justify-center mt-3 ${sendButtonClass}`}
                    onClick={sendEmail}
                  >
                    {loading ? (
                      <AiOutlineLoading className="animate-spin text-[#efefed] text-2xl" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex flex-col items-center justify-center ${secondaryBgClass}`}
        >
          <hr
            className={`w-full border-2 ${
              darkMode ? "border-gray-700" : "border-[#efefed]"
            }`}
          />
          <div
            className={`${textClass} text-[12px] md:text-[20px] text-center py-3`}
          >
            &copy; 2025 Raufun Nazin Srizon. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
