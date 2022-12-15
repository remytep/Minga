import React from "react";
import { ToggleButton } from "@mui/material";

function DimensionPicker({ dimensions }) {
  return (
    <div className="w-28 h-14 rounded-lg p-3 m-4 flex items-center justify-center">
      <p className="font-Inder text-center">{dimensions}</p>
    </div>
  );
}

export default DimensionPicker;
