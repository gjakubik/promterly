import type { User } from '@prisma/client';

export type MyUser = User & {
    // Add whatever clerk user data we want here to our db schema type
    clerkProfilePicture?: string;
};
