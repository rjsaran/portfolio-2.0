import React, { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import useIntersect from "../../utils/useIntersectionObserver";
import { scrollIntoId } from "../common/navbar";
import { personalData } from "../../utils/data/personal-data";

export default function AboutMe({
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
  }, [entry?.isIntersecting]);

  return (
    <motion.section
      id="About Me"
      ref={observeRef}
      className="relative mt-8 cursor-default bg-dark-100/20 p-4 text-[13px] font-medium leading-[150%] text-gray-100 shadow-lg transition-all duration-300 ease-in hover:bg-dark-100/40 md:relative md:m-auto md:mb-32 md:mt-0 md:w-full md:max-w-screen-md md:rounded-[30px] md:text-[16px]"
    >
      <div className="absolute -top-12 left-1/2 w-[95px] -translate-x-1/2">
        <motion.h2 className="heading-gradient text-lg font-semibold text-white">
          About Me
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="heading-gradient-underline h-[1px]"
        />
      </div>
      <br />

      <div className="flex flex-col gap-6">
        {personalData.description.map((description, i) => (
          <p key={i} className="!leading-loose">
            {description}
          </p>
        ))}
      </div>
      <br />
      <p>
        If you seek transformative solutions, consulting, or mentorship,{" "}
        <br className="hidden md:block" />
        let&apos;s{" "}
        <button
          className="underline"
          onClick={() => scrollIntoId("Contact Me")}
        >
          connect!
        </button>
      </p>
      <br />
    </motion.section>
  );
}
