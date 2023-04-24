import React from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from './Drawer';

const useStyles = makeStyles({
    mainContent: {
        marginLeft: 250,
    },
    content: {
        marginTop: 64,
        padding: 20,
        '@media (min-width: 1024px)': {
            width: '50%',
            marginLeft: '25%',
            marginRight: '25%',
        },
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
            <main className={classes.mainContent}>
                <div className={classes.content}>{children}</div>
            </main>
        </>
    );
};

export default Layout;
