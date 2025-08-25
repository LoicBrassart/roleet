import { Campaign } from "../../entities/Campaign";
import { Flashcard } from "../../entities/FlashCard";
import { Message } from "../../entities/Message";
import { Note } from "../../entities/Note";
import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";
import { Scenario } from "../../entities/Scenario";
import { Session } from "../../entities/Session";
import { User } from "../../entities/User";
import { dataSource } from "../../lib/typeorm/dataSource";
import {
  campaigns,
  flashcards,
  messages,
  notes,
  plans,
  pois,
  scenarios,
  sessions,
  users,
} from "./data/dev";

async function generateAndSaveFixtures() {
  try {
    await dataSource.initialize();
    await dataSource.synchronize(true);

    const savedUsers = await Promise.all(
      users.map(async (userData) => {
        const user = Object.assign(new User(), { ...userData });
        return user.save();
      }),
    );
    const userMap = new Map(savedUsers.map((user) => [user.name, user]));

    const savedScenarios = await Promise.all(
      scenarios.map(async (scenarioData) => {
        const scenario = Object.assign(new Scenario(), { ...scenarioData });
        scenario.owner = savedUsers[scenarioData.ownerIndex];
        return scenario.save();
      }),
    );

    const savedPlans = await Promise.all(
      plans.map(async (planData) => {
        const plan = Object.assign(new Plan(), {
          ...planData,
          scenario: savedScenarios[planData.scenarioIndex],
          owner: savedUsers[planData.ownerIndex],
        });
        return plan.save();
      }),
    );

    const savedPoI = await Promise.all(
      pois.map(async (poiData) => {
        const poi = Object.assign(new PointOfInterest(), {
          ...poiData,
          plan: savedPlans[poiData.planIndex],
          owner: savedUsers[poiData.ownerIndex],
        });
        return poi.save();
      }),
    );

    const savedFlashcards = await Promise.all(
      flashcards.map(async (cardData) => {
        const card = Object.assign(new Flashcard(), {
          ...cardData,
          scenario: savedScenarios[cardData.scenarioIndex],
          owner: savedUsers[cardData.ownerIndex],
        });
        return card.save();
      }),
    );

    const savedCampaigns = await Promise.all(
      campaigns.map(async (campaignData) => {
        const campaign = Object.assign(new Campaign(), {
          ...campaignData,
          storyteller: userMap.get(campaignData.storyteller)?.id,
          players: campaignData.players.map((player) => userMap.get(player)),
          scenarios: savedScenarios.filter((scenario) =>
            campaignData.scenarios.includes(scenario.title),
          ),
          owner: savedUsers[campaignData.ownerIndex],
        });
        return campaign.save();
      }),
    );

    const savedMessages = await Promise.all(
      messages.map(async (messageData) => {
        const message = Object.assign(new Message(), {
          ...messageData,
          owner: savedUsers[messageData.ownerIndex],
          campaign: savedCampaigns[messageData.campaignIndex],
        });
        return message.save();
      }),
    );

    const savedNotes = await Promise.all(
      notes.map(async (notesData) => {
        const note = Object.assign(new Note(), {
          ...notesData,
          owner: savedUsers[notesData.ownerIndex],
          campaign: savedCampaigns[notesData.campaignIndex],
        });
        return note.save();
      }),
    );

    const savedSessions = await Promise.all(
      sessions.map(async (sessionsData) => {
        const session = Object.assign(new Session(), {
          ...sessionsData,
          campaign: savedCampaigns[sessionsData.campaignIndex],
        });
        return session.save();
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
    - ${savedMessages.length} Messages
    - ${savedNotes.length} Notes
    - ${savedSessions.length} Sessions
    `);
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}

generateAndSaveFixtures();
