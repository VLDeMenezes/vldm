import Image from "next/image";
import JobSection from "./JobSection";
import ContactSection from "./ContactSection";
import ProjectSection from "./ProjectSection";

export default function Home() {
  return (
    <main className="m-auto w-[90%] md:w-[75%]">
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[100vh] md:mt-[13vh]"
        id="Home"
      >
        <p className="ml-[5vw] mt-[5vh] text-xl">Hola! me presento:</p>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col justify-center p-2 m-2 rounded-full md:size-[185px] bg-SectionDark overflow-hidden">
            <Image
              src={"/profile-Photoroom.png"}
              alt="Foto de Victor De Menezes"
              width={200}
              height={200}
              layout="responsive"
            />
          </div>
          <article className="flex flex-col justify-center">
            <h1 className="text-3xl italic text-SectionDark font-semibold">
              VICTOR LEANDRO DE MENEZES
            </h1>
          </article>
        </div>
        <p className="text-center md:text-start md:ml-[6vw]">
          Full Stack Developer | Abogado
        </p>
        <p className="text-wrap m-2 text-center text-SectionDark dark:text-SectionLigth font-semibold">
          Este nombre es el que ayudará a tu empresa a lograr sus objetivos!
        </p>
        <p className="text-justify mx-[10vw]">
          Como abogado y desarrollador Full Stack, mi trayectoria está marcada
          por una profunda curiosidad y una constante adaptación al cambio. Mi
          pasión por la tecnología no solo se refleja en mi capacidad para
          automatizar procesos, sino en mi habilidad para integrar diversas
          experiencias en soluciones creativas que mejoran la calidad de vida.
          Estoy comprometido con estar a la vanguardia de la innovación,
          aplicando conocimientos multidisciplinarios para transformar desafíos
          en oportunidades
        </p>
      </section>

      <JobSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}
