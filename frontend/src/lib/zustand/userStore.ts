import type { CurrentUser } from "@/lib/zod/auth";
import type { Entities } from "@/types/entities";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  user: CurrentUser | null;
  login: (user: CurrentUser) => void;
  logout: () => void;
  readScenario: (scenario: Entities.Scenario) => void;
};

const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user: CurrentUser) => set(() => ({ user: user })),
        logout: () => set(() => ({ user: null })),
        readScenario: (scenario: Entities.Scenario) => {
          set(
            produce((state: State) => {
              if (
                state.user &&
                !state.user.readScenarios.includes(scenario.id)
              ) {
                state.user.readScenarios.push(scenario.id);
              }
            }),
          );
        },
      }),
      {
        name: "user-store",
      },
    ),
  ),
);

export const useCurrentUser = () => useStore((state) => state.user);
export const useLogin = () => useStore((state) => state.login);
export const useLogout = () => useStore((state) => state.logout);
export const useUnsealScenario = () => useStore((state) => state.readScenario);
