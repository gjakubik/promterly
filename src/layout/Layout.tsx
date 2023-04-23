import React from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from './Drawer';

const useStyles = makeStyles({
    mainContent: {
        marginLeft: 250,
    },
});

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <Drawer />
            <main className={classes.mainContent}>{children}</main>
        </>
    );
};

export default Layout;
