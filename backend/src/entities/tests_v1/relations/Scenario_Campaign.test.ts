import { Scenario } from "../../Scenario";
import { Campaign } from "../../Campaign";

describe("Relations: Scenario & Campaign", () => {
  it("should add scenarios to a campaign", () => {
    const scenario1 = new Scenario();
    scenario1.title = "First Quest";
    scenario1.teaser = "A mysterious journey";
    scenario1.fullStory = "Long story here...";
    scenario1.credits = "Author Name";

    const scenario2 = new Scenario();
    scenario2.title = "Second Quest";
    scenario2.teaser = "Another mysterious journey";
    scenario2.fullStory = "Another long story...";
    scenario2.credits = "Another Author";

    const campaign = new Campaign();
    campaign.title = "Multi-Quest Campaign";
    campaign.scenarios = [scenario1, scenario2];

    expect(campaign.scenarios).toContain(scenario1);
    expect(campaign.scenarios).toContain(scenario2);
    expect(campaign.scenarios).toHaveLength(2);
  });
});
