import React, { useEffect, useRef } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import useIntersect from "../../utils/useIntersectionObserver";
import { skillsData } from "../../utils/data/skills";

export default function Skills({ setIsVisible }: { setIsVisible: () => void }) {
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
  }, [entry?.isIntersecting]);

  return (
    <motion.section
      id="Skills"
      ref={observeRef}
      className="relative mt-16 cursor-default bg-dark-100/20 text-[13px] font-medium leading-[150%] text-gray-100 shadow-lg md:relative md:m-auto md:mb-32 md:mt-0 md:w-max md:rounded-[30px] md:text-[16px]"
    >
      <div className="absolute -top-12 left-1/2 w-[70px] -translate-x-1/2">
        <motion.h2 className="heading-gradient text-lg font-semibold text-white">
          Skills
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="heading-gradient-underline h-[1px]"
        />
      </div>
      <br />

      <div className="grid w-full grid-cols-2 md:grid-cols-6">
        {skillsData.map((skill, id) => (
          <div
            className="group relative m-3 flex h-fit w-36 min-w-fit cursor-pointer flex-col items-center justify-center rounded-lg transition-all duration-500 hover:scale-[1.15] sm:m-5"
            key={id}
          >
            <div className="h-full w-full rounded-lg border">
              <div className="flex flex-col items-center justify-center gap-3 p-2">
                <div className="h-8 sm:h-10">
                  <Image
                    src={`/svg/skills/${skill.toLowerCase().replace(/\s/g, "")}.svg`}
                    alt={skill}
                    width={40}
                    height={40}
                    className="h-full w-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-white sm:text-lg">{skill}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
