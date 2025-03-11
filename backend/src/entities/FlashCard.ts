import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scenario } from "./Scenario";
import { GraphQLJSON } from "graphql-scalars";

@ObjectType()
@Entity()
export class Flashcard extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => String)
  @Column()
  type!: string;

  @Field(() => Scenario)
  @ManyToOne(
    () => Scenario,
    (scenario) => scenario.flashcards,
  )
  scenario!: Scenario;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column("jsonb", { nullable: true })
  data?: Record<string, string | number>;
}
