import { z } from "zod";

export const agentsInsertSchema = z.object({
    name: z.string().min(2, { message: "Name is required"}),
    instructions: z.string().min(5, { message: "Instructions are required"})
})
