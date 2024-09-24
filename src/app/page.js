import { contact } from "@/helper/contact";
import { project } from "@/helper/project";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-row justify-around my-2 rounded-lg min-h-[80vh]"
        id="Home"
      >
        <Image
          src={"/profile.jpg"}
          alt="Foto de Victor De Menezes"
          width={200}
          height={200}
          className="rounded-full p-2 my-auto"
        />
        <article className="flex flex-col gap-2 justify-center">
          <p>Hola! me presento:</p>
          <h1 className="text-3xl">VICTOR DE MENEZES</h1>

          <p>
            Este nombre es el que ayudará a tu empresa a lograr sus objetivos
          </p>
        </article>
      </section>
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col justify-around my-2 rounded-lg min-h-[80vh]"
        id="Jobs"
      >
        <h2 className="text-2xl m-auto"> MIS TRABAJOS</h2>
        <p className="m-auto italic">
          Actualmente me encuentro trabajando en mi propio Estudio Juridico
        </p>
      </section>
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col justify-around my-2 rounded-lg min-h-[80vh]"
        id="Projects"
      >
        <h2 className="text-2xl m-auto"> MIS PROYECTOS</h2>
        <ul className="m-auto flex flex-wrap gap-5">
          {project.map((item) => (
            <a
              className="flex flex-col p-2 shadow-lg text-center size-[20vw] bg-SectionDark dark:bg-SectionLigth"
              href={item.path}
              target="_blank"
              aria-label={`Proyecto ${item.name}`}
              key={item.name}
            >
              <h3 className="text-2xl">{item.name}</h3>
              <Image
                src={item.image}
                alt="Imagen del proyecto"
                width={200}
                height={200}
                className="m-auto"
              />
              <p className="text-wrap">{item.description}</p>
            </a>
          ))}
        </ul>
      </section>
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col justify-around my-2 rounded-lg min-h-[80vh]"
        id="Contact"
      >
        <h2 className="text-2xl m-auto">CONTACTO</h2>
        <p className="m-auto">
          Podras contactarme a traves de cualquiera de los siguientes medios:
        </p>
        <article className="flex flex-wrap gap-2 justify-around m-auto">
          {contact.map((item) => (
            <a
              target="_blank"
              href={item.path}
              key={item.name}
              aria-label={item.name}
              className="m-auto size-[10vw] flex  bg-SectionDark dark:bg-SectionLigth hover:scale-105 rounded-lg"
            >
              <p className="text-5xl m-auto">{item.icon}</p>
            </a>
          ))}
        </article>
      </section>
    </main>
  );
}
