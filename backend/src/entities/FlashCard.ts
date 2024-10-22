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

  @Field(() => Scenario)
  @ManyToOne(
    () => Scenario,
    (scenario) => scenario.flashcards,
  )
  scenario!: Scenario;
}

@ChildEntity()
@ObjectType()
export class DnDnpcCard extends Flashcard {
  @Field()
  @Column()
  species!: string;

  @Field()
  @Column()
  size!: string;

  @Field()
  @Column()
  alignment!: string;

  @Field()
  @Column()
  armorClass!: number;

  @Field()
  @Column()
  health!: string;

  @Field()
  @Column()
  speed!: string;

  @Field()
  @Column()
  strength!: number;

  @Field()
  @Column()
  dexterity!: number;

  @Field()
  @Column()
  constitution!: number;

  @Field()
  @Column()
  intelligence!: number;

  @Field()
  @Column()
  wisdom!: number;

  @Field()
  @Column()
  charisma!: number;

  @Field()
  @Column()
  skills!: string;

  @Field()
  @Column()
  senses!: string;

  @Field()
  @Column()
  languages!: string;

  @Field()
  @Column()
  dangerLevel!: number;

  @Field()
  @Column()
  behaviour!: string;

  @Field()
  @Column()
  actions!: string;
}
