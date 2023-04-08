import React, { useContext, useState, useEffect } from 'react';
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { PrivateUserContext } from '~/auth';
import { api } from '~/utils/api';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Logo from '~/core/Logo';
import styles from './Drawer.module.css';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 250,
    },
    drawerPaper: {
        width: 250,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
    },
}));

const CustomDrawer = () => {
    const classes = useStyles();
    const user = useUser();
    const { userData, refetchUser } = useContext(PrivateUserContext);

    const updateThemePreferenceMutation =
        api.user.updateThemePreference.useMutation();

    const [themePreference, setThemePreference] = useState(
        userData?.themePreference ?? 'LIGHT'
    );

    useEffect(() => {
        if (userData?.themePreference) {
            setThemePreference(userData.themePreference);
        }
    }, [userData]);

    const [openSection1, setOpenSection1] = useState(false);
    const [openSection2, setOpenSection2] = useState(false);

    const handleSection1Click = () => {
        setOpenSection1(!openSection1);
    };

    const handleSection2Click = () => {
        setOpenSection2(!openSection2);
    };

    const handleThemeSwitch = async () => {
        const newThemePreference =
            themePreference === 'LIGHT' ? 'DARK' : 'LIGHT';
        try {
            console.log('USER DATA: ', userData);
            console.log('New Theme Preference: ', newThemePreference);
            userData &&
                updateThemePreferenceMutation.mutate(
                    {
                        id: userData.id,
                        themePreference: newThemePreference,
                    },
                    {
                        onSuccess: refetchUser,
                    }
                );
            setThemePreference(newThemePreference);
        } catch (error) {
            console.error('Failed to update user theme preference', error);
        }
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Logo className={styles.logo} />
            <List>
                {/* Section 1 */}
                <ListItem button onClick={handleSection1Click}>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Section 1" />
                    {openSection1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSection1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* Nested Items for Section 1 */}
                    </List>
                </Collapse>

                {/* Section 2 */}
                <ListItem button onClick={handleSection2Click}>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Section 2" />
                    {openSection2 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSection2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* Nested Items for Section 2 */}
                    </List>
                </Collapse>
            </List>
            <div>
                <Button onClick={handleThemeSwitch}>
                    {themePreference === 'LIGHT'
                        ? 'Switch to Dark'
                        : 'Switch to Light'}
                </Button>
                <Button>Account</Button>
                <Button>Help</Button>
                {user.isSignedIn ? <SignOutButton /> : <SignInButton />}
            </div>
        </Drawer>
    );
};

export default CustomDrawer;
