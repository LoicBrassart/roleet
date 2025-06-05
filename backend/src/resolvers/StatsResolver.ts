import { Query, Resolver, UseMiddleware } from "type-graphql";
import { Campaign } from "../entities/Campaign";
import { Flashcard } from "../entities/FlashCard";
import { Plan } from "../entities/Plan";
import { Scenario } from "../entities/Scenario";
import { Stats } from "../entities/Stats";
import { User } from "../entities/User";
import CheckCache from "../middlewares/Cache";

@Resolver(Stats)
class StatsResolver {
  @Query(() => Stats)
  @UseMiddleware(CheckCache(60 * 15))
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
