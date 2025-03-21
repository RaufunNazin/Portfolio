import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Landing = () => {
  const [background, setBackground] = useState(20);
  const parallaxRef = useRef(null);

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
    arrows: false,
    centerMode: true,
    centerPadding: "60px",
    draggable: true,
    pauseOnHover: false,
  };

  useEffect(() => {
    const projectSection = document.getElementById("projects-section");

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

  // useLayoutEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.registerPlugin(ScrollTrigger);

  //     gsap.timeline({
  //       defaults: { duration: 1 },
  //       scrollTrigger: {
  //         trigger: parallaxRef.current,
  //         start: "top top",
  //         end: "+=3000",
  //         scrub: 1.5,
  //         pin: true,
  //         onUpdate: (self) => {
  //           setBackground(Math.ceil(self.progress * 100 + 20));
  //         },
  //       },
  //     });
  //   }, parallaxRef); // 👈 Important: Only apply this to the `parallaxRef`!

  //   return () => ctx.revert();
  // }, []);

  return (
    <div
      style={{
        backgroundImage: `url('/Background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "start",
        backgroundAttachment: "fixed",
      }}
      className="min-h-[500vh]"
    >
      <div className="w-full md:w-5/6 lg:w-4/5 mx-auto">
        {/* Navbar */}
        <div className="flex w-full justify-between items-center py-5 text-white">
          <div>
            <img src="/signature.png" alt="signature" className="h-8" />
          </div>
          <div className="flex gap-5">
            <button className="cursor-pointer underline-button">About</button>
            <button className="cursor-pointer underline-button">
              Projects
            </button>
            <button className="cursor-pointer underline-button">Contact</button>
          </div>
        </div>

        {/* Hero section */}
        <div className="my-52 flex flex-col gap-5 border-r-4 border-white">
          <div className="font-bold text-white typewriter-container -mb-8">
            <span className="typewriter flex">
              <div className="text-[24px] -mb-3">Hi there! I am</div>
              <span className="text-blue-500 text-[96px] -ml-1">
                Raufun Nazin Srizon
              </span>
            </span>
            <span className="cursor text-[96px]">|</span>
          </div>
          <div className="text-white text-[40px] fade-in-text">
            Full Stack Developer | UI/UX & Graphic Designer
          </div>
          <button className="px-5 py-3 rounded-md border border-white text-white hover:bg-white hover:text-gray-800 cursor-pointer w-fit fade-in-text">
            Contact Me
          </button>
        </div>

        {/* Companies section */}
        <div className="flex flex-col gap-5 fade-in-text">
          <div className="text-white text-[24px]">Trusted by</div>
          <div className="flex gap-5 items-center">
            <img src="/amicsoft.png" alt="company" className="h-7" />
            <img src="/shaped.svg" alt="company" className="h-9" />
            <img src="/zoopsign.svg" alt="company" className="h-7" />
          </div>
        </div>

        {/* Projects section */}
        <div className="flex flex-col gap-5 my-48 items-center justify-center">
          <div className="text-white text-[52px] underline-button">
            What I've Built So Far
          </div>

          {/* Test Slider */}
          <div className="w-4/5 fade-in-up" id="projects-section">
            <Slider {...carouselSettings}>
              {projects.map((project, index) => (
                <div key={index} className="px-5">
                  <div className="flex flex-col justify-start gap-3">
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="text-white text-[24px]">
                      {project.title}
                    </div>
                    <div className="text-white text-[16px] -mt-3">
                      {project.description}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
