/* eslint-disable @next/next/no-img-element */
import { useTranslation } from "react-i18next";
import { Jobs } from "../helper/Jobs";
import { useState } from "react";
const CarrouselJobs = () => {
  const [selected, setSelected] = useState(2);
  const { t } = useTranslation();
  return (
    <section className="w-full h-[650px] bg-Darkground flex flex-row items-center justify-between">
      {Jobs.map((job, index) => (
        <article
          onClick={() => setSelected(index)}
          className={`flex flex-col items-center h-full transition-all duration-1000 ${
            selected === index ? "w-full bg-iconDark" : " cursor-pointer"
          }`}
          key={index}
        >
          <div
            className={`flex items-center  w-full  ${
              selected === index
                ? "flex-row gap-5 justify-center mt-[10px]"
                : "flex-col min-h-full justify-start max-w-[100%]"
            }`}
            onClick={() => setSelected(index)}
          >
            <img
              className={`${
                selected === index
                  ? "w-14 h-14 bg-Detail rounded-full object-cover object-left"
                  : "max-w-30"
              }`}
              src={selected === index ? job.avatar : job.img}
              alt="Job Imagen"
            />
            <h3
              className={`font-semibold ${
                selected === index
                  ? ""
                  : "-rotate-90 text-lg text-center h-full w-full flex justify-center items-center"
              }`}
            >
              {job.name}
            </h3>
          </div>
          <p
            className={`${
              selected === index ? "text-center mt-40 text-lg" : "hidden"
            }`}
          >
            {t(`Jobs.${job.i18n}`)}
          </p>
        </article>
      ))}
    </section>
  );
};
export default CarrouselJobs;
