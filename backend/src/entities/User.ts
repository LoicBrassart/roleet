import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { Scenario } from "./Scenario";

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}
registerEnumType(Roles, {
  name: "Roles",
  description: "Roles for users in this app",
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  mail: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field(() => [Roles])
  @Column({ type: "enum", enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  @Field((_type) => [Scenario], { nullable: false })
  @ManyToMany(
    (_type) => Scenario,
    (scenario) => scenario.readers,
  )
  @JoinTable({ name: "scenarioSeals" })
  readScenarios: Scenario[];

  @Field((_type) => [Campaign], { nullable: false })
  @ManyToMany(
    (_type) => Campaign,
    (campaign) => campaign.players,
  )
  campaigns: Campaign[];

  @Field((_type) => [Campaign], { nullable: false })
  @OneToMany(
    (_type) => Campaign,
    (campaignsToLead) => campaignsToLead.storyteller,
    {
      cascade: true,
    },
  )
  campaignsToLead: Campaign[];
}
