import { z } from "zod";
import { formOptionsSchema, optionSchema } from "./formOptions";

export const createCampaignSchema = z.object({
  title: z
    .string()
    .min(4, { message: "doit contenir au moins 4 caractères." })
    .max(64, { message: "doit contenir au maximum 64 caractères." }),
  bannerUrl: z
    .string()
    .min(4, { message: "doit contenir au moins 4 caractères." })
    .max(256, { message: "doit contenir au maximum 256 caractères." }),
  players: formOptionsSchema.min(1, {
    message: "doit contenir au moins 1 joueur.",
  }),
  scenarios: formOptionsSchema,
});

export type CreateCampain = z.infer<typeof createCampaignSchema>;
export type CreateCampainInput = z.input<typeof createCampaignSchema>;
export type CreateCampainOutput = z.output<typeof createCampaignSchema>;
