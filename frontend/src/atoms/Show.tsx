type Props<T> = {
  when: T;
  fallback?: React.ReactNode;
  children: React.ReactNode | ((whenValue: NonNullable<T>) => React.ReactNode);
};

/**
 * Conditionally renders children based on the value of the `when` prop.
 *
 * If `when` is truthy, the child component will be rendered. If `when` is falsy, the
 * fallback component will be rendered.
 *
 * If `children` is a function, it will be called with the value of `when` as its
 * argument. Otherwise, `children` will be rendered directly.
 *
 * @example
 * // Renders "Content" because `when` is true
 * <Show when={true} fallback={<div>Fallback</div>}>
 *   <div>Content</div>
 * </Show>
 *
 * @example
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
 *
 * @param {Props<T>} props
 * @returns {React.ReactNode}
 */
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
