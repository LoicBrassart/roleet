import { z } from "zod";
import { formOptionsSchema } from "../helpers/zodSchemas";

const campaignSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "doit contenir au moins 4 caractères.",
    })
    .max(64, {
      message: "doit contenir au maximum 64 caractères.",
    }),
  bannerUrl: z
    .string()
    .min(4, {
      message: "doit contenir au moins 4 caractères.",
    })
    .max(256, {
      message: "doit contenir au maximum 256 caractères.",
    })
    .default(""),
  players: formOptionsSchema,
  scenarios: formOptionsSchema,
});

export default campaignSchema;
