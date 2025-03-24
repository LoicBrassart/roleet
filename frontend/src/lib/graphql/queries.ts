import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($data: NewUserInput!) {
    signup(data: $data)
  }
`;

export const LOGIN = gql`
  mutation login($data: UserInput!) {
    login(data: $data)
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      roles
    }
  }
`;

export const GET_ALL_SCENARIOS = gql`
  query getAllScenarios {
    getAllScenarios {
      id
      title
      teaser
      bannerUrl
      credits
    }
  }
`;

export const GET_MY_SCENARIOS = gql`
  query getMyScenarios {
    getMyScenarios {
      id
      title
      teaser
      bannerUrl
      credits
    }
  }
`;

export const GET_SCENARIO = gql`
  query GetScenario($id: String!) {
    getScenario(id: $id) {
      id
      bannerUrl
      credits
      fullStory
      teaser
      title
      flashcards {
        id
        title
        description
        type
        data
      }
      plans {
        id
        title
        description
        pictureUrl
        pointsOfInterest {
          id
          code
          title
          description
        }
      }
    }
  }
`;

export const UNSEAL_SCENARIO = gql`
  mutation unsealScenario($unsealScenarioId: String!) {
    unsealScenario(id: $unsealScenarioId)
  }
`;

export const GET_MY_CAMPAIGNS = gql`
  query getMyCampaigns {
    getMyCampaigns {
      id
      bannerUrl
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
      title
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

export const CREATE_SCENARIO = gql`
  mutation createScenario($data: NewScenarioInput!) {
    createScenario(data: $data) {
      id
      title
      teaser
      fullStory
      bannerUrl
      credits
    }
  }
`;
