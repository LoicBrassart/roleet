import { Query, Resolver } from "type-graphql";
import { Campaign } from "../entities/Campaign";
import { Flashcard } from "../entities/FlashCard";
import { Plan } from "../entities/Plan";
import { Scenario } from "../entities/Scenario";
import { Stats } from "../entities/Stats";
import { User } from "../entities/User";

@Resolver(Stats)
class StatsResolver {
  //TODO: Upgrade perfs
  @Query(() => Stats)
  async getStats() {
    const [campaigns, flashcards, plans, scenarios, users] = await Promise.all([
      Campaign.count(),
      Flashcard.count(),
      Plan.count(),
      Scenario.count(),
      User.count(),
    ]);
    return Object.assign(new Stats(), {
      campaigns,
      flashcards,
      plans,
      scenarios,
      users,
    });
  }
}

export default StatsResolver;
