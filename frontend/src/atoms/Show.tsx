type Props<T> = {
  when: T;
  fallback?: React.ReactNode;
  children: React.ReactNode | ((whenValue: NonNullable<T>) => React.ReactNode);
};

export function Show<T>({
  children,
  when,
  fallback = null,
}: Props<T>): React.ReactNode {
  if (when) {
    const wrappedChildren = () => {
      if (typeof children === "function") {
        return children(when);
      }
      return children;
    };

    return wrappedChildren();
  }

  return fallback;
}

/**
 * // Renders "Content" because `when` is true
 * <Show when={true} fallback={<div>Fallback</div>}>
 *   <div>Content</div>
 * </Show>
 *
 * // Renders "isValid is true" when Math.random() is more than 0.5,
 * // Otherwise renders "isValid is undefined"
 * let isValid: boolean | undefined;
 * if (Math.random() > 0.5) {
 *   isValid = true;
 * }
 * return (
 *   <Show when={isValid} fallback={<div>isValid is undefined</div>}>
 *     {(valid) => <div>isValid is {valid}</div>}
 *   </Show>
 * );
 */
