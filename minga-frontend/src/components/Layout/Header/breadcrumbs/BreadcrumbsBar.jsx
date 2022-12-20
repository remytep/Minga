import React from "react";

import { Typography, Breadcrumbs, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function BreadcrumbsBar({ category, slug }) {
  const breadcrumbs = [];

  //console.log(category, slug);
  if (category && !slug) {
    breadcrumbs.push(
      <Link underline="hover" key="1" color="inherit" to="/">
        Home
      </Link>,
      <Typography key="3" color="text.primary">
        {category
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )}
      </Typography>
    );
  }
  if (category && slug) {
    breadcrumbs.push(
      <Link underline="hover" key="1" color="inherit" to="/">
        Home
      </Link>,
      <Link underline="hover" key="2" color="inherit" to={`/${category}`}>
        {category
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )}
      </Link>,
      <Typography key="3" color="text.primary">
        {slug
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )}
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export default BreadcrumbsBar;
