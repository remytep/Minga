import React from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div>
      <Slider className="absolute" />
      <div className="absolute top-44 ml-20 flex flex-col justify-center">
        {/* pretitle */}
        <div className="font-semibold flex items-center uppercase">
          <div className="w-10 h-[2px] bg-red-500 mr-3"></div>
          Breaking News
        </div>
        {/* title */}
        <h1 className="text-[70px] leading-[1.1] font-light mb-4">
          WE HAVE THE BEST
          <br />
          <span className="font-semibold">STANDING DESK</span>
        </h1>
        <Link
          to={"/"}
          className="self-start uppercase font-semibold border-b-2 border-red-500"
        >
          Start shopping
        </Link>
      </div>
    </div>
  );
}

export default Hero;
