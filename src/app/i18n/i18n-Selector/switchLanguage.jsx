import { useEffect, useState } from "react";
import { changeLanguage } from "../config";
import { IoLanguage } from "react-icons/io5";

function LanguageSwitcher() {
  const [language, setLanguage] = useState("es");
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      changeLanguage(savedLanguage);
    } else {
      changeLanguage(language);
    }
  }, [language, setLanguage]);

  const handleLanguage = () => {
    if (language === "en") {
      setLanguage("es");
      localStorage.setItem("language", "es");
    } else {
      setLanguage("en");
      localStorage.setItem("language", "en");
    }
  };
  return (
    <div className="bg-gray-400 p-2 rounded-lg m-auto text-3xl text-iconLigth dark:text-iconDark duration-300 relative">
      <button onClick={handleLanguage} className="relative group">
        <IoLanguage />
        <span className="absolute bottom-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-sm rounded px-2 py-1">
          {language === "en" ? "Español" : "English"}
        </span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;
