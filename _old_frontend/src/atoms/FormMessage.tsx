import { FormMessage as ShadFormMessage } from "@/lib/shadcn/generated/ui/form";

export const FormMessage = (
  props: React.ComponentProps<typeof ShadFormMessage>,
) => <ShadFormMessage {...props} />;
