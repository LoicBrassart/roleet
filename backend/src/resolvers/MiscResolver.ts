import { Query, Resolver } from "type-graphql";
import { Campaign } from "../entities/Campaign";
import { Flashcard } from "../entities/FlashCard";
import { Plan } from "../entities/Plan";
import { Scenario } from "../entities/Scenario";
import { User } from "../entities/User";

type statsOutput = {
  scenarios: number;
  users: number;
  campaigns: number;
  plans: number;
  flashcards: number;
};

@Resolver()
class MiscResolver {
  //TODO: Finish this + upgrade perfs
  @Query()
  async getStats() {
    const stats: statsOutput = {
      scenarios: 0,
      users: 0,
      campaigns: 0,
      plans: 0,
      flashcards: 0,
    };
    stats.scenarios = (await Scenario.find()).length;
    stats.users = (await User.find()).length;
    stats.campaigns = (await Campaign.find()).length;
    stats.plans = (await Plan.find()).length;
    stats.flashcards = (await Flashcard.find()).length;

    return stats;
  }
}

export default MiscResolver;
