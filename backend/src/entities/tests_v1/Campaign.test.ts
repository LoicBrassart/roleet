import { Campaign } from "../Campaign";
import { Scenario } from "../Scenario";
import { User } from "../User";

describe("Campaign entity", () => {
  it("should create a valid instance with required fields", () => {
    const storyteller = new User();
    const campaign = new Campaign();

    campaign.title = "Epic Adventure";
    campaign.storyteller = storyteller;

    expect(campaign.title).toBe("Epic Adventure");
    expect(campaign.storyteller).toBe(storyteller);
    expect(campaign.bannerUrl).toBeUndefined();
    expect(campaign.players).toBeUndefined();
    expect(campaign.scenarios).toBeUndefined();
  });

  it("should handle optional bannerUrl field when provided", () => {
    const storyteller = new User();
    const campaign = new Campaign();

    campaign.title = "Mystic Quest";
    campaign.bannerUrl = "https://example.com/banner.jpg";
    campaign.storyteller = storyteller;

    expect(campaign.bannerUrl).toBe("https://example.com/banner.jpg");
  });

  it("should handle players relation properly", () => {
    const storyteller = new User();
    const player1 = new User();
    const player2 = new User();

    const campaign = new Campaign();
    campaign.title = "Group Adventure";
    campaign.storyteller = storyteller;
    campaign.players = [player1, player2];

    expect(campaign.players).toContain(player1);
    expect(campaign.players).toContain(player2);
    expect(campaign.players).toHaveLength(2);
  });

  it("should handle scenarios relation properly", () => {
    const storyteller = new User();
    const scenario1 = new Scenario();
    const scenario2 = new Scenario();

    const campaign = new Campaign();
    campaign.title = "Scenario Campaign";
    campaign.storyteller = storyteller;
    campaign.scenarios = [scenario1, scenario2];

    expect(campaign.scenarios).toContain(scenario1);
    expect(campaign.scenarios).toContain(scenario2);
    expect(campaign.scenarios).toHaveLength(2);
  });

  it("should allow empty players and scenarios arrays", () => {
    const storyteller = new User();
    const campaign = new Campaign();

    campaign.title = "Empty Campaign";
    campaign.storyteller = storyteller;
    campaign.players = [];
    campaign.scenarios = [];

    expect(campaign.players).toEqual([]);
    expect(campaign.scenarios).toEqual([]);
  });
});
