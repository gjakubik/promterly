import type { User } from '@prisma/client';

export type MyUser = User & {
    clerkProfilePicture?: string;
};
