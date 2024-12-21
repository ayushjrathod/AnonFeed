import { z } from "zod";

const emailValidation = z.string().email({ message: "Invalid email address" });
const identifierValidation = z.string().min(3, { message: "Email or username must be at least 3 characters long" });
const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password must be at most 100 characters long" });

export const signInSchema = z.object({
  identifier: identifierValidation.or(emailValidation),
  password: passwordValidation,
});
