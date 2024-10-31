"use client";
import Image from "next/image";
import JobSection from "./JobSection";
import ContactSection from "./ContactSection";
import ProjectSection from "./ProjectSection";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import PhoneScreen from "@/components/PhoneScreen";
import Link from "next/link";
import { IoPhonePortraitOutline } from "react-icons/io5";

export default function Home() {
  return (
    <main className="mx-auto w-[90%] md:w-[75%]">
      <section
        className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg min-h-[70vh] md:min-h-[100vh] md:mt-[13vh] relative"
        id="Home"
      >
        {/* SVG */}
        <div className=" hidden md:flex flex-col gap-4 items-center absolute top-5 right-5 group cursor-pointer">
          <Link
            href="/movile"
            alt="probar app en vista de movil"
            className="text-4xl bg-SectionDark dark:bg-SectionLigth rounded-full p-2"
          >
            <IoPhonePortraitOutline />
          </Link>

          {/* Tooltip (Texto flotante) */}
          <p className="absolute top-[10vh] w-[10vw] text-center left-1/2 transform -translate-x-1/2 hidden md:group-hover:block text-sm bg-gray-800 text-white p-1 rounded-md duration-200">
            Experimenta la versión móvil
          </p>
        </div>

        <p className="ml-[5vw] mt-[5vh] text-xl lg:text-2xl dark:text-zinc-50">
          Hey, let`s get to know me:
        </p>
        <div className="size-[90%] md:size-[80%] mt-2 rounded-lg overflow-hidden mx-auto">
          <lottie-player
            src="/profileAndName.json"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
        <p className="text-center md:text-start md:ml-[8vw] lg:ml-[12vw] dark:text-zinc-50">
          Full Stack Developer | Lawyer
        </p>
        <p className="text-wrap m-2 text-center text-SectionDark dark:text-SectionLigth font-semibold italic animate-pulse lg:text-xl drop-shadow-xl transition-transform duration-500 hover:scale-110">
          This name will help you achieve your company`s goals.
        </p>

        <div className="bg-SectionDark dark:bg-Detail md:mx-[10vw] p-2 lg:p-4 lg:mt-8 rounded-lg">
          As Full Stack developer and a lawyer, my career is marked by a deep
          curiosity and a constant adaptation to change.My passion for
          technology is reflected in my ability to automate processes. I
          integrate diverse experiences into creative solutions that improve the
          quality of life. I am committed to being at the forefront of
          innovation.
        </div>
      </section>

      <JobSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}
