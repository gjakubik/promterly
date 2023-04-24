import { AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@mui/material/styles';
import React, { useContext, useMemo, useState } from 'react';
import { lightTheme, darkTheme } from '../theme';
import { PrivateUserContext, WithAuth, CustomThemeProvider } from '~/auth';
import { api } from '~/utils/api';

interface ThemeSwitcherProps {
    children: React.ReactNode;
}

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ClerkProvider {...pageProps}>
            <WithAuth>
                <CustomThemeProvider>
                    <Component {...pageProps} />
                </CustomThemeProvider>
            </WithAuth>
        </ClerkProvider>
    );
};

export default api.withTRPC(MyApp);
