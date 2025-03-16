import { GraphQLJSON } from 'graphql-scalars';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Scenario } from './Scenario';
import { User } from './User';

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

  @Field((_type) => User)
  @ManyToOne((_type) => User, (storyteller) => storyteller.ownedScenarios)
  owner!: User;

  @Field(() => Scenario)
  @ManyToOne(() => Scenario, (scenario) => scenario.flashcards)
  scenario!: Scenario;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column('jsonb', { nullable: true })
  data?: Record<string, string | number>;
}
