import { useCallback, useState } from "react";

export function useToggleState(defaultValue?: boolean) {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    setValue((x) => !x);
  }, []);

  return [value, setValue, toggle] as const;
}
