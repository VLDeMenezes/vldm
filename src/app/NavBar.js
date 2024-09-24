"use client";
import { navItems } from "@/helper/NavItems";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {
  const [select, SetSelect] = useState("Jobs");
  return (
    <nav className="fixed bottom-0 left-0 right-0 size-w-full min-h-[10vh] max-h-[10vh] bg-NavBar ">
      <div className="flex flex-row justify-around absolute w-full h-full">
        {navItems.map((item) => (
          <a
            href={item.path}
            key={item.name}
            className={`bg-Detail p-2 rounded-lg m-auto text-3xl text-iconLigth dark:text-iconDark duration-150 ${
              select === item.name
                ? "text-iconLigthSelect dark:text-iconDarkSelect text-4xl relative bottom-[5vh] scale-125"
                : ""
            }`}
            aria-label="{item.name}"
            onClick={() => SetSelect(item.name)}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
