import { userSchema } from "../schemas/users.schema";

export const sessionSchema = userSchema.pick({
    email: true,
    password: true,
})
