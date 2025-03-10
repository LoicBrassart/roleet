import { Campaign } from "../Campaign";
import { DnDnpcCard, Flashcard } from "../FlashCard";
import { Plan } from "../Plan";
import { PointOfInterest } from "../PointOfInterest";
import { Scenario } from "../Scenario";
import { Roles, User } from "../User";

const entity = {
  hasId: () => true,
  recover: jest.fn(),
  reload: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
  save: jest.fn(),
};

export const mockScenario = {
  ...entity,
  id: 1,
  title: "Le loup qui avait un nouvel ami",
  teaser:
    "Les joueurs font face à la disparition brutale d'un employé de pharmacie",
  fullStory: "De la drogue! Des coups de feu! Des pizzas !",
  credits: "C'est Missy qui nous l'a sorti celiu là",
  plans: [],
  flashcards: [],
  readers: [],
  campaigns: [],
} as Scenario;

export const mockPlan = {
  ...entity,
  id: 1,
  pictureUrl: "https://example.com/map.jpg",
  pointsOfInterest: [mockPoi],
  scenario: mockScenario,
} as Plan;

export const mockPoi = {
  ...entity,
  id: 1,
  code: "001",
  plan: mockPlan,
} as PointOfInterest;

export const mockUser = {
  ...entity,
  id: 1,
  mail: "vcode@spamland.com",
  name: "VCode",
  hashedPassword: "",
  roles: [Roles.USER],
  readScenarios: [mockScenario],
  campaigns: [mockCampaign],
  campaignsToLead: [mockCampaign],
} as User;

export const mockCampaign = {
  ...entity,
  id: 1,
  title: "Donjons et Dragons - Promis c'est juste un one-shot !",
  storyteller: mockUser,
  players: [mockUser],
  scenarios: [mockScenario],
} as Campaign;

export const mockFlashcard = {
  ...entity,
  id: 1,
  title: "Chester",
  type: "",
  scenario: mockScenario,
} as Flashcard;

export const mockDndNpcCard = {
  ...entity,
  id: 1,
  title: "Gobelin",
  type: "humanoide",
  scenario: mockScenario,
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
} as DnDnpcCard;
