import React from "react";

function ColorPicker({ color }) {
  let classcolor = color.toLowerCase();
  return (
    <div
      className="rounded-full border w-10 h-10 m-4"
      style={{ backgroundColor: classcolor }}
    ></div>
  );
}

export default ColorPicker;
