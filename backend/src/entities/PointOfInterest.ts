import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Plan } from "./Plan";

@Entity()
@ObjectType()
export class PointOfInterest extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  code!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field((_type) => Plan)
  @ManyToOne(
    (_type) => Plan,
    (plan) => plan.pointsOfInterest,
  )
  plan!: Plan;
}
