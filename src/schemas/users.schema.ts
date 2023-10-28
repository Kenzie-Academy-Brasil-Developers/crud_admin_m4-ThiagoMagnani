import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean().default(true)
});

export const userLogin = userSchema.omit({ id: true, admin: true })
export const userCreateSchema = userSchema.omit({ id: true })
