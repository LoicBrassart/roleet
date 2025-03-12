import { z } from "zod";

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type Option = z.infer<typeof optionSchema>;

export const formOptionsSchema = z.array(
  optionSchema.transform((val) => val.value)
);
