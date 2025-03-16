import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Scenario } from './Scenario';
import { User } from './User';

@Entity()
@ObjectType()
export class Campaign extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ defaultValue: '' })
  @Column({ default: '' })
  bannerUrl: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (storyteller) => storyteller.ownedCampaigns)
  owner!: User;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (storyteller) => storyteller.campaignsToLead)
  storyteller!: User;

  @Field((_type) => [User], { nullable: false })
  @ManyToMany((_type) => User, (user) => user.campaigns)
  @JoinTable({ name: 'campaignPlayers' })
  players: User[];

  @Field((_type) => [Scenario], { nullable: false })
  @ManyToMany((_type) => Scenario, (scenario) => scenario.campaigns)
  @JoinTable({ name: 'campaignScenarios' })
  scenarios: Scenario[];
}
