import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { PrivateUserContext, useThemePreference } from '~/auth';
import { api } from '~/utils/api';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Logo from '~/core/Logo';
import { Template } from '@prisma/client';

const useStyles = makeStyles({
    drawer: {
        width: 250,
    },
    myLogo: {
        margin: 20,
    },
    createTemplate: {
        width: '90%',
        marginLeft: '5%',
        marginTop: 20,
    },
    drawerPaper: {
        width: 250,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
    },
});

const CustomDrawer = () => {
    const classes = useStyles();
    const router = useRouter();
    const user = useUser();
    const { userData } = useContext(PrivateUserContext);
    const { themePreference, setThemePreference } = useThemePreference();
    const [templates, setTemplates] = useState<Template[] | undefined>([]);

    const templatesQuery = api.template.get.useQuery(
        { userId: userData?.id || '' },
        {
            enabled: !!userData?.id,
            onSuccess: data => {
                setTemplates(data);
            },
        }
    );

    const updateThemePreferenceMutation =
        api.user.updateThemePreference.useMutation();

    useEffect(() => {
        if (userData?.themePreference) {
            setThemePreference(userData.themePreference);
        }
    }, [userData]);

    const handleCreateTemplateClick = () => {
        if (user.isSignedIn) {
            void router.push(`/${userData?.id || 'temp'}/create-template`);
        }
    };

    const [openSection1, setOpenSection1] = useState(false);
    const [openSection2, setOpenSection2] = useState(false);

    const handleSection1Click = () => {
        setOpenSection1(!openSection1);
    };

    const handleSection2Click = () => {
        setOpenSection2(!openSection2);
    };

    const handleThemeSwitch = () => {
        const newThemePreference =
            themePreference === 'LIGHT' ? 'DARK' : 'LIGHT';
        try {
            console.log('USER DATA: ', userData);
            console.log('New Theme Preference: ', newThemePreference);
            userData &&
                updateThemePreferenceMutation.mutate({
                    id: userData.id,
                    themePreference: newThemePreference,
                });
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
            <div>
                <Logo className={classes.myLogo} />
                <Divider />
                <Button
                    variant="contained"
                    className={classes.createTemplate}
                    onClick={handleCreateTemplateClick}
                >
                    Create Template
                </Button>
                <List>
                    {/* Section 1 */}
                    <ListItem button onClick={handleSection1Click}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favorite Templates" />
                        {openSection1 ? <ExpandMore /> : <ExpandLess />}
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
                        <ListItemText primary="My Templates" />
                        {openSection2 ? <ExpandMore /> : <ExpandLess />}
                    </ListItem>
                    <Collapse in={openSection2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {templates?.map(template => (
                                <ListItem button key={template.id}>
                                    <ListItemText primary={template.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </div>
            <List>
                <ListItem>
                    <Button onClick={handleThemeSwitch}>
                        {themePreference === 'LIGHT'
                            ? 'Switch to Dark'
                            : 'Switch to Light'}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button>Account</Button>
                </ListItem>
                <ListItem>
                    <Button>Help</Button>
                </ListItem>
                <ListItem>
                    {user.isSignedIn ? <SignOutButton /> : <SignInButton />}
                </ListItem>
            </List>
        </Drawer>
    );
};

export default CustomDrawer;
