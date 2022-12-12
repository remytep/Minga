import React, { useState } from 'react';
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from 'react-router-dom';
import desk3 from "../../../assets/homePages/desks_sample/desk_example3.jpg";
import desk4 from "../../../assets/homePages/desks_sample/desk_example4.jpg";
import desk5 from "../../../assets/homePages/desks_sample/desk_example5.jpg";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
    };
    const nextSlide = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
    }

  return (
    <div className='w-full h-[500px] relative overflow-hidden mb-6'>
        <div className='w-[300vw] h-full flex flex-row transform translate-x-[-130vw] ease-in duration-300' style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
            <img src={desk3} alt="" className='w-[100vw] h-full object-cover'/>
            <img src={desk4} alt="" className='w-[100vw] h-full object-cover'/>
            <img src={desk5} alt="" className='w-[100vw] h-full object-cover'/>
        </div>
        <div className='flex w-[100px] gap-10 absolute left-0 right-0 m-auto bottom-[100px]'>
            <div className='cursor-pointer items-center' onClick={prevSlide}>
                <GrPrevious className='text-4xl justify-center text-white'/>
            </div>
            <div className='cursor-pointer items-center' onClick={nextSlide}>()
                <GrNext className='text-4xl text-white'/>
            </div>
        </div>
    </div>
  )
}

export default Slider