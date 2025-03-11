import { Campaign } from "../Campaign";
import { Scenario } from "../Scenario";
import { Roles, User } from "../User";

describe("User entity", () => {
  it("should create a valid User instance with required fields", () => {
    const user = new User();

    user.mail = "john.doe@example.com";
    user.name = "John Doe";
    user.hashedPassword = "hashedpassword123";

    expect(user.mail).toBe("john.doe@example.com");
    expect(user.name).toBe("John Doe");
    expect(user.hashedPassword).toBe("hashedpassword123");
    expect(user.roles).toEqual([Roles.USER]); // Default role
    expect(user.readScenarios).toBeUndefined();
    expect(user.campaigns).toBeUndefined();
    expect(user.campaignsToLead).toBeUndefined();
  });

  it("should accept custom roles", () => {
    const user = new User();

    user.mail = "admin@example.com";
    user.name = "Admin User";
    user.hashedPassword = "adminpass";
    user.roles = [Roles.ADMIN, Roles.USER];

    expect(user.roles).toEqual([Roles.ADMIN, Roles.USER]);
  });

  it("should handle a list of readScenarios", () => {
    const scenario1 = new Scenario();
    scenario1.title = "Haunted Mansion";

    const scenario2 = new Scenario();
    scenario2.title = "Pirate Treasure Hunt";

    const user = new User();
    user.readScenarios = [scenario1, scenario2];

    expect(user.readScenarios.length).toBe(2);
    expect(user.readScenarios[0].title).toBe("Haunted Mansion");
    expect(user.readScenarios[1].title).toBe("Pirate Treasure Hunt");
  });

  it("should handle a list of campaigns as player", () => {
    const campaign1 = new Campaign();
    campaign1.title = "Epic Quest";

    const campaign2 = new Campaign();
    campaign2.title = "Zombie Apocalypse";

    const user = new User();
    user.campaigns = [campaign1, campaign2];

    expect(user.campaigns.length).toBe(2);
    expect(user.campaigns[0].title).toBe("Epic Quest");
    expect(user.campaigns[1].title).toBe("Zombie Apocalypse");
  });

  it("should handle a list of campaigns as storyteller", () => {
    const campaign1 = new Campaign();
    campaign1.title = "Mystic Journey";

    const campaign2 = new Campaign();
    campaign2.title = "Alien Invasion";

    const user = new User();
    user.campaignsToLead = [campaign1, campaign2];

    expect(user.campaignsToLead.length).toBe(2);
    expect(user.campaignsToLead[0].title).toBe("Mystic Journey");
    expect(user.campaignsToLead[1].title).toBe("Alien Invasion");
  });

  it("should allow empty arrays for relations", () => {
    const user = new User();
    user.readScenarios = [];
    user.campaigns = [];
    user.campaignsToLead = [];

    expect(user.readScenarios.length).toBe(0);
    expect(user.campaigns.length).toBe(0);
    expect(user.campaignsToLead.length).toBe(0);
  });
});
