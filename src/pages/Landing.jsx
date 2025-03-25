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

const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

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
      .then(() => toast.success("Email sent!"))
      .catch(() => toast.error("Failed to send email."))
      .finally(() => {
        setLoading(false);
        setBody("");
      });
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    element.scrollIntoView({ behavior: "smooth" });
  };

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

  return (
    <div
      style={{
        backgroundImage: `url('/Background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "start",
        backgroundAttachment: "fixed",
      }}
      className="h-full"
    >
      <div className="w-full md:w-5/6 lg:w-4/5 mx-auto px-3 md:px-0">
        {/* Navbar */}
        <div className="flex w-full justify-between items-center py-5 text-white">
          <div>
            <img src="/signature.png" alt="signature" className="h-8" />
          </div>
          <div className="md:flex gap-5 hidden">
            {/* <button className="cursor-pointer underline-button">About</button> */}
            <button
              className="cursor-pointer underline-button"
              onClick={() => scrollToSection("projects-section")}
            >
              Projects
            </button>
            <button
              className="cursor-pointer underline-button"
              onClick={() => scrollToSection("contact-section")}
            >
              Contact
            </button>
          </div>
          <button
            className="cursor-pointer border border-white hover:bg-white hover:text-gray-800 px-3 py-1 rounded-md duration-200 transition-all"
            onClick={() => window.open("/Resume__Raufun_Nazin_Srizon.pdf")}
          >
            View Resume
          </button>
        </div>

        {/* Social Links */}
        <div className="hidden fixed left-0 top-1/2 -translate-y-1/2 md:flex flex-col rounded-r-lg overflow-hidden shadow-lg">
          <button
            className="cursor-pointer bg-[#df4437]/80 hover:bg-[#df4437] duration-200 transition-all p-2"
            onClick={() => {
              navigator.clipboard
                .writeText("raufun.nazin13@gmail.com")
                .then(() => toast.info("Email copied to clipboard!"))
                .catch(() => toast.error("Failed to copy email"));
            }}
          >
            <BiLogoGmail className="text-white text-xl h-5 w-5" />
          </button>
          <button
            className="cursor-pointer bg-[#0a66c2]/80 hover:bg-[#0a66c2] duration-200 transition-all p-2"
            onClick={() =>
              window.open("https://www.linkedin.com/in/RaufunNazin/")
            }
          >
            <FaLinkedinIn className="text-white text-xl h-5 w-5" />
          </button>
          <button
            className="cursor-pointer bg-[#15191f]/80 hover:bg-[#15191f] duration-200 transition-all p-2"
            onClick={() => window.open("https://www.github.com/RaufunNazin")}
          >
            <FaGithub className="text-white text-xl h-5 w-5" />
          </button>
          <button
            className="cursor-pointer bg-[#25d366]/80 hover:bg-[#25d366] duration-200 transition-all p-2"
            onClick={() => window.open("https://wa.me/8801682386618")}
          >
            <FaWhatsapp className="text-white text-xl h-5 w-5" />
          </button>
          <button
            className="cursor-pointer bg-[#0866ff]/80 hover:bg-[#0866ff] duration-200 transition-all p-2"
            onClick={() => window.open("https://www.facebook.com/srizon13")}
          >
            <FaFacebookF className="text-white text-xl h-5 w-5" />
          </button>
        </div>

        {/* Hero section */}
        <div className="my-24 md:my-52 flex flex-col gap-8 md:gap-5 md:border-r-4 border-white">
          <div className="font-bold text-white typewriter-container -mb-8">
            <span className="typewriter flex">
              <div className="text-[16px] md:text-[24px]">Hi there! I am</div>
              <span className="text-blue-500 text-[48px] md:text-[96px] -ml-1">
                Raufun Nazin Srizon
              </span>
            </span>
            <span className="cursor text-[48px] md:text-[96px]">|</span>
          </div>
          <div className="text-white text-[24px] md:text-[40px] fade-in-text">
            Full Stack Developer |<br className="block md:hidden" /> UI/UX &
            Graphic Designer
          </div>
          <button className="px-3 md:px-5 py-1 md:py-3 rounded-md border border-white text-white hover:bg-white hover:text-gray-800 cursor-pointer w-fit fade-in-text -mt-3 md:-mt-0" onClick={() => scrollToSection("contact-section")}>
            Contact Me
          </button>
        </div>

        {/* Companies section */}
        <div className="flex flex-col gap-3 md:gap-5 fade-in-text">
          <div className="text-white text-[16px] md:text-[24px]">
            Trusted by
          </div>
          <div className="flex flex-col gap-10 w-full">
            <div className="flex gap-5 items-center">
              <img src="/amicsoft.png" alt="company" className="h-5 md:h-7" />
              <img src="/shaped.svg" alt="company" className="h-7 md:h-9" />
              <img src="/zoopsign.svg" alt="company" className="h-5 md:h-7" />
            </div>
            <div className="flex md:hidden gap-3 items-center">
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText("raufun.nazin13@gmail.com")
                    .then(() => toast.info("Email copied to clipboard!"))
                    .catch(() => toast.error("Failed to copy email"));
                }}
                className="cursor-pointer"
              >
                <img src="/gmail.png" alt="gmail" className="h-5 md:h-7" />
              </button>
              <button
                className="cursor-pointer"
                onClick={() =>
                  window.open("https://www.linkedin.com/in/RaufunNazin/")
                }
              >
                <img
                  src="/linkedin.png"
                  alt="linkedin"
                  className="h-5 md:h-7"
                />
              </button>
              <button
                className="cursor-pointer"
                onClick={() =>
                  window.open("https://www.github.com/RaufunNazin")
                }
              >
                <img src="/github.png" alt="github" className="h-5 md:h-7" />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => window.open("https://wa.me/8801682386618")}
              >
                <img
                  src="/whatsapp.png"
                  alt="whatsapp"
                  className="h-5 md:h-7"
                />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => window.open("https://www.facebook.com/srizon13")}
              >
                <img
                  src="/facebook.png"
                  alt="facebook"
                  className="h-5 md:h-7"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Projects section */}
        <div
          className="flex flex-col gap-5 my-24 md:my-52 items-center justify-center"
          id="projects-section"
        >
          <div className="text-white text-[32px] md:text-[52px] underline-button">
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
                    <div className="text-white text-[20px] md:text-[24px]">
                      {project.title}
                    </div>
                    <div className="text-white text-[14px] md:text-[16px] -mt-3">
                      {project.description}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Skills section */}
        <div className="flex flex-col gap-5 my-24 md:my-52 items-center justify-center">
          <div className="text-white text-[32px] md:text-[52px] underline-button">
            What Sets Me Apart
          </div>

          {/* Bento Box */}
          <div className="w-full grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 gap-3 md:gap-5 rounded-md">
            <div className="rounded-md p-5 bg-green-400 md:bg-green-400/80 hover:bg-green-400 transition-all duration-200 ring-1 ring-black/20 flex flex-col justify-center items-center">
              <div className="text-[40px]">4+</div>
              <div className="text-[20px]">Years of experience</div>
            </div>
            <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-center">
              <div className="flex flex-col items-center justify-around gap-5">
                <img
                  src="/gear.png"
                  alt="gear"
                  className="w-10 h-10 animate-spin"
                />
                <div className="text-white text-[20px]">Problem Solver</div>
              </div>
            </div>

            <div className="md:col-span-2 rounded-md p-5 bg-blue-400 md:bg-blue-400/80 hover:bg-blue-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-around items-center text-white">
              <img src="/shaped.svg" alt="shaped" className="h-6" />
              <div className="text-[32px]">Junior Frontend Engineer</div>
              <div className="text-[12px]">April 2023 - March 2024</div>
            </div>

            <div className="col-span-1 row-span-3 rounded-md p-5 bg-white md:bg-white/80 hover:bg-white transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-around items-center gap-3">
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
            <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-center">
              <div className="flex flex-col items-center justify-around gap-5">
                <img
                  src="/idea.png"
                  alt="idea"
                  className="w-10 h-10 animate-pulse"
                />
                <div className="text-white text-[20px]">Critical Thinker</div>
              </div>
            </div>
            <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-center">
              <div className="flex flex-col gap-5 items-center justify-around">
                <img
                  src="/detail.png"
                  alt="detail"
                  className="w-10 h-10 animate-pulse"
                />
                <div className="text-white text-[20px]">Detail-Oriented</div>
              </div>
            </div>
            <div className="md:col-span-2 rounded-md p-5 bg-yellow-400 md:bg-yellow-400/80 hover:bg-yellow-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-around items-center">
              <div className="flex gap-2 items-center">
                <img src="/medal.png" alt="medal" className="h-7" />
                <div className="text-[24px]">Finalist</div>
              </div>
              <div className="text-[32px]">ITVerse 2023</div>
              <div className="text-[12px]">IIT, DU</div>
            </div>
            <div className="rounded-md p-5 bg-purple-400 md:bg-purple-400/80 hover:bg-purple-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-center">
              <div className="flex flex-col gap-5 items-center justify-around">
                <img
                  src="/hourglass.png"
                  alt="hourglass"
                  className="w-8 h-8 animate-spin"
                />
                <div className="text-white text-[20px]">Deadline-Driven</div>
              </div>
            </div>
            <div className="col-span-1 row-span-2 rounded-md p-5 bg-white md:bg-white/80 hover:bg-white transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-around items-center gap-3">
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
            <div className="md:col-span-2 rounded-md p-5 bg-yellow-400 md:bg-yellow-400/80 hover:bg-yellow-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-around items-center">
              <div className="flex gap-2 items-center">
                <img src="/medal.png" alt="medal" className="h-7" />
                <div className="text-[24px]">Finalist</div>
              </div>
              <div className="text-[32px]">Code Samurai 2024</div>
              <div className="text-[12px]">CSE, DU</div>
            </div>
            <div className="md:col-span-2 rounded-md p-5 bg-blue-400 md:bg-blue-400/80 hover:bg-blue-400 transition-all duration-200 shadow-lg ring-1 ring-black/20 flex flex-col justify-around items-center text-white">
              <img src="/zoopsign.svg" alt="shaped" className="h-6" />
              <div className="text-[32px]">Full Stack Developer</div>
              <div className="text-[12px]">June 2022 - March 2023</div>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div
          className="flex flex-col gap-5 mt-24 md:mt-52 items-center justify-center"
          id="contact-section"
        >
          <div className="text-white text-[32px] md:text-[52px] underline-button">
            Let's Connect & Create
          </div>
          <div className="flex flex-col md:flex-row justify-around w-full items-center gap-10">
            <div className="flex flex-col gap-5 w-full">
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => {
                  navigator.clipboard
                    .writeText("raufun.nazin13@gmail.com")
                    .then(() => toast.info("Email copied to clipboard!"))
                    .catch(() => toast.error("Failed to copy email!"));
                }}
              >
                <div>
                  <img src="/mail.png" alt="email" className="h-8 md:h-10" />
                </div>
                <div>
                  <div className="text-gray-500 font-bold text-[12px] -mb-1">
                    Email Address
                  </div>
                  <div className="text-white">raufun.nazin13@gmail.com</div>
                </div>
              </div>
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => {
                  navigator.clipboard
                    .writeText("+8801682386618")
                    .then(() => toast.info("Phone number copied to clipboard!"))
                    .catch(() => toast.error("Failed to copy phone number!"));
                }}
              >
                <div>
                  <img src="/call.png" alt="phone" className="h-8 md:h-10" />
                </div>
                <div>
                  <div className="text-gray-500 font-bold text-[12px] -mb-1">
                    Phone Number
                  </div>
                  <div className="text-white">+880-1682-386618</div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div>
                  <img
                    src="/location.png"
                    alt="email"
                    className="h-8 md:h-10"
                  />
                </div>
                <div>
                  <div className="text-gray-500 font-bold text-[12px] -mb-1">
                    Address
                  </div>
                  <div className="text-white">Dhaka, Bangladesh</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <div className="text-white">Send me a message</div>
              <textarea
                placeholder="Greetings, human! I'm interested in whatever magic you're selling."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border-b border-white text-white mt-3 ring-0 outline-none"
                rows={3}
              ></textarea>
              <button
                className="px-3 md:px-5 py-1 md:py-2 rounded-md border border-white text-white hover:bg-white hover:text-gray-800 cursor-pointer w-[75px] duration-200 transition-all flex justify-center mt-3"
                onClick={sendEmail}
              >
                {loading ? (
                  <AiOutlineLoading className="animate-spin text-white text-2xl" />
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col mt-8 md:mt-16 items-center justify-center">
          <hr className="w-full border-white" />
          <div className="text-white text-[12px] md:text-[20px] text-center py-3">
            &copy; 2025 Raufun Nazin Srizon. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
