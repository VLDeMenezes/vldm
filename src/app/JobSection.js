import { Jobs } from "@/helper/Jobs";
import React from "react";

const JobSection = () => {
  return (
    <section
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[100vh] mt-[10vh]"
      id="Jobs"
    >
      <h2 className="text-2xl lg:text-4xl mx-auto my-2 dark:text-Detail  drop-shadow-xl">
        My Jobs
      </h2>

      <article className="mx-auto my-10 flex flex-wrap gap-10 justify-center">
        {Jobs.map((job) => (
          <div
            key={job.name}
            className="flex flex-col justify-center shadow-lg text-justify p-4 md:size-[25vw] bg-SectionDark dark:bg-SectionLigth md:hover:scale-105 duration-150 rounded-lg  cursor-default relative"
          >
            <p
              className="md:text-5xl absolute top-0 md:top-[-6vh] z-10 md:rigth-[49%] lg:top-[-4vh] bg-SectionDark dark:bg-SectionLigth p-3 rounded-full"
              alt="Icono de trabajo"
            >
              {job.icon}
            </p>

            <strong className="text-center lg:text-xl">{job.name}</strong>
            <p className="text-wrap overflow-hidden lg:text-xl">
              {job.description}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default JobSection;
