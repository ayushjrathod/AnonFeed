import { z } from "zod";

const emailValidation = z.string().email({ message: "Invalid email address" });

const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password must be at most 100 characters long" });

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
