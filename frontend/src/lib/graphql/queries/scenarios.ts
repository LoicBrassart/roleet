import { gql } from "@apollo/client";

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
  query getScenario($id: String!) {
    getScenario(id: $id) {
      id
      bannerUrl
      credits
      fullStory
      teaser
      title
      owner {
        id
      }
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

export const DELETE_SCENARIO = gql`
  mutation deleteScenario($deleteScenarioId: String!) {
    deleteScenario(id: $deleteScenarioId)
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

export const UPDATE_SCENARIO = gql`
  mutation updateScenario($id: String!, $data: ScenarioInput!) {
    updateScenario(id: $id, data: $data) {
      id
      title
      teaser
      fullStory
      bannerUrl
      credits
    }
  }
`;
