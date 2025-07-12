import { produce } from "immer";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

type State = {
  scenarios: { [scenId: string]: boolean };
  setLock: (scenId: string, isLocked: boolean) => void;
  isLocked: (scenId: string) => boolean;
};

const DEFAULT_STATE_LOCK = true;

const useStore = create<State>()(
  subscribeWithSelector(
    devtools((set, get) => ({
      scenarios: {},
      setLock: (scenId: string, isLocked: boolean) =>
        set(
          produce((state) => {
            state.scenarios[scenId] = isLocked;
          }),
        ),
      isLocked: (scenId: string) =>
        get().scenarios[scenId] ?? DEFAULT_STATE_LOCK,
    })),
  ),
);

export const useSetLockedScenario = () => useStore((state) => state.setLock);
export const useIsScenarioLocked = (scenId: string) =>
  useStore((state) => state.isLocked(scenId));

export const subscribeScenario = (
  scenId: string,
  callback: (isLocked: boolean) => void,
) =>
  useStore.subscribe(
    (state) => state.isLocked(scenId),
    (isLocked) => callback(isLocked),
  );
