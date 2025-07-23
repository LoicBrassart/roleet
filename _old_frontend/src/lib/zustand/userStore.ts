import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CurrentUser } from "@/lib/zod/auth";

type State = {
  user: CurrentUser | null;
  login: (user: CurrentUser) => void;
  logout: () => void;
  readScenario: (scenId: string) => void;
};

const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user: CurrentUser) => set(() => ({ user: user })),
        logout: () => set(() => ({ user: null })),
        readScenario: (scenId: string) => {
          set(
            produce((state: State) => {
              if (state.user && !state.user.readScenarios.includes(scenId)) {
                state.user.readScenarios.push(scenId);
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
