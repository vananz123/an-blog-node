import { z } from 'zod';

export const commentCreateSchema = z.object({
    blogId: z.string(),
    userId: z.string(),
    content: z.string(),
    parentId: z.string({required_error:'dfdsfd'}).nullable()
});
