import React from "react";

function ColorPicker({ color }) {
  let classcolor = color.toLowerCase();
  return (
    <div
      className="rounded-full border w-12 h-12 lg:w-16 lg:h-16"
      style={{ backgroundColor: classcolor }}
    ></div>
  );
}

export default ColorPicker;
