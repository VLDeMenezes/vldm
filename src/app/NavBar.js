"use client";
import DarkmodeButton from "@/components/darkmodeButton";
import { navItems } from "@/helper/NavItems";
import LanguageSwitcher from "./i18n/i18n-Selector/switchLanguage";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [select, SetSelect] = useState("Home");
  const { t } = useTranslation();
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let selectedSection = select;
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        if (scrollPosition >= sectionTop - sectionHeight / 2) {
          selectedSection = section.id;
        }
      });

      SetSelect(selectedSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [select]);
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:max-h-[100vh] md:max-w-[10vw] min-h-[10vh] max-h-[10vh] bg-gray-400 dark:bg-slate-800 opacity-90 z-30">
      <div className="flex flex-row md:flex-col justify-around absolute w-full h-full">
        {navItems.map((item) => (
          <a
            href={item.path}
            key={item.name}
            className={`bg-gray-400 p-2 rounded-lg m-auto md:text-3xl text-iconLigth dark:text-iconDark navbar-item ${
              select === item.name
                ? "text-iconLigthSelect dark:text-iconDarkSelect text-2xl md:text-4xl relative bottom-[5vh] md:top-[2vh] scale-125 flex flex-col items-center navbar-item-selected "
                : ""
            }`}
            aria-label={item.name}
            onClick={() => SetSelect(item.name)}
          >
            {item.icon}
            <p
              className={` ${
                select === item.name ? "block" : "hidden"
              } text-sm italic text-center`}
            >
              {t("navBar." + item.name)}
            </p>
          </a>
        ))}
        <LanguageSwitcher />
        <DarkmodeButton />
      </div>
    </nav>
  );
};

export default NavBar;
