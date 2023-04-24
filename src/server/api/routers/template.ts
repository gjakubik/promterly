// templateRouter.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const templateRouter = createTRPCRouter({
    get: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.template.findMany({
                where: {
                    userId: input.userId,
                },
            });
        }),

    create: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            // Create a new template with the given userId
            return ctx.prisma.template.create({
                data: {
                    user: {
                        connect: {
                            id: input.userId,
                        },
                    },
                    title: '',
                    text: '',
                    textOrder: 'AFTER_TEMPLATE', // Set default values for the template
                    visibility: 'PRIVATE',
                },
            });
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
                prompt: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            // Update the template with the given ID
            return ctx.prisma.template.update({
                where: {
                    id: input.id,
                },
                data: {
                    title: input.title,
                    text: input.prompt,
                },
            });
        }),

    upsert: publicProcedure
        .input(
            z.object({
                id: z.string().optional(),
                userId: z.string(),
                title: z.string().optional(),
                prompt: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (input.id) {
                // Update the existing template
                return await ctx.prisma.template.update({
                    where: { id: input.id },
                    data: {
                        title: input.title,
                        text: input.prompt,
                    },
                });
            } else {
                // Create a new template
                const newTemplate = await ctx.prisma.template.create({
                    data: {
                        user: {
                            connect: {
                                id: input.userId,
                            },
                        },
                        title: input.title || '',
                        text: input.prompt || '',
                        textOrder: 'AFTER_TEMPLATE',
                        visibility: 'PRIVATE',
                    },
                });
                return newTemplate;
            }
        }),
});
