import React, { useState } from "react";

import desk3 from "../../assets/homePages/desks_sample/desk_example3.jpg";
import desk4 from "../../assets/homePages/desks_sample/desk_example4.jpg";
import desk5 from "../../assets/homePages/desks_sample/desk_example5.jpg";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="w-full h-[500px] relative overflow-hidden mb-6">
      <div
        className="w-[300vw] h-full flex flex-row transform translate-x-[-130vw] ease-in duration-300"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={desk3} alt="" className="w-[100vw] h-full object-cover" />
        <img src={desk4} alt="" className="w-[100vw] h-full object-cover" />
        <img src={desk5} alt="" className="w-[100vw] h-full object-cover" />
      </div>
      <div className="flex justify-between w-full gap-10 absolute left-0 right-0 top-1/2 -translate-y-1/2">
        <div className="cursor-pointer items-center" onClick={prevSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="cursor-pointer items-center" onClick={nextSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Slider;
