import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
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
  @Column("simple-array", { default: Roles.USER })
  roles: Roles[];

  @Field((_type) => Scenario)
  @ManyToMany(
    (_type) => Scenario,
    (scenario) => scenario.readers,
  )
  @JoinTable({ name: "scenarioSeals" })
  readScenarios: Scenario[];
}
