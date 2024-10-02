import { contact } from "@/helper/contact";
import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

const ContactSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[100vh] md:mt-[13vh]"
      id="Contact"
    >
      <h2 className="text-2xl lg:text-4xl mx-auto my-2 dark:text-Detail  drop-shadow-xl">
        Contact
      </h2>
      <div className="m-auto w-2/3 text-justify italic text-lg lg:text-xl text-SectionDark dark:text-SectionLigth font-semibold">
        <ReactTyped
          strings={[
            "Feel free to write to me to learn more about me and interact. You can contact me through the following means:",
          ]}
          typeSpeed={60}
          startDelay={800}
          showCursor={false}
        />
      </div>

      <article className="flex flex-wrap gap-2 justify-around m-auto">
        {contact.map((item) => (
          <a
            target="_blank"
            href={item.path}
            key={item.name}
            aria-label={item.name}
            className="m-auto size-[30vw] md:size-[10vw] flex  bg-SectionDark dark:bg-SectionLigth hover:scale-105 rounded-lg"
          >
            <p
              className="text-5xl lg:text-7xl m-auto hover:text-SectionLigth hover:dark:text-SectionDark"
              alt={`Icono de ${item.name}`}
            >
              {item.icon}
            </p>
          </a>
        ))}
      </article>
    </motion.section>
  );
};

export default ContactSection;
