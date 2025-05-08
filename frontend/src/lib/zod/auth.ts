import { z } from "zod";

export const currentUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  roles: z.array(z.string()),
  readScenarios: z.array(z.string()),
});
export type CurrentUser = z.infer<typeof currentUserSchema>;
