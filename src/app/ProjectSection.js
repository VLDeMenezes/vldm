import { project } from "@/helper/project";
import Image from "next/image";
import React from "react";

const ProjectSection = () => {
  return (
    <section
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[100vh] mt-[10vh]"
      id="Projects"
    >
      <h2 className="text-2xl m-auto"> MIS PROYECTOS</h2>
      <ul className="m-auto flex flex-wrap gap-5">
        {project.map((item) => (
          <a
            className="flex flex-col justify-center shadow-lg text-justify p-4 md:size-[25vw] bg-SectionDark dark:bg-SectionLigth hover:scale-105 duration-150 rounded-lg  cursor-default relative"
            href={item.path}
            target="_blank"
            aria-label={`Proyecto ${item.name}`}
            key={item.name}
          >
            <h3 className="text-2xl text-center font-semibold text-SectionLigth">
              {item.name}
            </h3>
            <Image
              src={item.image}
              alt={`Imagen del Proyecto ${item.name}`}
              width={200}
              height={200}
              className="mx-auto my-2"
            />
            <p className="text-wrap">{item.description}</p>
          </a>
        ))}
      </ul>
    </section>
  );
};

export default ProjectSection;
