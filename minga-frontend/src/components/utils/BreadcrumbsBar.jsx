import React from "react";
import {
  ToggleButtonGroup,
  Typography,
  Breadcrumbs,
  Stack,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function BreadcrumbsBar({ category, slug }) {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/">
      Home
    </Link>,
  ];
  if (category && !slug) {
    breadcrumbs.push(
      <Typography key="3" color="text.primary">
        {category}
      </Typography>
    );
  }
  if (category && slug) {
    breadcrumbs.push(
      <Link underline="hover" key="2" color="inherit" to={`/${category}`}>
        {category}
      </Link>,
      <Typography key="3" color="text.primary">
        {slug}
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
