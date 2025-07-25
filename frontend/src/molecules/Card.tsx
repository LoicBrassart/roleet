import { cva, type VariantProps } from "class-variance-authority";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadCard,
} from "@/lib/shadcn/generated/ui/card";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import { cn } from "@/lib/shadcn/generated/utils";

//! /!\ ATTENTION /!\ Make sure to not have multiple variants with the same name
//! If you do, it will override the previous one on the component

// Styles pour la card
const cardVariants = cva("w-full max-w-96 gap-4", {
  variants: {
    /** Card variant */
    variant: {
      default: "",
    },
    bgImage: {
      false: "",
      true: "no-repeat bg-center bg-cover",
    },
    overlay: {
      false: "",
      true: "bg-black/50 text-white bg-blend-soft-light",
    },
  },
  defaultVariants: {
    variant: "default",
    overlay: false,
    bgImage: false,
  },
});

// Styles pour le content
const contentVariants = cva("", {
  variants: {
    /** Content variant */
    contentVariant: {
      default: "",
      flex: "flex flex-col",
    },
    /** Content spacing */
    contentSpacing: {
      none: "",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    contentVariant: "default",
    contentSpacing: "none",
  },
});

// Styles pour le scrollArea
const scrollAreaVariants = cva("", {
  variants: {
    /** Height for the scrollArea */
    height: {
      auto: "",
      "32": "h-32",
    },
  },
  defaultVariants: {
    height: "auto",
  },
});

type Props = Omit<React.ComponentProps<typeof ShadCard>, "title"> &
  VariantProps<typeof contentVariants> &
  VariantProps<typeof scrollAreaVariants> & {
    // Only variant is available (bgImage & overlay are handled by bgImage prop)
    variant?: VariantProps<typeof cardVariants>["variant"];
    /** Card title */
    title: React.ReactNode;
    /** Card description */
    description?: React.ReactNode;
    /** Background image. Must be a url. If provided, overlay will be active */
    bgImage?: string;
    /** Content className */
    contentClassName?: string;
  };

export function Card({
  className,
  style,
  variant,
  children,
  title,
  description,
  bgImage,
  height,
  contentVariant,
  contentSpacing,
  contentClassName,
  ...props
}: Props) {
  const combinedStyle = {
    ...(bgImage ? { backgroundImage: `url(${bgImage})` } : {}),
    ...style,
  };
  return (
    <ShadCard
      className={cn(
        cardVariants({ variant, overlay: !!bgImage, bgImage: !!bgImage }),
        className,
      )}
      style={combinedStyle}
      {...props}
    >
      <CardHeader>
        <CardTitle className="font-title">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent
        className={cn(
          contentVariants({ contentVariant, contentSpacing }),
          contentClassName,
        )}
      >
        <ScrollArea className={scrollAreaVariants({ height })}>
          {children}
        </ScrollArea>
      </CardContent>
    </ShadCard>
  );
}
