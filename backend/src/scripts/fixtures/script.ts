import { dataSource } from "../../config/db";
import { Campaign } from "../../entities/Campaign";
import { Flashcard } from "../../entities/FlashCard";
import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";
import { Scenario } from "../../entities/Scenario";
import { User } from "../../entities/User";
import {
  campaigns,
  flashcards,
  plans,
  pois,
  scenarios,
  users,
} from "./data/dev";

async function generateAndSaveFixtures() {
  try {
    await dataSource.initialize();

    // type Entity = { name: string; tableName: string };
    // let entities: Entity[] = [];
    // await dataSource.entityMetadatas.forEach((x) =>
    //   entities.push({ name: x.name, tableName: x.tableName })
    // );
    // console.log(entities);
    // TODO: Clean DB without listing all entities manually

    await dataSource.manager.delete(Campaign, {});
    await dataSource.manager.delete(User, {});
    await dataSource.manager.delete(Flashcard, {});
    await dataSource.manager.delete(PointOfInterest, {});
    await dataSource.manager.delete(Plan, {});
    await dataSource.manager.delete(Scenario, {});

    const savedScenarios = await Promise.all(
      scenarios.map(async (scenarioData) => {
        const scenario = Object.assign(new Scenario(), { ...scenarioData });
        return scenario.save();
      }),
    );

    const savedPlans = await Promise.all(
      plans.map(async (planData) => {
        const plan = Object.assign(new Plan(), {
          ...planData,
          scenario: savedScenarios[planData.scenarioIndex],
        });
        return plan.save();
      }),
    );

    const savedPoI = await Promise.all(
      pois.map(async (poiData) => {
        const poi = Object.assign(new PointOfInterest(), {
          ...poiData,
          plan: savedPlans[poiData.planIndex],
        });
        return poi.save();
      }),
    );

    const savedFlashcards = await Promise.all(
      flashcards.map(async (cardData) => {
        const card = Object.assign(new Flashcard(), {
          ...cardData,
          scenario: savedScenarios[cardData.scenarioIndex],
        });
        return card.save();
      }),
    );

    const savedUsers = await Promise.all(
      users.map(async (userData) => {
        const user = Object.assign(new User(), { ...userData });
        return user.save();
      }),
    );
    const userMap = new Map(savedUsers.map((user) => [user.name, user]));

    const savedCampaigns = await Promise.all(
      campaigns.map(async (campaignData) => {
        const campaign = Object.assign(new Campaign(), {
          ...campaignData,
          storyteller: userMap.get(campaignData.storyteller)?.id,
          players: campaignData.players.map((player) => userMap.get(player)),
          scenarios: savedScenarios.filter((scenario) =>
            campaignData.scenarios.includes(scenario.title),
          ),
        });
        return campaign.save();
      }),
    );

    console.info(`
    Fixtures enregistrées avec succès :
    - ${savedScenarios.length} Scenarios
    - ${savedPlans.length} Plans
    - ${savedPoI.length} Points d'Intérêt
    - ${savedFlashcards.length} Flashcards
    - ${savedUsers.length} Utilisateurs
    - ${savedCampaigns.length} Campagnes
    `);
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}

generateAndSaveFixtures();
