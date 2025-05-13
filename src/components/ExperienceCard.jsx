// ExperienceCard.jsx
import { useState } from "react";

const ExperienceCard = ({ exp, darkMode }) => {
  const [flipped, setFlipped] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const textClass = darkMode ? "text-gray-200" : "text-gray-800";
  const flipCardClass = darkMode ? "bg-gray-900" : "bg-[#efefed]";
  const borderClass = darkMode ? "border-gray-900" : "border-[#efefed]";
  const mainBgClass = darkMode ? "bg-gray-900" : "bg-[#efefed]";
  const secondaryBgClass = darkMode ? "bg-gray-800" : "bg-white";

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  return (
    <div
      className="min-w-full h-[280px] md:h-[400px] cursor-pointer relative"
      onClick={() => setFlipped(!flipped)}
      onMouseMove={(e) => {
        setTooltip(true);
        handleMouseMove(e);
      }}
      onMouseLeave={() => setTooltip(false)}
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        {/* Front Side */}
        <div
          className={`flip-card-front flex flex-col justify-between p-5 rounded-md border-2 text-gray-900 border-gray-400`}
        >
          <img
            src={exp.image}
            alt={exp.company}
            className={`w-fit ${
              exp.company == "Amicsoft" ? "h-7" : "h-8"
            }`}
          />
          <div>
            <h3 className={`${textClass} text-[24px] lg:text-[32px]`}>
              {exp.title}
            </h3>
            <p className={`${textClass} text-[16px] lg:text-[20px]`}>
              {exp.company}
            </p>
          </div>
          <div>
            <p className={`${textClass} text-[16px] lg:text-[20px]`}>
              {exp.duration}
            </p>
            <p className={`${textClass} text-[16px] lg:text-[20px]`}>
              {exp.type}
            </p>
          </div>
          <div className={`${textClass} text-[12px] lg:text-[16px]`}>
            {exp.summary}
          </div>
          <div className="flex w-full justify-end">
            <p
              className={`lg:hidden ${mainBgClass} ${textClass} rounded-full px-3`}
            >
              Tap to flip
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`flip-card-back flex flex-col justify-start p-3 rounded-md shadow-lg border-2 ${flipCardClass} ${borderClass} text-gray-800 overflow-y-auto`}
        >
          <div>
            <div className={`mt-2 -mb-2 font-bold ${textClass}`}>
              What I did
            </div>
            <ul
              className={`${textClass} list-disc pl-5 text-[12px] lg:text-[16px]`}
            >
              {exp.details.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className={`mt-2 font-bold ${textClass}`}>What I learned</div>
            <div className="flex md:flex-row w-full items-center gap-2 flex-wrap">
              {exp.tech.map((tech, idx) => (
                <div
                  key={idx}
                  className={`rounded-full ${secondaryBgClass} ${textClass} px-3 py-0.5 text-center text-[12px] lg:text-[16px]`}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {tooltip && (
        <div
          className={`hidden lg:block fixed z-50 pointer-events-none shadow-md rounded-md px-2 py-1 text-md ${mainBgClass} ${textClass}`}
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
          }}
        >
          Click to view details
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
