import { createTRPCRouter } from '~/server/api/trpc';
import { userRouter } from '~/server/api/routers/user';
import { templateRouter } from '~/server/api/routers/template';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    user: userRouter,
    template: templateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
