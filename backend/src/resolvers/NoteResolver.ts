import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Campaign } from "../entities/Campaign";
import { Note } from "../entities/Note";
import type { AuthContext } from "../types/ApolloContext";

@Resolver(Note)
class NoteResolver {
  @Authorized()
  @Query(() => Note)
  async getNotes(
    @Arg("campaignId") campaignId: string,
    @Ctx() ctx: AuthContext,
  ) {
    let note = await Note.findOne({
      relations: ["owner", "campaign"],
      where: {
        campaign: { id: campaignId },
        owner: { id: ctx.user.id },
      },
    });
    if (!note) {
      note = await Note.create({
        owner: ctx.user,
        campaign: await Campaign.findOneByOrFail({ id: campaignId }),
        content: "",
      });
      await note.save();
    }
    return note;
  }

  @Authorized()
  @Mutation(() => Note)
  async editNotes(
    @Arg("noteId") noteId: string,
    @Arg("content") content: string,
    @Ctx() ctx: AuthContext,
  ) {
    return Note.update(
      {
        id: noteId,
        owner: { id: ctx.user.id },
      },
      { content },
    ).then(() => Note.findOneByOrFail({ id: noteId }));
  }
}

export default NoteResolver;
