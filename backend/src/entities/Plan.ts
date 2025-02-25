import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PointOfInterest } from "./PointOfInterest";
import { Scenario } from "./Scenario";

@Entity()
@ObjectType()
export class Plan extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  pictureUrl!: string;

  @Field((_type) => [PointOfInterest])
  @OneToMany(
    (_type) => PointOfInterest,
    (poi) => poi.plan,
    {
      cascade: true,
    },
  )
  pointsOfInterest: PointOfInterest[];

  @Field((_type) => Scenario)
  @ManyToOne(
    (_type) => Scenario,
    (scenario) => scenario.plans,
  )
  scenario!: Scenario;
}
