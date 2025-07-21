"use client";

import JobSection from "./JobSection";
import ContactSection from "./ContactSection";
import ProjectSection from "./ProjectSection";
import Link from "next/link";
import { IoPhonePortraitOutline } from "react-icons/io5";
import "./i18n/config";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto w-[90%] md:w-[75%]">
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[70vh] md:min-h-[100vh] md:mt-[13vh] relative"
        id="Home"
      >
        <div className=" hidden md:flex flex-col gap-4 items-center absolute top-5 right-5 group cursor-pointer">
          <Link
            href="/movile"
            alt="probar app en vista de movil"
            className="text-4xl bg-SectionDark dark:bg-SectionLigth rounded-full p-2"
          >
            <IoPhonePortraitOutline />
          </Link>

          <p className="absolute top-[10vh] w-[10vw] text-center left-1/2 transform -translate-x-1/2 hidden md:group-hover:block text-sm bg-gray-800 text-white p-1 rounded-md duration-200">
            Experimenta la versión móvil
          </p>
        </div>

        <p className="ml-[5vw] mt-[5vh] text-xl lg:text-2xl dark:text-zinc-50">
          {t("Home.knowMe")}
        </p>
        <div className="size-[90%] md:size-[80%] mt-2 rounded-lg overflow-hidden mx-auto">
          <lottie-player
            src="/profileAndName.json"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
        <div className="flex flex-col items-start md:text-start md:ml-[8vw] lg:ml-[12vw] gap-2">
          <p className="text-center  dark:text-zinc-50">{t("Home.job")}</p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
        <Link
          className="w-fit p-2 bg-SectionDark dark:bg-SectionLigth rounded-lg hover:bg-slate-700 hover:scale-105 transition-all duration-150 ease-in-out"
          href={"/cv.pdf"}
          target="_blank"
        >
          Download CV
        </Link>
        <p className="text-wrap m-2 text-center text-SectionDark dark:text-SectionLigth font-semibold italic animate-pulse lg:text-xl drop-shadow-xl transition-transform duration-500 hover:scale-110">
          {t("Home.myGoal")}
        </p>

          </div>
        </div>

        <div className="bg-SectionDark dark:bg-Detail md:mx-[10vw] p-2 lg:p-4 lg:mt-8 rounded-lg">
          {t("Home.description")}
        </div>
      </section>

      <JobSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}
