import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { User } from "./User";

@Entity()
@ObjectType()
export class Note extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.ownedNotes,
    { onDelete: "CASCADE" },
  )
  owner!: User;

  @Field(() => Campaign)
  @ManyToOne(
    () => Campaign,
    (campaign) => campaign.notes,
    {
      onDelete: "CASCADE",
    },
  )
  campaign: Campaign;

  @Field()
  @Column()
  content: string;
}
