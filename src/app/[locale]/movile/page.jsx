import PhoneScreen from "@/components/PhoneScreen";
import Link from "next/link";
import React from "react";
import { IoDesktopOutline } from "react-icons/io5";

const Page = () => {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-SectionDark overflow-hidden z-50">
      <Link
        href={"/"}
        className="fixed top-[50vh] left-[25vw] bg-SectionLigth p-2 rounded-lg justify-center group duration-300 hover:scale-110 shadow-lg"
      >
        <IoDesktopOutline className="text-5xl group-hover:text-4xl mx-auto duration-300" />
        <p className="hidden group-hover:block duration-300">Volver</p>
      </Link>
      <PhoneScreen />
    </div>
  );
};

export default Page;
