import { describe, expect, it, vi } from "vitest";
import { User } from "../../src/entities/User";
import UserResolver from "../../src/resolvers/UserResolver";

describe("UserResolver (unit)", () => {
  it("getAllUsers returns mocked data", async () => {
    const mockUsers = [{ id: "1" } as InstanceType<typeof User>];
    const mockUserRepo = {
      find: vi.fn().mockResolvedValue(mockUsers),
      findAll: vi.fn().mockResolvedValue([]),
      findByMail: vi.fn().mockResolvedValue(User),
      create: vi.fn().mockResolvedValue(Promise<typeof User>),
    };
    const resolver = new UserResolver(mockUserRepo);

    const result = await resolver.getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(mockUserRepo.find).toHaveBeenCalledOnce();
  });
});
