import Image from "next/image";
import React from "react";

import Twitter from "../../assets/twitter.svg";
import LinkedIn from "../../assets/linkedin.svg";
import Github from "../../assets/github.svg";
import { personalData } from "../../utils/data/personal-data";

export default function BottomBar() {
  return (
    <footer className="fixed inset-x-[5vw] bottom-[5vh] hidden h-[55px] items-center justify-between rounded-b-[5px] border-[1px] border-t-[1px] border-gray-200 bg-dark-300 px-8 pl-2 text-gray-100 md:flex md:pl-8">
      <div className="flex h-full items-center">
        <span className="pr-2">Connect with me</span>
        <a
          href={personalData.twitter}
          target="_blank"
          rel="noreferrer"
          className="flex h-full items-center justify-center border-l-[1px] border-l-gray-200 px-4"
        >
          <Image
            src={Twitter}
            height="30"
            width="30"
            alt="Twitter"
            className="cursor-pointer"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </a>
        <a
          href={personalData.linkedIn}
          target="_blank"
          rel="noreferrer"
          className="flex h-full items-center justify-center border-x-[1px] border-x-gray-200 px-4"
        >
          <Image
            src={LinkedIn}
            height="30"
            width="30"
            alt="LinkedIn"
            className="cursor-pointer"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </a>
      </div>
      <div className="flex h-full items-center">
        <span className="pr-2">Github</span>
        <a
          href={personalData.github}
          target="_blank"
          rel="noreferrer"
          className="flex h-full cursor-pointer items-center gap-2 border-x-[1px] border-x-gray-200 px-4"
        >
          <Image
            src={Github}
            height="30"
            width="30"
            alt="Github"
            className="cursor-pointer"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </a>
      </div>
    </footer>
  );
}
