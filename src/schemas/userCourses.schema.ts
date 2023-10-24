import { z } from 'zod';

export const userCourseSchema = z.object({
    active: z.boolean(),
    userId: z.number(),
    courseId: z.number(),
});
