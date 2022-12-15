import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MultiSelect from "./MultiSelect";

function Filters() {
  return (
    <Box
      sx={{
        width: "300px",
        backgroundColor: "white",
        borderColor: "rgba(0, 0, 0, 0,1)",
        borderWidth: "1px",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "12px",
      }}
    >
      <MultiSelect />
      <Button disabled>Clear All</Button>
    </Box>
  );
}

export default Filters;
