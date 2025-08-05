import type { MixedList } from "typeorm";
import { Campaign } from "./Campaign";
import { Flashcard } from "./FlashCard";
import { Message } from "./Message";
import { Note } from "./Note";
import { Plan } from "./Plan";
import { PointOfInterest } from "./PointOfInterest";
import { Scenario } from "./Scenario";
import { User } from "./User";

// biome-ignore lint/complexity/noBannedTypes: Using same type as TypeORM library
const entities: MixedList<Function> = [
  Campaign,
  Flashcard,
  Message,
  Plan,
  PointOfInterest,
  Scenario,
  User,
  Note,
];
export default entities;
