import { createTheme, responsiveFontSizes } from '@mui/material';

const lightTheme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#38bdf8',
            },
            secondary: {
                main: '#a78bfa',
            },
            background: {
                default: '#f0f3f8',
                paper: '#d8e0ef',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        color: 'white',
                    },
                    text: {
                        color: 'white',
                    },
                },
            },
        },
    })
);

const darkTheme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#38bdf8',
            },
            secondary: {
                main: '#a78bfa',
            },
            background: {
                default: '#2c2c2c',
                paper: '#424242',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        color: 'white',
                    },
                    text: {
                        color: 'white',
                    },
                },
            },
        },
    })
);

export { lightTheme, darkTheme };
