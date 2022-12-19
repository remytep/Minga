import React from "react";

function ColorPicker({ color }) {
  let classcolor = color.toLowerCase();
  return (
    <div
      className="rounded-full border w-16 h-16"
      style={{ backgroundColor: classcolor }}
    ></div>
  );
}

export default ColorPicker;
