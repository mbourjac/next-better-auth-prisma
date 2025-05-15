import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' }),
  password: z.string().trim().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional(),
});

export type SignIn = z.infer<typeof signInSchema>;
