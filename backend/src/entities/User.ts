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
import { Plan } from "./Plan";
import { PointOfInterest } from "./PointOfInterest";
import { Scenario } from "./Scenario";

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

registerEnumType(Roles, {
  name: "Roles",
  description: "Roles for users in this app",
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field()
  @Column({ unique: true })
  mail: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field(() => [Roles])
  @Column({ type: "enum", enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

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
    { cascade: true },
  )
  ownedScenarios: Scenario[];

  @Field(() => [Plan])
  @OneToMany(
    () => Plan,
    (plan) => plan.owner,
    { cascade: true },
  )
  ownedPlans: Plan[];

  @Field(() => [PointOfInterest])
  @OneToMany(
    () => PointOfInterest,
    (poi) => poi.owner,
    { cascade: true },
  )
  ownedPointsOfInterest: PointOfInterest[];

  @Field(() => [Flashcard])
  @OneToMany(
    () => Flashcard,
    (flashcard) => flashcard.owner,
    { cascade: true },
  )
  ownedFlashcards: Flashcard[];

  @Field(() => [Campaign])
  @OneToMany(
    () => Campaign,
    (campaign) => campaign.owner,
    { cascade: true },
  )
  ownedCampaigns: Campaign[];
}
