import { z } from "zod";

export const currentUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  roles: z.array(z.string()),
  readScenarios: z.array(z.string()),
});
export type CurrentUser = z.infer<typeof currentUserSchema>;

const mailSchema = z
  .string()
  .min(4, {
    message: "L'adresse mail doit contenir au moins 2 caractères.",
  })
  .max(64, {
    message: "L'adresse mail doit contenir au maximum 64 caractères.",
  });

const passwordSchema = z
  .string()
  .min(4, {
    message: "Le mot de passe doit contenir au moins 2 caractères.",
  })
  .max(64, {
    message: "Le mot de passe doit contenir au maximum 64 caractères.",
  });

const nameSchema = z
  .string()
  .min(4, {
    message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
  })
  .max(64, {
    message: "Le nom d'utilisateur doit contenir au maximum 64 caractères.",
  });

export const loginSchema = z.object({
  mail: mailSchema,
  password: passwordSchema,
});
export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: nameSchema,
  mail: mailSchema,
  password: passwordSchema,
});
export type SignupInput = z.infer<typeof signupSchema>;
