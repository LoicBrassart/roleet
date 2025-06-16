import { z } from "zod";

export const currentUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  roles: z.array(z.string()),
  readScenarios: z.array(z.string()),
});
export type CurrentUser = z.infer<typeof currentUserSchema>;

export const loginSchema = z.object({
  mail: z
    .string()
    .min(4, {
      message: "L'adresse mail doit contenir au moins 2 caractères.",
    })
    .max(64, {
      message: "L'adresse mail doit contenir au maximum 64 caractères.",
    }),
  password: z
    .string()
    .min(4, {
      message: "Le mot de passe doit contenir au moins 2 caractères.",
    })
    .max(64, {
      message: "Le mot de passe doit contenir au maximum 64 caractères.",
    }),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
    })
    .max(64, {
      message: "Le nom d'utilisateur doit contenir au maximum 64 caractères.",
    }),
  password: z
    .string()
    .min(4, {
      message: "Le mot de passe doit contenir au moins 2 caractères.",
    })
    .max(64, {
      message: "Le mot de passe doit contenir au maximum 64 caractères.",
    }),
  mail: z
    .string()
    .min(4, {
      message: "L'email doit contenir au moins 2 caractères.",
    })
    .max(64, {
      message: "L'email doit contenir au maximum 64 caractères.",
    }),
});
