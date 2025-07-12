"use client";

import { cn } from "@/lib/shadcn/generated/utils";
import { AnimatePresence, type Transition, motion } from "motion/react";
import React, { useState } from "react";

// https://animated-tabs-one.vercel.app/

export interface Tab {
  label: string;
  value: string;
  component: React.ReactElement;
}

interface AnimatedTabsProps<T extends readonly [Tab, ...Tab[]]> {
  tabs: T;
  defaultTabValue?: T[number]["value"];
  options?: {
    transition?: Transition;
  };
  className?: string;
}

const defaultOptions = {
  transition: {
    type: "tween",
    ease: "easeOut",
    duration: 0.15,
  } satisfies Transition,
};

const getHoverAnimationProps = (hoveredRect: DOMRect, navRect: DOMRect) => ({
  x: hoveredRect.left - navRect.left - 10,
  y: hoveredRect.top - navRect.top - 4,
  width: hoveredRect.width + 20,
  height: hoveredRect.height + 10,
});

interface TabContentProps {
  tab: Tab | undefined;
  transition: Transition;
  className?: string;
}
const TabContent = ({ tab, transition, className }: TabContentProps) => {
  if (!tab) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transition}
      className={cn(
        "mt-4 h-[55vh] rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900",
        className,
      )}
    >
      {tab.component}
    </motion.div>
  );
};

interface TabsProps {
  tabs: Tab[];
  selectedTabIndex: number;
  setSelectedTab: (input: [number, number]) => void;
  transition: Transition;
}
const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
  transition,
}: TabsProps): React.ReactElement => {
  const [buttonRefs, setButtonRefs] = React.useState<
    (HTMLButtonElement | null)[]
  >([]);

  React.useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = React.useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(
    null,
  );
  const hoveredRect =
    buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

  return (
    <nav
      ref={navRef}
      className="relative z-0 flex flex-shrink-0 items-center justify-center py-2"
      onPointerLeave={() => {
        setHoveredTabIndex(null);
      }}
    >
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i;

        return (
          <button
            type="button"
            key={item.value}
            className="relative z-20 flex h-8 cursor-pointer select-none items-center rounded-md bg-transparent px-4 text-sm transition-colors"
            onPointerEnter={() => {
              setHoveredTabIndex(i);
            }}
            onFocus={() => {
              setHoveredTabIndex(i);
            }}
            onClick={() => {
              setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
            }}
          >
            <motion.span
              ref={(el: HTMLButtonElement) => {
                buttonRefs[i] = el;
              }}
              className={cn("block", {
                "text-zinc-500": !isActive,
                "font-semibold text-black dark:text-white": isActive,
              })}
            >
              <small
                className={item.value === "danger-zone" ? "text-red-500" : ""}
              >
                {item.label}
              </small>
            </motion.span>
          </button>
        );
      })}

      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key="hover"
            className={`absolute top-0 left-0 z-10 rounded-md ${
              hoveredTabIndex ===
              tabs.findIndex(({ value }) => value === "danger-zone")
                ? "bg-red-100 dark:bg-red-500/30"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
            initial={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            animate={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 1,
            }}
            exit={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRect && navRect && (
          <motion.div
            className={`absolute bottom-0 left-0 z-10 h-[2px] ${
              selectedTabIndex ===
              tabs.findIndex(({ value }) => value === "danger-zone")
                ? "bg-red-500"
                : "bg-black dark:bg-white"
            }`}
            initial={false}
            animate={{
              width: selectedRect.width + 18,
              x: `calc(${String(selectedRect.left - navRect.left - 9)}px)`,
              opacity: 1,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export function AnimatedTabs<T extends readonly [Tab, ...Tab[]]>({
  tabs,
  defaultTabValue,
  options: opt = {},
  className,
}: AnimatedTabsProps<T>) {
  const hookPropsRef = React.useRef({
    tabs: [...tabs],
    initialTabId: defaultTabValue ?? tabs[0].value,
  });
  const options = { ...opt, ...defaultOptions };

  const framer = useTabs(hookPropsRef.current);

  return (
    <div className="w-full">
      <div className="relative flex w-full items-center justify-between overflow-x-auto overflow-y-hidden border-b dark:border-dark-4">
        <Tabs {...framer.tabProps} transition={options.transition} />
      </div>
      <AnimatePresence mode="wait">
        <TabContent
          tab={framer.selectedTab}
          transition={options.transition}
          className={className}
        />
      </AnimatePresence>
    </div>
  );
}

function useTabs({
  tabs,
  initialTabId,
  onChange,
}: {
  tabs: Tab[];
  initialTabId: string;
  onChange?: (id: string) => void;
}) {
  const [[selectedTabIndex, direction], setSelectedTab] = useState<
    [number, number]
  >(() => {
    const indexOfInitialTab = tabs.findIndex(
      (tab: Tab) => tab.value === initialTabId,
    );
    return [indexOfInitialTab === -1 ? 0 : indexOfInitialTab, 0];
  });

  /**
   * Returns the tabs prop, the selected tab, and the content props.
   *
   * The tabs prop is an object with the following properties:
   * - tabs: The array of tabs.
   * - selectedTabIndex: The index of the selected tab.
   * - onChange: The function to call when the selected tab changes.
   * - setSelectedTab: The function to call to change the selected tab.
   *
   * The selected tab is the currently selected tab object.
   *
   * The content props is an object with the following properties:
   * - ref: The ref for the content element.
   * - className: The class name for the content element.
   * - "aria-hidden": Whether the content element is hidden.
   * - "aria-labelledby": The id of the tab element that labels the content element.
   * - role: The role of the content element.
   */

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onChange,
      setSelectedTab,
    },
    selectedTab: tabs[selectedTabIndex],
    contentProps: {
      direction,
      selectedTabIndex,
    },
  };
}
