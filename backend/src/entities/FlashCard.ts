import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Scenario } from "./Scenario";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
@ObjectType()
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

  @Field((_type) => Scenario)
  @ManyToOne(
    (_type) => Scenario,
    (scenario) => scenario.flashcards,
  )
  scenario!: Scenario;
}

@ChildEntity()
@ObjectType()
export class MonsterCard extends Flashcard {
  @Field()
  @Column()
  species!: string;

  @Field()
  @Column()
  dangerLevel!: number;
}

@ChildEntity()
@ObjectType()
export class NPCCard extends Flashcard {
  @Field()
  @Column()
  species!: string;

  @Field()
  @Column()
  dangerLevel!: number;
}
