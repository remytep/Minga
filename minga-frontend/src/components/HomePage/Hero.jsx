import React from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div>
      <Slider className="absolute" />
      {/*       <div className="flex flex-col justify-center">
   
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
      </div> */}
    </div>
  );
}

export default Hero;
