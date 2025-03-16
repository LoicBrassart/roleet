import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campaign } from './Campaign';
import { Scenario } from './Scenario';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Roles for users in this app',
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

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
  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  @Field(() => [Scenario], { nullable: false })
  @ManyToMany(() => Scenario, (scenario) => scenario.readers)
  @JoinTable({ name: 'scenarioSeals' })
  readScenarios: Scenario[];

  @Field(() => [Campaign], { nullable: false })
  @ManyToMany(() => Campaign, (campaign) => campaign.players)
  campaigns: Campaign[];

  @Field(() => [Campaign], { nullable: false })
  @OneToMany(() => Campaign, (campaignsToLead) => campaignsToLead.storyteller, {
    cascade: true,
  })
  campaignsToLead: Campaign[];

  @Field(() => [Scenario], { nullable: false })
  @OneToMany(() => Scenario, (scenario) => scenario.owner, { cascade: true })
  ownedScenarios: Scenario[];
}
