import React from 'react'
import { Link } from 'react-router-dom';
import HeroDesk from '../../assets/homePages/hero/hero.jpg'

function Hero() {
  return (
    <section className='bg-[#C9C5BA] h-[800px] py-24'>
        <div className='container mx-auto flex justify-around h-full'>
        {/* text */}
        <div className='flex flex-col justify-center'>
          {/* pretitle */}
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-red-500 mr-3'></div>
            Breaking News
          </div>
          {/* title */}
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            WE HAVE THE BEST<br />
            <span className='font-semibold'>STANDING DESK</span>
          </h1>
          <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary'>
            Start shopping
          </Link>
        </div>

        {/* image */}
        <div className='hidden lg:block'>
          <img src={HeroDesk} className='h-[550px]' alt='' />
        </div>

      </div>
    </section>
  )
}

export default Hero