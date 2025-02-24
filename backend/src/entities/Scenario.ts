import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FlashcardUnion } from "../types/FlashcardUnion";
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

  @Field((_type) => [Plan])
  @OneToMany(
    (_type) => Plan,
    (plan) => plan.scenario,
    {
      cascade: true,
    },
  )
  plans!: Plan[];

  // @Field(() => [Flashcard])
  // @OneToMany(
  //   () => Flashcard,
  //   (flashcard) => flashcard.scenario,
  // )
  // flashcards!: Flashcard[];

  @Field(() => [FlashcardUnion])
  @OneToMany(
    () => Flashcard,
    (flashcard) => flashcard.scenario,
  )
  flashcards!: (typeof FlashcardUnion)[];

  @Field((_type) => User)
  @ManyToMany(
    (_type) => User,
    (user) => user.readScenarios,
  )
  readers: User[];
}
