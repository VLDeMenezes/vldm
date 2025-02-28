import { contact } from "../helper/contact";
import React from "react";
import { ReactTyped } from "react-typed";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[70vh] md:min-h-[100vh] md:mt-[13vh]"
      id="Contact"
    >
      <h2 className="text-2xl lg:text-4xl mx-auto my-2 dark:text-Detail  drop-shadow-xl">
        Contact
      </h2>
      <div className="m-auto w-2/3 text-justify italic text-lg lg:text-xl text-SectionDark dark:text-SectionLigth font-semibold">
        <ReactTyped
          strings={[`${t("Contact")}`]}
          typeSpeed={120}
          startDelay={200}
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
            className="m-auto size-[30vw] md:size-[10vw] flex  bg-SectionDark dark:bg-SectionLigth md:hover:scale-105 rounded-lg relative group"
          >
            <span className="absolute top-36 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-sm rounded px-2 py-1">
              {item.name}
            </span>
            <p
              className="text-5xl lg:text-7xl m-auto hover:text-SectionLigth hover:dark:text-SectionDark"
              alt={`Icono de ${item.name}`}
            >
              {item.icon}
            </p>
          </a>
        ))}
      </article>
    </section>
  );
};

export default ContactSection;
