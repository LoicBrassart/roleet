import { Campaign } from "../../Campaign";
import { User, Roles } from "../../User";

describe("Relations: User & Campaign", () => {
  it("should link a storyteller to a campaign", () => {
    const storyteller = new User();
    storyteller.name = "Alice";
    storyteller.mail = "alice@example.com";
    storyteller.hashedPassword = "hashed123";
    storyteller.roles = [Roles.USER];

    const campaign = new Campaign();
    campaign.title = "Epic Saga";
    campaign.storyteller = storyteller;

    expect(campaign.storyteller).toBe(storyteller);
  });

  it("should add players to a campaign", () => {
    const player1 = new User();
    player1.name = "Bob";
    player1.mail = "bob@example.com";
    player1.hashedPassword = "hashed456";
    player1.roles = [Roles.USER];

    const player2 = new User();
    player2.name = "Charlie";
    player2.mail = "charlie@example.com";
    player2.hashedPassword = "hashed789";
    player2.roles = [Roles.USER];

    const campaign = new Campaign();
    campaign.title = "Adventure Time";
    campaign.players = [player1, player2];

    expect(campaign.players).toContain(player1);
    expect(campaign.players).toContain(player2);
    expect(campaign.players).toHaveLength(2);
  });
});
