import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadCard,
} from "@/lib/shadcn/generated/ui/card";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import { cn } from "@/lib/shadcn/generated/utils";
import { type VariantProps, cva } from "class-variance-authority";

const cardVariants = cva("m-1 size-96", {
  variants: {
    variant: {
      default: "",
      creation: "bg-primary/10",
      edition: "border border-primary bg-secondary/10",
      flashcard:
        "border border-primary/50 bg-slate-950 shadow-md shadow-primary/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = Omit<React.ComponentProps<typeof ShadCard>, "title"> &
  VariantProps<typeof cardVariants> & {
    title: React.ReactNode;
    description?: React.ReactNode;
  };

export function Card({
  className,
  variant,
  children,
  title,
  description,
  ...props
}: Props) {
  return (
    <ShadCard className={cn(cardVariants({ variant }), className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ScrollArea>{children}</ScrollArea>
      </CardContent>
    </ShadCard>
  );
}
