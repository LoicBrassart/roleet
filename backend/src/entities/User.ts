import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { Flashcard } from "./FlashCard";
import { Message } from "./Message";
import { Note } from "./Note";
import { Plan } from "./Plan";
import { PointOfInterest } from "./PointOfInterest";
import { Scenario } from "./Scenario";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

registerEnumType(Role, {
  name: "Roles",
  description: "Roles for users in this app",
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column({ unique: true })
  mail: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field(() => [Role])
  @Column({ type: "enum", enum: Role, array: true, default: [Role.USER] })
  roles: Role[];

  @Field(() => [Scenario])
  @ManyToMany(
    () => Scenario,
    (scenario) => scenario.readers,
  )
  readScenarios: Scenario[];

  @Field(() => [Campaign])
  @ManyToMany(
    () => Campaign,
    (campaign) => campaign.players,
  )
  campaignsToPlay: Campaign[];

  @Field(() => [Campaign])
  @OneToMany(
    () => Campaign,
    (campaignsToLead) => campaignsToLead.storyteller,
  )
  campaignsToLead: Campaign[];

  @Field(() => [Scenario])
  @OneToMany(
    () => Scenario,
    (scenario) => scenario.owner,
    {
      onDelete: "CASCADE",
    },
  )
  ownedScenarios: Scenario[];

  @Field(() => [Plan])
  @OneToMany(
    () => Plan,
    (plan) => plan.owner,
    {
      onDelete: "CASCADE",
    },
  )
  ownedPlans: Plan[];

  @Field(() => [PointOfInterest])
  @OneToMany(
    () => PointOfInterest,
    (poi) => poi.owner,
    {
      onDelete: "CASCADE",
    },
  )
  ownedPointsOfInterest: PointOfInterest[];

  @Field(() => [Flashcard])
  @OneToMany(
    () => Flashcard,
    (flashcard) => flashcard.owner,
    {
      onDelete: "CASCADE",
    },
  )
  ownedFlashcards: Flashcard[];

  @Field(() => [Campaign])
  @OneToMany(
    () => Campaign,
    (campaign) => campaign.owner,
    {
      onDelete: "CASCADE",
    },
  )
  ownedCampaigns: Campaign[];

  @Field(() => [Message])
  @OneToMany(
    () => Message,
    (message) => message.owner,
    {
      onDelete: "CASCADE",
    },
  )
  ownedMessages: Message[];

  @Field(() => [Note])
  @OneToMany(
    () => Note,
    (note) => note.owner,
    {
      onDelete: "CASCADE",
    },
  )
  ownedNotes: Note[];
}
