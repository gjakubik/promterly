import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';

interface ThemeContextData {
    themePreference: string;
    setThemePreference: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const useThemePreference = (): ThemeContextData => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
            'useThemePreference must be used within a CustomThemeProvider'
        );
    }
    return context;
};

interface CustomThemeProviderProps {
    children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
    children,
}) => {
    const [themePreference, setThemePreference] = useState('DARK');
    const theme = useMemo(() => {
        return themePreference === 'DARK' ? darkTheme : lightTheme;
    }, [themePreference]);

    return (
        <ThemeContext.Provider value={{ themePreference, setThemePreference }}>
            <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
        </ThemeContext.Provider>
    );
};
