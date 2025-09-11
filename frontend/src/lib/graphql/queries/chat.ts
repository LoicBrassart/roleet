import { gql } from "@apollo/client";

export const GET_MESSAGES_BY_CAMPAIGN = gql`
  query getMessagesByCampaign($campaignId: String!) {
    messages: getMessagesByCampaign(id: $campaignId) {
      id
      content
      createdAt
      owner {
        id
      }
      campaign {
        id
      }
    }
  }
`;
