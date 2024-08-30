import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'You must include a task title.' })
    .max(50, { message: 'Your title must be less than 50 characters.' }),
  description: z.string().max(100, {
    message: 'Your description must be less than 100 characters.',
  }),
  priority: z.enum(['Low', 'Medium', 'High'], {
    errorMap: () => ({ message: 'Priority must be Low, Medium, or High.' }),
  }),
});

export type Task = z.infer<typeof taskSchema>;
