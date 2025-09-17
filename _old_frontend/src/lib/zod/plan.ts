import { z } from "zod";

export const planSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "doit contenir au moins 4 caractères.",
    })
    .max(64, {
      message: "doit contenir au maximum 64 caractères.",
    }),
  description: z
    .string()
    .min(32, {
      message: "doit contenir au moins 32 caractères.",
    })
    .max(512, {
      message: "doit contenir au maximum 512 caractères.",
    }),
  pictureUrl: z.string().max(256, {
    message: "doit contenir au maximum 256 caractères.",
  }),
});
