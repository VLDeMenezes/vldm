import React from "react";

const CarouselDots = ({ total, currentIndex, goToSlide }) => {
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full ${
            currentIndex === index ? "bg-blue-950" : "bg-gray-300"
          } cursor-pointer focus:outline-none`}
          onClick={() => goToSlide(index)}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
