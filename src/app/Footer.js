import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row justify-around dark:bg-SectionDark bg-NavBar  bg-gradient-to-l from-NavBar  to-gray-400 dark:to-slate-800 ">
      <p className="text-center text-Detail font-bold text-lg lg:text-xl w-1/3 animate-backgroundMove mx-auto bg-gradient-to-r from-Detail via-orange-950 to-iconLigthSelect bg-clip-text text-transparent tracking-widest">
        VLDM
      </p>
      <p className="text-Darkground px-2">
        This site as an{" "}
        <strong className="text-green-700 text-lg animate-pulse bg-green-300 rounded-full px-1">
          A
        </strong>{" "}
        qualification from{" "}
        <a
          href="https://securityheaders.com/?q=https%3A%2F%2Fvldm-portafolio.vercel.app%2F&followRedirects=on"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          Security Headers
        </a>
      </p>
    </div>
  );
};

export default Footer;
