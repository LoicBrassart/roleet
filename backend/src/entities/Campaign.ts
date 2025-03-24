import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scenario } from "./Scenario";
import { User } from "./User";

@Entity()
@ObjectType()
export class Campaign extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field()
  @Column({ length: 64 })
  title!: string;

  @Field()
  @Column({ default: "banner.webp" })
  bannerUrl!: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.ownedCampaigns,
    { onDelete: "CASCADE" },
  )
  owner!: User;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.campaignsToLead,
    {
      onDelete: "SET NULL",
      nullable: true,
    },
  )
  storyteller!: User;

  @Field(() => [User])
  @ManyToMany(
    () => User,
    (user) => user.campaignsToPlay,
  )
  @JoinTable({ name: "campaignPlayers" })
  players!: User[];

  @Field((_type) => [Scenario], { nullable: false })
  @ManyToMany(
    (_type) => Scenario,
    (scenario) => scenario.campaigns,
  )
  @JoinTable({ name: "campaignScenarios" })
  scenarios: Scenario[];
}
