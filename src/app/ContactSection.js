import { contact } from "@/helper/contact";
import React from "react";

const ContactSection = () => {
  return (
    <section
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[50vh] mt-[10vh] mb-[20vh]"
      id="Contact"
    >
      <h2 className="text-2xl mx-auto my-2 dark:text-Detail  drop-shadow-xl">
        Contact
      </h2>
      <p className="m-auto italic text-SectionDark dark:text-SectionLigth font-semibold">
        Podras contactarme a traves de cualquiera de los siguientes medios:
      </p>
      <article className="flex flex-wrap gap-2 justify-around m-auto">
        {contact.map((item) => (
          <a
            target="_blank"
            href={item.path}
            key={item.name}
            aria-label={item.name}
            className="m-auto size-[30vw] md:size-[10vw] flex  bg-SectionDark dark:bg-SectionLigth hover:scale-105 rounded-lg"
          >
            <p className="text-5xl m-auto" alt={`Icono de ${item.name}`}>
              {item.icon}
            </p>
          </a>
        ))}
      </article>
    </section>
  );
};

export default ContactSection;
