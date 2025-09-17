import { gql } from "@apollo/client";

export const GET_TYPES = gql`
  query getTypes($getMessagesByCampaignId: String!) {
    messages: getMessagesByCampaign(id: $getMessagesByCampaignId) {
      id
      content
      createdAt
      owner {
        id
        name
      }
      campaign {
        id
        title
      }
    }
  }
`;
