import { z } from "zod";

const userSchema = z.object({
  __typename: z.literal("User"),
  id: z.string(),
  name: z.string(),
});

const scenarioSchema = z.object({
  __typename: z.literal("Scenario"),
  id: z.string(),
  title: z.string(),
});

const messageSchema = z.object({
  __typename: z.literal("Message"),
  id: z.string(),
  channel: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export const campaignSchema = z.object({
  __typename: z.literal("Campaign"),
  id: z.string().uuid(),
  bannerUrl: z.string(),
  title: z.string(),
  storyteller: userSchema,
  scenarios: z.array(scenarioSchema),
  players: z.array(userSchema),
  messages: z.array(messageSchema),
});

export type CampaignSchema = z.infer<typeof campaignSchema>;
