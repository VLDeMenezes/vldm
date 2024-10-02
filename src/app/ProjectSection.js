import { project } from "@/helper/project";
import Image from "next/image";
import React from "react";

const ProjectSection = () => {
  return (
    <section
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[100vh] mt-[10vh]"
      id="Projects"
    >
      <h2 className="text-2xl lg:text-4xl mx-auto my-2 dark:text-Detail  drop-shadow-xl">
        {" "}
        My latest Projects
      </h2>
      <ul className="mx-auto my-10 flex flex-wrap gap-10 justify-center">
        {project.map((item) => (
          <a
            className="flex flex-col justify-around shadow-lg text-justify p-4 md:size-[25vw] bg-SectionDark dark:bg-SectionLigth hover:scale-105 duration-150 rounded-lg   cursor-pointer "
            href={item.path}
            target="_blank"
            aria-label={`Proyecto ${item.name}`}
            key={item.name}
          >
            <h3 className="text-2xl lg:text-3xl text-center font-semibold text-SectionLigth ">
              {item.name}
            </h3>
            <Image
              src={item.image}
              alt={`Imagen del Proyecto ${item.name}`}
              width={200}
              height={200}
              layout="responsive"
              className="mx-auto my-2 lg:size-[10vw]"
            />
            <p className="text-wrap lg:text-lg">{item.description}</p>
            <small
              className={`text-end lg:text-lg font-semibold ${
                item.status === "Deployed" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.status}
            </small>
          </a>
        ))}
      </ul>
    </section>
  );
};

export default ProjectSection;
