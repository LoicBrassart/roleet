import { cn } from "@/lib/shadcn/generated/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { PropsWithChildren } from "react";

const variants = cva("text-base", {
  variants: {
    variant: {
      title: "text-2xl font-bold",
      subtitle: "text-lg font-semibold",
      body: "text-base",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export function Text({
  variant,
  children,
}: PropsWithChildren<VariantProps<typeof variants>>) {
  return <p className={cn(variants({ variant }))}>{children}</p>;
}
