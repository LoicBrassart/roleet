import { useCallback, useState } from "react";

export function useToggle(defaultValue?: boolean) {
  const [value, setter] = useState(!!defaultValue);

  const toggler = useCallback(() => {
    setter((x) => !x);
  }, []);

  return [value, toggler, setter] as const;
}
