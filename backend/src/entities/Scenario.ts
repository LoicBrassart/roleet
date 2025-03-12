import { Field, ID, ObjectType } from "type-graphql";
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
import { User } from "./User";

@Entity()
@ObjectType()
export class Scenario extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  teaser!: string;

  @Field()
  @Column()
  fullStory!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrl?: string;

  @Field()
  @Column()
  credits!: string;

  @Field((_type) => [Plan], { nullable: false })
  @OneToMany(
    (_type) => Plan,
    (plan) => plan.scenario,
    {
      cascade: true,
    },
  )
  plans: Plan[];

  @Field(() => [Flashcard], { nullable: false })
  @OneToMany(
    () => Flashcard,
    (flashcard) => flashcard.scenario,
  )
  flashcards: Flashcard[];

  @Field((_type) => [User], { nullable: false })
  @ManyToMany(
    (_type) => User,
    (user) => user.readScenarios,
  )
  readers: User[];

  @Field((_type) => [Campaign], { nullable: false })
  @ManyToMany(
    (_type) => Campaign,
    (campaign) => campaign.scenarios,
  )
  campaigns: Campaign[];
}
