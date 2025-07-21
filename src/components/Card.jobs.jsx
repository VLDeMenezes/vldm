import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const JobCard = ({ job }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-SectionDark dark:bg-SectionLigth text-white dark:text-black rounded-md shadow-md p-6 text-center relative md:min-h-[300px] flex flex-col md:justify-center min-h-full">
      {job.img && (
        <div className="absolute flex justify-center w-20 h-20 top-1 mx-auto mb-4 z-0">
          <Image
            src={job.img}
            alt={`${job.name} Logo`}
            width={75}
            height={75}
            className="object-contain"
          />
        </div>
      )}
      <h3 className="text-2xl font-semibold mt-10 md:mt-5 mb-2 z-10">{job.name}</h3>
      <p className="text-slate-300 dark:text-gray-800 mb-2">{t(job.i18n)}</p>{" "}
    </div>
  );
};

export default JobCard;
