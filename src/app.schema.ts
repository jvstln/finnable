import { z } from "zod/v4";
import { RecursiveRecord } from "./app.model.js";

export const createAccountSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  surname: z.string().min(2, "Surname must be at least 2 characters long"),
  email: z.email("Invalid email"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long"),
  dateOfBirth: z.coerce.date().max(new Date()),
});

export const decryptionRequestSchema: z.ZodType<RecursiveRecord> = z.lazy(() =>
  z.record(
    z.string(),
    z.union(
      [z.string(), decryptionRequestSchema],
      "Property must be a string or an object"
    )
  )
);
