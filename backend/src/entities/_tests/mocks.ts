import type { Campaign } from "../Campaign";
import type { Flashcard } from "../FlashCard";
import type { Plan } from "../Plan";
import type { PointOfInterest } from "../PointOfInterest";
import type { Scenario } from "../Scenario";
import { Roles, type User } from "../User";

/* MOCKS D'ENTITES DE BASE */
const entity = {
  hasId: () => true,
  recover: jest.fn(),
  reload: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
  save: jest.fn(),
};

/* MOCKS SANS RÉFÉRENCE CIRCULAIRE */

const mockUser: User = {
  ...entity,
  id: 1,
  mail: "vcode@spamland.com",
  name: "VCode",
  hashedPassword: "",
  roles: [Roles.USER],
  readScenarios: [],
  campaigns: [],
  campaignsToLead: [],
};

const mockScenario: Scenario = {
  ...entity,
  id: 1,
  title: "Le loup qui avait un nouvel ami",
  teaser:
    "Les joueurs font face à la disparition brutale d'un employé de pharmacie",
  fullStory: "De la drogue! Des coups de feu! Des pizzas !",
  credits: "C'est Missy qui nous l'a sorti celui-là",
  plans: [],
  flashcards: [],
  readers: [],
  campaigns: [],
};

const mockCampaign: Campaign = {
  ...entity,
  id: 1,
  title: "Donjons et Dragons - Promis c'est juste un one-shot !",
  storyteller: mockUser,
  players: [mockUser],
  scenarios: [mockScenario],
};

const mockPlan: Plan = {
  ...entity,
  id: 1,
  pictureUrl: "https://example.com/map.jpg",
  scenario: mockScenario,
  pointsOfInterest: [],
};

const mockPoi: PointOfInterest = {
  ...entity,
  id: 1,
  code: "001",
  plan: mockPlan,
};

const mockFlashcard: Flashcard = {
  ...entity,
  id: 1,
  title: "Chester",
  type: "",
  scenario: mockScenario,
};

const mockDndNpcCard: Flashcard = {
  ...entity,
  id: 1,
  title: "Gobelin",
  type: "DndNpcCard",
  scenario: mockScenario,
  data: {
    species: "goblin",
    size: "S",
    alignment: "CE",
    armorClass: 1,
    health: "1d10",
    speed: "9",
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
    skills: "Arcana: 1",
    senses: "Night Vision",
    languages: "Common, Goblin",
    dangerLevel: 1,
    behaviour: "Thrusts his pointy stick in whoever breathes",
    actions: "cf behaviour",
  },
};

/* AJOUT DES LIENS (relations croisées) */
mockScenario.plans = [mockPlan];
mockScenario.flashcards = [mockFlashcard, mockDndNpcCard];
mockScenario.campaigns = [mockCampaign];
mockScenario.readers = [mockUser];

mockUser.readScenarios = [mockScenario];
mockUser.campaigns = [mockCampaign];
mockUser.campaignsToLead = [mockCampaign];

mockPlan.pointsOfInterest = [mockPoi];

/* EXPORT FINAL */
export {
  mockUser,
  mockScenario,
  mockCampaign,
  mockPlan,
  mockPoi,
  mockFlashcard,
  mockDndNpcCard,
};
