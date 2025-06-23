import { z } from "zod";

export const dndNpcCardSchema = z.object({
  // TODO: Upgrade this schema
  title: z
    .string()
    .min(4, {
      message: "doit contenir au moins 4 caractères.",
    })
    .max(64, {
      message: "doit contenir au maximum 64 caractères.",
    }),
  species: z
    .string()
    .min(2, {
      message: "doit contenir au moins 2 caractères.",
    })
    .max(64, {
      message: "doit contenir au maximum 64 caractères.",
    }),
  size: z
    .string()
    .min(1, {
      message: "doit contenir au moins 1 caractère.",
    })
    .max(2, {
      message: "doit contenir au maximum 2 caractères.",
    }),
  alignment: z
    .string()
    .min(1, {
      message: "doit contenir au moins 1 caractère.",
    })
    .max(2, {
      message: "doit contenir au maximum 2 caractères.",
    }),
  description: z.string().min(16, {
    message: "doit contenir au moins 16 caractères.",
  }),
  armorClass: z.number().min(0, {
    message: "doit être positif.",
  }),
  health: z.string().min(4, {
    message: "doit contenir au moins 4 caractères.",
  }),
  speed: z.string().min(2, {
    message: "doit contenir au moins 2 caractères.",
  }),
  strength: z.number().min(0, {
    message: "doit être positif.",
  }),
  dexterity: z.number().min(0, {
    message: "doit être positif.",
  }),
  constitution: z.number().min(0, {
    message: "doit être positif.",
  }),
  intelligence: z.number().min(0, {
    message: "doit être positif.",
  }),
  wisdom: z.number().min(0, {
    message: "doit être positif.",
  }),
  charisma: z.number().min(0, {
    message: "doit être positif.",
  }),
  skills: z.string().min(4, {
    message: "doit contenir au moins 4 caractères.",
  }),
  senses: z.string().min(4, {
    message: "doit contenir au moins 4 caractères.",
  }),
  languages: z.string().min(4, {
    message: "doit contenir au moins 4 caractères.",
  }),
  dangerLevel: z.number().min(0, {
    message: "doit être positif.",
  }),
  behaviour: z.string().min(4, {
    message: "doit contenir au moins 4 caractères.",
  }),
  actions: z.string().min(4, {
    message: "doit contenir au moins 4 caractères.",
  }),
});
