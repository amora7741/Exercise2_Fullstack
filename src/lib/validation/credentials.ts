import { z } from 'zod';

export const credentialsSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export type Credentials = z.infer<typeof credentialsSchema>;
