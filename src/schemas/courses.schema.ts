import { z } from 'zod';

export const courseSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export const courseUpdateSchema = courseSchema.partial()
