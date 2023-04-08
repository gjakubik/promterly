import React from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from './Drawer';

const useStyles = makeStyles(theme => ({
    mainContent: {
        marginLeft: 250,
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <Drawer />
            <main className={classes.mainContent}>{children}</main>
        </>
    );
};

export default Layout;
