import React from 'react';
import { Layout, ToggleThemeButton, AppBar, defaultTheme, useResourceDefinitions, Menu } from 'react-admin';
import { Link } from '@mui/material';
import ViewListSharpIcon from '@mui/icons-material/ViewListSharp';

const darkTheme = {
    palette: { mode: 'dark' },
};

const MyMenu = () => {
    const resources = useResourceDefinitions();
    return (
        <Menu>
            {Object.keys(resources).map(name => (
                <Menu.ResourceItem key={name} name={name} />
            ))}
            <Menu.Item to="/admin/coupon" primaryText="Coupon" leftIcon={<ViewListSharpIcon />} />
        </Menu>
    );
};

const MyAppBar = (props) => (
    <AppBar {...props}>
        <Link color="white" href="/" underline="none" variant="h5">
            Minga
        </Link>
        <ToggleThemeButton
            lightTheme={defaultTheme}
            darkTheme={darkTheme}
        />

    </AppBar >
);

export const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppBar} menu={MyMenu} />
)