import { z } from "zod";

const messageContentValidation = z
  .string()
  .min(1, { message: "Message content cannot be empty" })
  .max(500, { message: "Message content cannot exceed 500 characters" });

const messageIdValidation = z.string().uuid({ message: "Invalid message ID format" });

export const AcceptMessageSchema = z.object({
  messageId: messageIdValidation,
  content: messageContentValidation,
});
