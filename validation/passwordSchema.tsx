import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(5, "password must containt at least 5 character")
  .max(50, "Maximum character");
