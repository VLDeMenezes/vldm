import { project } from "@/helper/project";
import Image from "next/image";
import { useState } from "react";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  return (
    <section
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[100vh] mt-[10vh]"
      id="Projects"
    >
      <h2 className="text-2xl lg:text-4xl mx-auto my-2 dark:text-Detail  drop-shadow-xl">
        {" "}
        My latest Projects
      </h2>

      <ul className="mx-auto my-10 flex flex-wrap gap-4 justify-center">
        {project.map((item) => (
          <div
            className="group flex flex-col justify-between shadow-lg text-justify p-4 w-full sm:w-[90%] md:w-[45%] lg:w-[30%] bg-SectionDark dark:bg-SectionLight hover:scale-105 duration-300 ease-in-out transform rounded-lg cursor-pointer"
            onClick={() => handleOpenModal(item)}
            aria-label={`Proyecto ${item.name}`}
            key={item.name}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold text-SectionLight">
              {item.name}
            </h3>

            <Image
              src={item.image}
              alt={`Imagen del Proyecto ${item.name}`}
              width={200}
              height={200}
              layout="responsive"
              className="mx-auto my-2"
            />

            <p className="text-sm md:text-base lg:text-lg">
              {item.description}
            </p>

            <small
              className={`text-end text-sm md:text-base lg:text-lg font-semibold ${
                item.status === "Deployed"
                  ? "text-green-600"
                  : "text-red-600 cursor-default"
              }`}
            >
              {item.status}
            </small>

            <div className="hidden group-hover:flex group-hover:flex-row gap-2 items-center text-3xl justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out ">
              {item.tecs.map((tec) => (
                <p key={tec.name} className="hover:scale-105 hover:text-Detail">
                  {tec.icon}
                </p>
              ))}
            </div>
          </div>
        ))}
      </ul>
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-evenly items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-slate-100 text-black dark:bg-slate-800 rounded-lg p-4 w-[80%] h-[80%] md:w-1/2 md:h-5/6 my-5 text-center relative border-b-8  border-SectionDark shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Evitar cerrar el modal al hacer click dentro de él
          >
            <span className="absolute top-0 left-0 bg-Detail p-6 rounded-br-full">
              {""}
            </span>
            <button
              className="absolute top-0 right-0 p-4 text-xl text-red-500 hover:scale-110 hover:text-red-600"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <IoCloseCircle />
            </button>
            <h3 className="text-3xl font-semibold mb-4">
              {selectedProject.name}
            </h3>
            <Image
              src={selectedProject.image}
              alt={`Imagen del Proyecto ${selectedProject.name}`}
              width={400}
              height={400}
              className="mx-auto"
            />
            <p className=" my-4">{selectedProject.description}</p>
            <div className="flex flex-row justify-center gap-4 ">
              <a
                className="text-lg font-semibold hover:scale-105 hover:text-Detail"
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Github
              </a>
              |
              {selectedProject.status === "Deployed" ? (
                <a
                  className="block text-lg font-semibold text-green-600 hover:scale-105"
                  href={selectedProject.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View: {selectedProject.status}
                </a>
              ) : (
                <small
                  className={`block text-lg font-semibold text-red-600 cursor-default"
              }`}
                >
                  {selectedProject.status}
                </small>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-6 text-2xl ">
              {selectedProject.tecs.map((tec) => (
                <div
                  key={tec.name}
                  className="flex flex-col gap-2 items-center text-center hover:text-Detail cursor-default"
                >
                  <p className="text-2xl">{tec.icon}</p>
                  <small className="hidden md:block">{tec.name}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
