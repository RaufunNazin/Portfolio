import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Landing = () => {
  const [background, setBackground] = useState(20);
  const parallaxRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1.5,
          pin: true,
          onUpdate: (self) => {
            setBackground(Math.ceil(self.progress * 100 + 20));
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

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
        <div className="my-48 flex flex-col gap-5 border-r-4 border-white">
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
          <button className="px-5 py-3 rounded-md border border-white text-white hover:bg-white hover:text-gray-800 duration-200 transition-all cursor-pointer w-fit fade-in-text">
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
