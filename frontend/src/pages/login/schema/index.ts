import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(3),
});
