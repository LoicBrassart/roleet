import type { NonEmptyArray } from "type-graphql";
import CampaignResolver from "./CampaignResolver";
import FlashcardResolver from "./FlashcardResolver";
import MessageResolver from "./MessageResolver";
import NoteResolver from "./NoteResolver";
import PlanResolver from "./PlanResolver";
import PointOfInterestResolver from "./PointOfInterestResolver";
import ScenarioResolver from "./ScenarioResolver";
import SessionResolver from "./SessionResolver";
import StatsResolver from "./StatsResolver";
import UserResolver from "./UserResolver";

// biome-ignore lint/complexity/noBannedTypes: Using same type as type-graphql library
const resolvers: NonEmptyArray<Function> = [
  CampaignResolver,
  FlashcardResolver,
  MessageResolver,
  PlanResolver,
  PointOfInterestResolver,
  ScenarioResolver,
  StatsResolver,
  UserResolver,
  NoteResolver,
  SessionResolver,
];
export default resolvers;
