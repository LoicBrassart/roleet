import type { IUserService } from "@/models/UserService";
import type { AnonContext, AuthContext } from "@/types/ApolloContext";
import { describe, expect, it, vi } from "vitest";
import { Role, User } from "../../src/entities/User";
import UserResolver, {
  type NewUserInput,
} from "../../src/resolvers/UserResolver";

describe("UserResolver (unit)", () => {
  let mockUsers: User[];
  let mockUserRepo: IUserService;
  let resolver: UserResolver;
  let newUser: NewUserInput;
  let mockContext: AnonContext | AuthContext;

  beforeAll(() => {
    vi.stubEnv("JWT_SECRET", "toto");
    vi.stubEnv("COOKIE_TTL", "600");
    mockUsers = [{ id: "1" } as InstanceType<typeof User>];
    newUser = {
      mail: "toto2@spamland.com",
      name: "Toto2",
      password: "toto",
    };
    mockContext = {
      res: {
        setHeader: (_str: string, _value) => {},
      },
    } as AnonContext;
    mockUserRepo = {
      find: vi.fn().mockResolvedValue(mockUsers[0]),
      findAll: vi.fn().mockResolvedValue(mockUsers),
      findByMail: vi.fn().mockResolvedValue(User),
      create: vi.fn().mockResolvedValue({
        ...newUser,
        id: "42",
        hashedPassword: "xxxxxxxxxxxxxxxxxxxx",
        roles: [Role.USER],
        readScenarios: [],
      }),
    };
    resolver = new UserResolver(mockUserRepo);
  });

  it("getAllUsers returns mocked data", async () => {
    const result = await resolver.getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(mockUserRepo.findAll).toHaveBeenCalledOnce();
  });

  it("signup creates a new User", async () => {
    const result = await resolver.signup(newUser, mockContext as AnonContext);

    expect(result).toEqual({
      id: "42",
      name: newUser.name,
      roles: ["USER"],
      readScenarios: [],
    });
  });
});
