// ExperienceCard.jsx
import { useState } from "react";

const ExperienceCard = ({ exp, darkMode }) => {
  const [flipped, setFlipped] = useState(false);
  const textClass = darkMode ? "text-gray-200" : "text-gray-800";
  const flipCardClass = darkMode ? "bg-gray-900" : "bg-[#efefed]";
  const borderClass = darkMode ? "border-gray-900" : "border-[#efefed]";

  return (
    <div
      className="min-w-full h-[250px] md:h-[400px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        {/* Front Side */}
        <div
          className={`flip-card-front flex flex-col justify-around p-6 rounded-md border-2 text-gray-900 border-gray-400`}
        >
          <img
            src={exp.image}
            alt={exp.company}
            className={`w-fit ${
              exp.company == "Amicsoft" ? "h-7" : "h-8"
            } mb-4`}
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
          <p className={`${textClass} mt-4 text-[12px] lg:text-[16px]`}>
            {exp.summary}
          </p>
        </div>

        {/* Back Side */}
        <div
          className={`flip-card-back flex flex-col justify-around p-6 rounded-md shadow-lg border-2 ${flipCardClass} ${borderClass} text-gray-800 overflow-y-auto`}
        >
          <img
            src={exp.image}
            alt={exp.company}
            className={`w-fit ${
              exp.company == "Amicsoft" ? "h-7" : "h-8"
            } mb-4`}
          />
          <h3 className={`${textClass} text-[20px] lg:text-[28px]`}>
            {exp.title}
          </h3>
          <ul
            className={`${textClass} list-disc pl-5 text-[12px] lg:text-[16px] space-y-1`}
          >
            {exp.details.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
