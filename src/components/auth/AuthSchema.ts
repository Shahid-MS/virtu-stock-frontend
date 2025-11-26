import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 3 characters")
    .max(20, "First name is too long"),

  lastName: z.string().min(0).max(20, "Last name is too long"),

  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Enter a valid email address",
  }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password is too long" }),
});

export const signInSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Enter a valid email address",
  }),

  password: z
    .string()
    .min(4, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password is too long" }),
});

export const otpSchema = z.object({
  otp: z.string().regex(/^[0-9]{6}$/, "OTP must be 6 digits"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type signInSchemaType = z.infer<typeof signInSchema>;
export type otpSchemaType = z.infer<typeof otpSchema>;
