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
          <p>
            Hola! me presento:
            <h1 className="text-3xl">VICTOR DE MENEZES</h1>
          </p>

          <p>
            Este nombre es el que ayudará a tu empresa a lograr sus objetivos
          </p>
        </article>
      </section>
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col justify-around my-2 rounded-lg min-h-[80vh]"
        id="Jobs"
      >
        <h2 className="text-2xl m-auto"> Mis trabajos</h2>
        <p className="m-auto italic">
          Actualmente me encuentro trabajando en mi propio Estudio Juridico
        </p>
      </section>
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col justify-around my-2 rounded-lg min-h-[80vh]"
        id="Projects"
      >
        <h2 className="text-2xl m-auto"> Mis Proyectos</h2>
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
        <h2 className="text-2xl m-auto">Contacto</h2>
      </section>
    </main>
  );
}
