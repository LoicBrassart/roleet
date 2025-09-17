import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/shadcn/generated/utils";

const variants = cva("text-base", {
  variants: {
    variant: {
      title: "font-bold text-2xl",
      subtitle: "font-semibold text-lg",
      body: "text-base",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export function Text({ variant }: VariantProps<typeof variants>) {
  return (
    <p className={cn(variants({ variant }))}>
      <Slot />
    </p>
  );
}
