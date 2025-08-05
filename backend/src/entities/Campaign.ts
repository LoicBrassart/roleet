import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";
import { Note } from "./Note";
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

  @Field(() => [Message])
  @OneToMany(
    () => Message,
    (msg) => msg.campaign,
    { cascade: true },
  )
  messages!: Message[];

  @Field(() => [Note])
  @OneToMany(
    () => Note,
    (note) => note.campaign,
    {
      onDelete: "CASCADE",
    },
  )
  notes: Note[];

  /* Sessions
  - date
  - campaignId
  - resume
  */

  /* Documents - plus tard ?
  - title
  - url
  - visibility
  */
  /* Contacts - plus tard ?
   */
  /* Sheets - plus tard
   */
}
