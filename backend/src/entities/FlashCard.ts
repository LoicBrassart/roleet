import { GraphQLJSON } from "graphql-scalars";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scenario } from "./Scenario";
import { User } from "./User";

@ObjectType()
@Entity()
export class Flashcard extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field()
  @Column({ length: 64 })
  title!: string;

  @Field()
  @Column("text")
  description!: string;

  @Field()
  @Column({ length: 32 })
  type!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ownedFlashcards, {
    onDelete: "CASCADE",
  })
  owner!: User;

  @Field(() => Scenario)
  @ManyToOne(() => Scenario, (scenario) => scenario.flashcards, {
    onDelete: "CASCADE",
  })
  scenario!: Scenario;

  @Field(() => GraphQLJSON)
  @Column("jsonb", { nullable: false, default: {} })
  data!: Record<string, unknown>; // TODO: Find a way to better specify this structure related to type
}
