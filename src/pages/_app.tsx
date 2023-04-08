import { AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@mui/material/styles';
import React, { useContext, useMemo } from 'react';
import { lightTheme, darkTheme } from '../theme';
import { PrivateUserContext, WithAuth } from '~/auth';
import { api } from '~/utils/api';

const ThemeSwitcher = ({ children }) => {
    const { userData } = useContext(PrivateUserContext);

    const themePreference = userData?.themePreference ?? 'DARK';
    const theme = useMemo(() => {
        return themePreference === 'DARK' ? darkTheme : lightTheme;
    }, [themePreference, userData]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ClerkProvider {...pageProps}>
            <WithAuth>
                <ThemeSwitcher>
                    <Component {...pageProps} />
                </ThemeSwitcher>
            </WithAuth>
        </ClerkProvider>
    );
};

export default api.withTRPC(MyApp);
