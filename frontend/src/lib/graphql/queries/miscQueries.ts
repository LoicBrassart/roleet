import { gql } from "@apollo/client";

export const GET_STATS = gql`
  query getStats {
    stats: getStats {
      campaigns
      flashcards
      plans
      scenarios
      users
    }
  }
`;

export const EDIT_NOTES = gql`
  mutation EditNotes($noteId: String!, $content: String!) {
    editNotes(noteId: $noteId, content: $content) {
      id
    }
  }
`;
