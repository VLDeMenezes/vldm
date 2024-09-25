"use client";
import React, { useEffect } from "react";
import { IoMoonOutline, IoMoon } from "react-icons/io5";
const DarkmodeButton = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) setDarkMode(true);
  }, []);
  const handleChange = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkmode", "true");
      setDarkMode(true);
    }
  };
  return (
    <div className="bg-gray-400 p-2 rounded-lg m-auto text-3xl text-iconLigth dark:text-iconDark duration-150">
      {darkMode ? (
        <IoMoon onClick={handleChange} className="text-3xl cursor-pointer" />
      ) : (
        <IoMoonOutline
          onClick={handleChange}
          className="text-3xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default DarkmodeButton;
