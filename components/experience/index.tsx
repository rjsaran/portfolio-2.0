import React, { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import useIntersect from "../../utils/useIntersectionObserver";
import { experienceData } from "../../utils/data/experience";

export interface IExperience {
  company: string;
  title: string;
  duration: string;
  type: string;
  location: string;
  description: string[];
  technologies: string[];
}

export default function Experience({
  setIsVisible,
}: {
  setIsVisible: () => void;
}) {
  // Call the useIntersect hook and receive the setNode and entry variables
  const { entry, setNode } = useIntersect({
    root: null, // The element used as the viewport for checking visibility, null means the browser viewport
    rootMargin: "0px", // Margin around the root element (in pixels)
    threshold: 0.5, // A threshold value between 0 and 1, indicating the percentage of the target element that should be visible before the callback is invoked
  });

  const observeRef = useRef(null);

  useEffect(() => {
    setNode(observeRef.current);
  }, []);

  useEffect(() => {
    if (!!entry?.isIntersecting) {
      setIsVisible();
    }
  }, [entry]);

  return (
    <section
      id="Experience"
      ref={observeRef}
      className="relative m-auto mb-32 mt-20 flex max-w-[95%] flex-col justify-center gap-12 md:relative md:mt-0 md:flex-row md:gap-5"
    >
      <div className="absolute -top-12 left-1/2 w-[110px] -translate-x-1/2">
        <motion.h2 className="heading-gradient mx-auto text-lg font-semibold text-white">
          Experience
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="heading-gradient-underline h-[1px]"
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-y-8">
        {experienceData.map((experience, i) => (
          <OneExperience key={i} experience={experience} index={i} />
        ))}
      </div>
    </section>
  );
}

function OneExperience({
  experience,
  index,
}: {
  experience: IExperience;
  index: number;
}) {
  return (
    <motion.div
      initial={{ y: 50 }}
      animate={{
        y: 0,
      }}
      viewport={{ amount: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: "easeIn", delay: 0.1 * index }}
      className="group w-full"
      id={`exp-${experience.title.toLowerCase().replace(" ", "-")}`}
    >
      <div className="project relative flex flex-col justify-between gap-8 rounded-[10px] border-[1px] border-gray-200 bg-dark-300 p-6 transition-all duration-300 ease-in lg:flex-row lg:gap-0">
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-[20px] font-bold text-gray-300 xl:text-[20px]">
              {experience.company} • {experience.title}
            </h3>

            <p className="text-[16px] font-medium tracking-tight text-gray-100 xl:text-[16px]">
              {experience.location}
            </p>

            <p className="font-small text-[14px] tracking-tight text-gray-100 xl:text-[14px]">
              {experience.duration}
            </p>
          </div>

          <div className="flex w-full flex-col text-gray-100">
            <div className="flex flex-col gap-2">
              {experience.description.map((description, i) => (
                <p
                  key={i}
                  className="bullet font-small pl-4 text-[12px] tracking-tight xl:text-[14px]"
                >
                  {description}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-6">
            <div className="flex gap-3">
              {experience.technologies.map((tech, i) => (
                <OneTechnology key={i} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OneTechnology({ tech }: { tech: string }) {
  return <span className="text-[13px] text-white xl:text-[10px]">{tech}</span>;
}
