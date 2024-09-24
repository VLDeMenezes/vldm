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
        className="bg-SectionLigth dark:bg-SectionDark flex flex-row justify-around my-2 rounded-lg min-h-[80vh]"
        id="Jobs"
      >
        <h2 className="text-2xl m-auto"> Mis trabajos</h2>
      </section>
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-row justify-around my-2 rounded-lg min-h-[80vh]"
        id="Projects"
      >
        <h2 className="text-2xl m-auto"> Mis Proyectos</h2>
      </section>
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-row justify-around my-2 rounded-lg min-h-[80vh]"
        id="Contact"
      >
        <h2 className="text-2xl m-auto">Contacto</h2>
      </section>
    </main>
  );
}
