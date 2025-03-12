import { Campaign } from "../Campaign";
import { mockScenario, mockUser } from "./mocks";

describe("Campaign entity", () => {
  it("should instanciate with minimal inputs", () => {
    const campaign = new Campaign();

    expect(campaign.title).toBeUndefined();
    expect(campaign.storyteller).toBeUndefined();
    expect(campaign.bannerUrl).toBeUndefined();
    expect(campaign.scenarios).toBeUndefined();
    expect(campaign.players).toBeUndefined();
    expect(campaign.id).toBeUndefined();
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
    expect(campaign.bannerUrl).toBe("https://example.com/banner.jpg");
    expect(campaign.players).toHaveLength(1);
    expect(campaign.scenarios).toHaveLength(1);
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
