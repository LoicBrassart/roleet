import { z } from "zod";
import { formOptionsSchema } from "./formOptions";

export const updateCampaignSchema = z.object({
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

export type UpdateCampaign = z.infer<typeof updateCampaignSchema>;
// export type CreateCampainInput = z.input<typeof updateCampaignSchema>;
// export type CreateCampainOutput = z.output<typeof updateCampaignSchema>;
