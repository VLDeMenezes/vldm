import { Jobs } from "../helper/Jobs";
import React from "react";
import { useTranslation } from "react-i18next";
import CarrouselJobs from "../components/Carrousel.jobs";
const JobSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="bg-SectionLigth dark:bg-SectionDark flex flex-col my-2 p-3 justify-center rounded-lg md:min-h-[100vh] mt-[10vh]"
      id="Jobs"
    >
      <h2 className="text-2xl lg:text-4xl mx-auto my-2 dark:text-Detail  drop-shadow-xl">
        {t("navBar.Jobs")}
      </h2>
      <CarrouselJobs />
     
    </section>
  );
};

export default JobSection;
