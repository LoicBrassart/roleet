import type { GetTypesQuery } from "./generated/graphql-types";
import type { CreateInput, FlattenIds, Prettify, RemoveRels } from "./helpers";

export namespace Entities {
  export type MessageFull = GetTypesQuery["messages"][number];
  export type Message = Prettify<FlattenIds<MessageFull>>;
  export type MessageShort = Prettify<RemoveRels<MessageFull>>;
  export type MessageCreateInput = Prettify<CreateInput<Message>>;

  /** Temporary type to remove the `campaign` field until we fix the API */
  export type MessageCampaign = Omit<MessageFull, "campaign">;
  /**
   * To fix diverging types between backend and frontend
   * @see [Campaign.tsx#L73](https://github.com/Forthtilliath/roleet/blob/v0-reduce-scope/frontend/src/pages/Campaign.tsx#L73)
   * */
  export type MessageChat = MessageCampaign | MessageFull;
}
