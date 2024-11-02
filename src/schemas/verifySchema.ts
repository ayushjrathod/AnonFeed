import { z } from "zod";

const tokenValidation = z.string().length(6, "Verification code must be 6 digits");

const userIdValidation = z.string().uuid({ message: "Invalid user ID format" });

export const verifySchema = z.object({
  userId: userIdValidation,
  code: tokenValidation,
});
