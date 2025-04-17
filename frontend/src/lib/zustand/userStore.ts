import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Scenario } from "../graphql/generated/graphql-types";

export type User = {
  id: string;
  name: string;
  roles: string[];
  readScenarios: string[];
};

type UserState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  readScenario: (scenario: Scenario) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user: User) => set(() => ({ user: user })),
        logout: () => set(() => ({ user: null })),
        readScenario: (scenario: Scenario) => {
          produce((state: UserState) => {
            if (state.user && !state.user.readScenarios.includes(scenario.id)) {
              state.user.readScenarios.push(scenario.id);
            }
          });
        },
      }),
      {
        name: "user-store",
      },
    ),
  ),
);

export const useConnectedUser = () => useUserStore((state) => state.user);
export const useLogout = () => useUserStore((state) => state.logout);
