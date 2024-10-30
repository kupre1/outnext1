import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const passwordMatchSchema = z
  .object({
    password: passwordSchema,
    passwordConfrim: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfrim) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfrim"],
        message: "Password do not match",
      });
    }
  });
