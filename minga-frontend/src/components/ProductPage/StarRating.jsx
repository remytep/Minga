import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

function StarRating() {
  const [, setRating1] = useState(0);

  const handleRating1 = (rate) => setRating1(rate);

  const tooltipArray = ["Terrible", "Bad", "Average", "Great", "Awesome"];

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
  ];

  return (
    <div className="w-full flex items-center justify-start relative">
        <Rating
          className=""
          onClick={handleRating1}
          size={30}
          transition
          showTooltip
          tooltipArray={tooltipArray}
          fillColorArray={fillColorArray}
        />
    </div>
  );
}

export default StarRating;
