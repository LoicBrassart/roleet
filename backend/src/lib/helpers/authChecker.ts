// import type { Role } from "@/entities/User";
import type { AuthChecker } from "type-graphql";
import { Role } from "../../entities/User";
import type { UserToken } from "./getUserFromReq";

export const authChecker: AuthChecker<{ user: UserToken }, Role> = async (
  { context: { user } },
  neededRoles,
) => {
  if (!user) return false;

  if (!neededRoles.length) return true;
  if (user.roles.includes(Role.ADMIN)) return true;

  return neededRoles.some(user.roles.includes);
};
