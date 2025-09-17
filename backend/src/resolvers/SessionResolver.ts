import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { Session } from "../entities/Session";
import { handleDatabaseError } from "../lib/helpers/handleDatabaseError";

@InputType()
class NewSessionInput implements Partial<Session> {
  @Field()
  summary: string;

  @Field()
  location: string;

  @Field()
  programmedAt: Date;
}

@InputType()
class SessionInput implements Partial<Session> {
  @Field()
  summary: string;

  @Field()
  location: string;

  @Field()
  programmedAt: Date;
}

@Resolver(Session)
class SessionResolver {
  @Authorized()
  @Mutation(() => Session)
  async editSession(
    @Arg("sessionId") sessionId: string,
    @Arg("data") data: SessionInput,
  ) {
    return Session.update(
      {
        id: sessionId,
      },
      data,
    ).then(() => Session.findOneByOrFail({ id: sessionId }));
  }

  @Mutation(() => Session)
  createSession(
    @Arg("campaignId") campaignId: string,
    @Arg("data") sessionData: NewSessionInput,
  ) {
    return Session.create({
      ...sessionData,
      campaign: { id: campaignId },
    })
      .save()
      .catch(handleDatabaseError("Failed to create session"));
  }

  @Mutation(() => Boolean)
  deleteSession(@Arg("id") id: string) {
    return Session.delete(id)
      .then((result) => result.affected === 1)
      .catch(handleDatabaseError("Failed to delete session"));
  }
}

export default SessionResolver;
