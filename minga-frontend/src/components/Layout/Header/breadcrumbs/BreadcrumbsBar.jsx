import React from "react";

import { Typography, Breadcrumbs, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function BreadcrumbsBar({ category, subcategory, slug }) {
  const breadcrumbs = [];

  if (category && !subcategory && !slug) {
    breadcrumbs.push(
      <Link underline="hover" key="1" color="inherit" to="/">
        Home
      </Link>,
      <Typography key="3" color="text.primary">
        {category
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      </Typography>
    );
  }
  if (category && subcategory && !slug) {
    breadcrumbs.push(
      <Link underline="hover" key="1" color="inherit" to="/">
        Home
      </Link>,
      <Link underline="hover" key="2" color="inherit" to={`/${category}`}>
        {category
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      </Link>,
      <Typography key="3" color="text.primary">
        {subcategory
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      </Typography>
    );
  }
  if (category && subcategory && slug) {
    breadcrumbs.push(
      <Link underline="hover" key="1" color="inherit" to="/">
        Home
      </Link>,
      <Link underline="hover" key="2" color="inherit" to={`/${category}`}>
        {category
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      </Link>,
      <Link
        underline="hover"
        key="3"
        color="inherit"
        to={`/${category}/${subcategory}`}
      >
        {subcategory
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      </Link>,
      <Typography key="4" color="text.primary">
        {slug
          .replace("-", " ")
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
