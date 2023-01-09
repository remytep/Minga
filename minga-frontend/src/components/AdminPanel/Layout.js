import React from 'react';
import { Layout, ToggleThemeButton, AppBar, defaultTheme } from 'react-admin';
import { Link } from '@mui/material';

const darkTheme = {
    palette: { mode: 'dark' },
};

const MyAppBar = (props) => (
    <AppBar {...props}>
        <Link href="/" underline="none" variant="h5">
            Minga
        </Link>
        <ToggleThemeButton
            lightTheme={defaultTheme}
            darkTheme={darkTheme}
        />
    </AppBar>
);

export const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppBar} />
)