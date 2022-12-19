import React from "react";
import { ToggleButton } from "@mui/material";

function DimensionPicker({ dimensions }) {
  return (
    <div className="w-28 h-14 rounded-lg p-3 flex items-center justify-center">
      <p className="text-center text-xl">{dimensions}</p>
    </div>
  );
}

export default DimensionPicker;
