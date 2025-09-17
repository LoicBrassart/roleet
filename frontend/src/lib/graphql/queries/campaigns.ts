import { gql } from "@apollo/client";

export const GET_MY_CAMPAIGNS = gql`
  query getMyCampaigns {
    getMyCampaigns {
      id
      bannerUrl
      title
      storyteller {
        id
        name
      }
      scenarios {
        id
        title
      }
      players {
        id
        name
      }
      sessions {
        id
        location
        programmedAt
        summary
      }
    }
  }
`;

export const GET_CAMPAIGN = gql`
  query getCampaign($id: String!) {
    getCampaign(id: $id) {
      id
      bannerUrl
      title
      storyteller {
        id
        name
      }
      scenarios {
        id
        title
      }
      players {
        id
        name
      }
      messages {
        id
        content
        createdAt
      }
      sessions {
        id
        location
        programmedAt
        summary
      }
    }
  }
`;

export const CREATE_CAMPAIGN = gql`
  mutation createCampaign($data: NewCampaignInput!) {
    createCampaign(data: $data) {
      id
      bannerUrl
      title
    }
  }
`;

export const GET_CAMPAIGN_AND_NOTES = gql`
  query getCampaignAndNotes($campaignId: String!) {
    getCampaign(id: $campaignId) {
      id
      bannerUrl
      title
      storyteller {
        id
        name
      }
      scenarios {
        id
        title
      }
      players {
        id
        name
      }
      sessions {
        id
        location
        programmedAt
        summary
      }
    }
    getNotes(campaignId: $campaignId) {
      id
      content
    }
    getMessagesByCampaign(id: $campaignId) {
      id
      content
      createdAt
      owner {
        id
        name
      }
    }
  }
`;
