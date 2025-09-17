import { z } from "zod";
import { uuidSchema } from "./uuid";

export const poiSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: "doit contenir au moins 1 caractère.",
    })
    .max(8, {
      message: "doit contenir au maximum 8 caractères.",
    }),
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
  planId: uuidSchema,
});
