import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
    // Define a new query that accepts the user id parameter
    get: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            // Find a user by their clerkUserId
            return ctx.prisma.user.findFirst({
                where: {
                    clerkUserId: input.id,
                },
            });
        }),
    create: publicProcedure
        .input(
            z.object({
                clerkUserId: z.string(),
                themePreference: z.string().optional(),
            })
        )
        .mutation(({ ctx, input }) => {
            // Create a new user using the provided input data
            return ctx.prisma.user.create({
                data: {
                    clerkUserId: input.clerkUserId,
                    themePreference: input.themePreference || 'LIGHT', // Set the default value for themePreference if not provided
                },
            });
        }),

    // Define a mutation to update the user's theme preference
    updateThemePreference: publicProcedure
        .input(
            z.object({
                id: z.string(),
                themePreference: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            // Update the user's theme preference
            return ctx.prisma.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    themePreference: input.themePreference,
                },
            });
        }),
});
