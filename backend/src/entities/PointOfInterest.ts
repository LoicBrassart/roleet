import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Plan } from "./Plan";
import { User } from "./User";

@Entity()
@ObjectType()
@Unique(["plan", "code"]) // 👈 Composite key: code must be unique for each plan
export class PointOfInterest extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field()
  @Column({ length: 16 })
  code!: string;

  @Field()
  @Column({ length: 64 })
  title!: string;

  @Field()
  @Column("text")
  description!: string;

  @Field(() => Plan)
  @ManyToOne(
    () => Plan,
    (plan) => plan.pointsOfInterest,
    {
      onDelete: "CASCADE",
    },
  )
  plan!: Plan;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.ownedPointsOfInterest,
    {
      onDelete: "CASCADE",
    },
  )
  owner!: User;
}
