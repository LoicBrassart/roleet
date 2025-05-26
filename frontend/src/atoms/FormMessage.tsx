import { FormMessage as ShadFormMessage } from "@/lib/shadcn/generated/ui/form";
import type { ComponentProps } from "react";
export const FormMessage = (props: ComponentProps<typeof ShadFormMessage>) => (
  <ShadFormMessage {...props} />
);
