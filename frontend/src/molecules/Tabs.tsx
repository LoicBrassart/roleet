import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import {
  TabsList as TabsListPrimitive,
  Tabs as TabsPrimitive,
  // TabsContent as TabsContentPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
} from "@/lib/shadcn/generated/ui/tabs";
import { cn } from "@/lib/utils";

export { TabsContent } from "@/lib/shadcn/generated/ui/tabs";

export const TabsContext = createContext<{
  orientation?: "horizontal" | "vertical";
}>({});

export function useTabs() {
  return useContext(TabsContext);
}

export function Tabs({
  children,
  orientation,
  defaultValue,
}: {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  defaultValue: string;
}) {
  return (
    <TabsContext.Provider value={{ orientation }}>
      <TabsPrimitive defaultValue={defaultValue}>{children}</TabsPrimitive>
    </TabsContext.Provider>
  );
}

const tabsListVariants = cva("items-start justify-start", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "flex h-auto flex-col gap-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type ListProps = React.ComponentProps<typeof TabsListPrimitive> &
  VariantProps<typeof tabsListVariants>;

export function TabsList({ className, ...props }: ListProps) {
  const { orientation } = useTabs();

  return (
    <TabsListPrimitive
      className={cn(tabsListVariants({ orientation }), className)}
      {...props}
    />
  );
}

const tabsTriggerVariants = cva("data-[state=active]:bg-green", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "gap-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsTriggerPrimitive>) {
  const { orientation } = useTabs();

  return (
    <TabsTriggerPrimitive
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ orientation }), className)}
      {...props}
    />
  );
}
