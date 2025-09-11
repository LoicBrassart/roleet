import { gql } from "@apollo/client";

export const CREATE_PLAN = gql`
  mutation createPlan($data: NewPlanInput!) {
    createPlan(data: $data) {
      id
    }
  }
`;

export const UPDATE_PLAN = gql`
  mutation updatePlan($id: String!, $data: PlanInput!) {
    updatePlan(id: $id, data: $data) {
      id
    }
  }
`;

export const GET_PLAN = gql`
  query getPlan($id: String!) {
    getPlan(id: $id) {
      id
      title
      description
      pictureUrl
      owner {
        id
      }
      pointsOfInterest {
        id
        code
        title
        description
      }
      scenario {
        id
        bannerUrl
        credits
        fullStory
        teaser
        title
      }
    }
  }
`;
