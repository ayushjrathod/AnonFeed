import { z } from "zod";

const tokenValidation = z.string().min(1, { message: "Token cannot be empty" });

const userIdValidation = z.string().uuid({ message: "Invalid user ID format" });

export const verifySchema = z.object({
  userId: userIdValidation,
  token: tokenValidation,
});
