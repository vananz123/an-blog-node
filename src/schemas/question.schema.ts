import { z } from 'zod';

export const questionCreateSchema = z.object({
    userId: z.string(),
    content: z.string(),
});
