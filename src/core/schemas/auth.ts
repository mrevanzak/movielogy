import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = signUpSchema.omit({ username: true });
export type LoginSchema = z.infer<typeof loginSchema>;
