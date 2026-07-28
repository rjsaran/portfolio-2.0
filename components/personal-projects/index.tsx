import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import useIntersect from "../../utils/useIntersectionObserver";
import { personalProjectsData } from "../../utils/data/personal-projects";

export interface IPersonalProject {
  name: string;
  url: string;
  iconUrl: string;
  description: string;
  builtWith?: string[];
}

export default function PersonalProjects({
  setIsVisible,
}: {
  setIsVisible: () => void;
}) {
  const { entry, setNode } = useIntersect({
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
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
    <section
      id="Projects"
      ref={observeRef}
      className="relative m-auto mb-32 mt-20 flex max-w-[95%] flex-col justify-center gap-12 md:relative md:mt-0 md:flex-row md:gap-5"
    >
      <div className="absolute -top-12 left-1/2 w-[200px] -translate-x-1/2">
        <motion.h2 className="heading-gradient mx-auto text-center text-lg font-semibold text-white">
          Personal Projects
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="heading-gradient-underline h-[1px]"
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {personalProjectsData.map((project, i) => (
          <ProjectCard key={project.url} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: IPersonalProject;
  index: number;
}) {
  const [iconFailed, setIconFailed] = useState(!project.iconUrl);

  return (
    <motion.article
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 * index }}
      className="group w-full"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project relative flex h-full flex-col gap-4 rounded-[10px] border-[1px] border-gray-200 bg-dark-300 p-6 transition-all duration-300 ease-in hover:border-yellow/80 hover:shadow-lg md:min-h-[180px]"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div
              className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-dark-200/60"
              aria-hidden
            >
              {!iconFailed && project.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- mixed png/ico/svg favicons from each deployment
                <img
                  src={project.iconUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-contain p-1.5"
                  onError={() => setIconFailed(true)}
                />
              ) : (
                <span className="text-lg font-bold text-gray-400">
                  {project.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[18px] font-bold text-gray-300 transition-colors group-hover:text-yellow xl:text-[20px]">
                  {project.name}
                </h3>
                <span
                  className="shrink-0 rounded border border-gray-200 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-100 transition-colors group-hover:border-yellow/60 group-hover:text-yellow"
                  aria-hidden
                >
                  Live
                </span>
              </div>
              <p className="text-[14px] leading-relaxed tracking-tight text-gray-100 xl:text-[15px]">
                {project.description}
              </p>
              {project.builtWith && project.builtWith.length > 0 && (
                <p className="text-[12px] italic tracking-tight text-gray-100/70">
                  Built with {project.builtWith.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
        <span className="mt-auto text-[13px] font-medium text-green transition-colors group-hover:underline">
          Visit site →
        </span>
      </a>
    </motion.article>
  );
}
