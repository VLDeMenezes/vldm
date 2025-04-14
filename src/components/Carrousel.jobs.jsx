import React, { useState, useEffect, useRef } from "react";
import { Jobs } from "../helper/Jobs"; // Asegúrate de que la ruta sea correcta
import JobCard from "./Card.jobs";
import CarouselDots from "./Carrousel.dots";
import { useTranslation } from "react-i18next";

const JobsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const {t} = useTranslation();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Jobs.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 8000); // Cambia cada 5 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        ref={carouselRef}
      >
        {Jobs.map((job, index) => (
          <div key={index} className="w-full flex-shrink-0 p-4">
            <JobCard job={job} />
          </div>
        ))}
      </div>

      <CarouselDots
        total={Jobs.length}
        currentIndex={currentIndex}
        goToSlide={goToSlide}
      />
    </div>
  );
};

export default JobsCarousel;
