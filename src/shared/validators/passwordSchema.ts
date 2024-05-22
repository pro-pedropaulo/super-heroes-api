import { type ZodRawShape, z } from 'zod';

export const passwordSchema = <T extends ZodRawShape>(schema: T) =>
  z
    .object({
      password: z
        .string()
        .min(8, 'Password must be at least eight characters long.')
        .regex(
          /(?=.*?[A-Z])/,
          'Password must contain at least one uppercase letter.',
        )
        .regex(
          /(?=.*?[a-z])/,
          'Password must contain at least one lowercase letter.',
        )
        .regex(/(?=.*?[0-9])/, 'Password must contain at least one number.')
        .regex(
          /(?=.*?[\W_])/,
          'Password must contain at least one special character.',
        ),
      confirmPassword: z.string({
        required_error: "The 'confirmPassword' field is required.",
      }),
      ...schema,
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    });
