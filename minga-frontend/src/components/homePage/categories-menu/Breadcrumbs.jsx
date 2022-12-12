import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import AndroidIcon from "@mui/icons-material/Android";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import { Link } from "react-router-dom";

function BreadcrumbsHome() {
  return (
    <div className="w-65 h-75 flex flex-row gap-2">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
      </Breadcrumbs>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          <AndroidIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Color
        </Link>
      </Breadcrumbs>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link underline="hover" color="inherit" href="/">
          <AutoAwesomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Black
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default BreadcrumbsHome;
