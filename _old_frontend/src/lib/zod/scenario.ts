import { z } from "zod";

export const scenarioSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "doit contenir au moins 4 caractères.",
    })
    .max(64, {
      message: "doit contenir au maximum 64 caractères.",
    }),
  teaser: z
    .string()
    .min(32, {
      message: "doit contenir au moins 32 caractères.",
    })
    .max(256, {
      message: "doit contenir au maximum 64 caractères.",
    }),
  fullStory: z.string().min(64, {
    message: "doit contenir au moins 64 caractères.",
  }),
  bannerUrl: z.string().max(256, {
    message: "doit contenir au maximum 256 caractères.",
  }),
  credits: z
    .string()
    .min(4, {
      message: "doit contenir au moins 4 caractères.",
    })
    .max(256, {
      message: "doit contenir au maximum 256 caractères.",
    }),
});
