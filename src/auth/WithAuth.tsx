import { useUser } from '@clerk/nextjs';
import React, { useState, useCallback } from 'react';
import { api } from '~/utils/api';
import type { MyUser } from '~/types/MyUser';

const defaultRefetchUser: () => void = () => {
    // This is a default no-op refetchUser function.
};

export const PrivateUserContext = React.createContext<{
    userData: MyUser | null;
    refetchUser: () => void;
}>({ userData: null, refetchUser: defaultRefetchUser });

const useUserData = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState<MyUser | null>(null);

    const createUserMutation = api.user.create.useMutation();
    const userQuery = api.user.get.useQuery(
        { id: user?.id ?? '' },
        {
            enabled: !!user?.id,
            retry: false,
            onSuccess: data => {
                if (data && user) {
                    setUserData({
                        ...data,
                        clerkProfilePicture: user.profileImageUrl,
                    });
                } else if (!data && user && !createUserMutation.isLoading) {
                    createUserMutation.mutate(
                        { clerkUserId: user.id },
                        {
                            onSuccess: newUser => {
                                setUserData({
                                    ...newUser,
                                    clerkProfilePicture: user.profileImageUrl,
                                });
                            },
                        }
                    );
                }
            },
        }
    );

    const refetchUser = useCallback(() => {
        if (user?.id) {
            void userQuery.refetch();
        }
    }, [user, userQuery]);

    return { userData, refetchUser };
};

interface WithAuthProps {
    children: React.ReactNode;
}

export const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
    const { userData, refetchUser } = useUserData();

    return (
        <PrivateUserContext.Provider value={{ userData, refetchUser }}>
            {children}
        </PrivateUserContext.Provider>
    );
};
