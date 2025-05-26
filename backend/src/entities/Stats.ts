import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Stats {
  @Field()
  campaigns!: number;
  @Field()
  flashcards!: number;
  @Field()
  plans!: number;
  @Field()
  scenarios!: number;
  @Field()
  users!: number;
}
