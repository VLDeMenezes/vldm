import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const JobCard = ({ job }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white/20 text-black rounded-md shadow-md p-6 text-center relative min-h-[450px] md:min-h-[300px] flex flex-col justify-center">
      {job.img && (
        <div className="absolute top-0 w-20 h-20 mx-auto mb-4">
          <Image
            src={job.img}
            alt={`${job.name} Logo`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mt-10 mb-2">{job.name}</h3>
      <p className="text-gray-600 mb-2">{t(job.i18n)}</p>{" "}
    </div>
  );
};

export default JobCard;
