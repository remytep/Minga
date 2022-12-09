import { Box, Breadcrumbs, Link } from '@mui/material';
import React from 'react';

export const Breadcrumbs = () => {
  return (
    <Box m={2}>
        <Breadcrumbs aria-label="breadcrumb" separator=">>">
            <Link underline='hover' href='#'>Home</Link>
            <Link underline='hover' href='#'>Home</Link>
            <Link underline='hover' href='#'>Home</Link>
        </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumbs