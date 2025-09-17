import { gql } from "@apollo/client";

export const CREATE_POI = gql`
  mutation createPointOfInterest($data: NewPointOfInterestInput!) {
    createPointOfInterest(data: $data) {
      id
    }
  }
`;

export const UPDATE_POI = gql`
  mutation updatePointOfInterest($id: String!, $data: PointOfInterestInput!) {
    updatePointOfInterest(id: $id, data: $data) {
      id
    }
  }
`;
