import React, { useEffect, useRef, useState } from "react";
import ContactForm from "./form";
import MobileSocials from "./mobileContact";
import SuccessMessage from "./success";

import { motion } from "framer-motion";
import useIntersect from "../../utils/useIntersectionObserver";

export default function ContactMe({
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

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [messageReceived, setMessageReceived] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInput),
      });
      setLoading(false);

      // clear form
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
      setMessageReceived(userInput.name);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section
      ref={observeRef}
      id="Contact Me"
      className="relative m-auto my-20 mb-32 flex h-max w-full max-w-[85vw] flex-col items-center justify-center rounded-[15px] bg-dark-100/20 p-8 pb-64 md:my-32 md:max-w-[70vw] md:flex-row md:pb-8"
    >
      <div className="absolute -top-16 left-1/2 w-[185px] -translate-x-1/2 md:-top-12">
        <motion.h2 className="heading-gradient text-lg font-semibold text-white">
          Send me a message
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="heading-gradient-underline h-[1px]"
        />
      </div>
      {messageReceived ? (
        <SuccessMessage
          senderName={messageReceived}
          toggleNewForm={() => setMessageReceived("")}
        />
      ) : (
        <ContactForm
          receiveName={(val) => setUserInput({ ...userInput, name: val })}
          receiveEmail={(val) => setUserInput({ ...userInput, email: val })}
          receiveMessage={(val) => setUserInput({ ...userInput, message: val })}
          submitMessage={() => {
            sendMessage();
          }}
          loading={loading}
        />
      )}
      <MobileSocials />
    </section>
  );
}
