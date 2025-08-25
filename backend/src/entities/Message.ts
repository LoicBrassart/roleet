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
export class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  // @Field()
  // @Column()
  // channel: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.ownedMessages,
    {
      onDelete: "CASCADE",
    },
  )
  owner: User;

  @Field(() => Campaign)
  @ManyToOne(
    () => Campaign,
    (campaign) => campaign.messages,
    {
      onDelete: "CASCADE",
    },
  )
  campaign: Campaign;
}
