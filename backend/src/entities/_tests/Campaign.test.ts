import { Campaign } from "../Campaign";
import { mockScenario, mockUser } from "./mocks";

describe.only("Campaign entity", () => {
  it("should instanciate with minimal inputs", () => {
    const campaign = new Campaign();

    // Mandatory, no default value -> should block .save()
    expect(campaign.title).toBeUndefined();
    expect(campaign.storyteller).toBeUndefined();

    // Default value provided
    expect(campaign.scenarios).toEqual([]);
    expect(campaign.players).toEqual([]);

    // Optional
    expect(campaign.bannerUrl).toBeUndefined();
  });

  it("should instanciate with full inputs", () => {
    const campaign = new Campaign();
    campaign.title = "Epic Adventure";
    campaign.storyteller = mockUser;
    campaign.players = [mockUser];
    campaign.scenarios = [mockScenario];
    campaign.bannerUrl = "https://example.com/banner.jpg";

    expect(campaign.title).toBe("Epic Adventure");
    expect(campaign.storyteller).toBe(mockUser);
    expect(campaign.players).toHaveLength(1);
    expect(campaign.scenarios).toHaveLength(1);
    expect(campaign.bannerUrl).toBe("https://example.com/banner.jpg");
  });

  it("should handle relations well", () => {
    const campaign = new Campaign();
    campaign.storyteller = mockUser;
    campaign.players = [mockUser];
    campaign.scenarios = [mockScenario];

    expect(campaign.storyteller.name).toBe(mockUser.name);
    expect(campaign.players[0].name).toBe(mockUser.name);
    expect(campaign.scenarios[0].title).toBe(mockScenario.title);
  });
});
