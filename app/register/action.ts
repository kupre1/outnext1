"use server";

import { z } from "zod";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";

type RegisterUserInput = {
  email: string;
  password: String;
  passwordConfrim: string;
};
export const register = async ({
  email,
  password,
  passwordConfrim,
}: RegisterUserInput) => {
  const newUserSchema = z
    .object({
      email: z.string().email(),
      // password: z.string().min(5).max(50),
      // passwordConfrim: z.string(),
    })
    .and(passwordMatchSchema);

  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    passwordConfrim,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An Error occured",
    };
  }
};
