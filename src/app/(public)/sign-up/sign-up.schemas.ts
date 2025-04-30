import { z } from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'First name is required' }),
    lastName: z.string().trim().min(1, { message: 'Last name is required' }),
    email: z
      .string()
      .trim()
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUp = z.infer<typeof signUpSchema>;
