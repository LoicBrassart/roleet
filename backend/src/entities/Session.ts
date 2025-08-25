import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campaign } from "./Campaign";

@Entity()
@ObjectType()
export class Session extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field(() => Campaign)
  @ManyToOne(
    () => Campaign,
    (campaign) => campaign.sessions,
    {
      onDelete: "CASCADE",
    },
  )
  campaign: Campaign;

  @Field()
  @Column()
  summary: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  programmedAt: Date;
}
