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

export const GETALLUSERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      roles
    }
  }
`;

export const GETALLSCENARIOS = gql`
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

export const GETSCENARIO = gql`
  query GetScenario($id: Float!) {
    getScenario(id: $id) {
      id
      bannerUrl
      credits
      fullStory
      teaser
      title
      flashcards {
        ... on Flashcard {
          id
          title
          description
          type
        }
        ... on DnDnpcCard {
          id
          title
          description
          type
          species
          dangerLevel
          health
          actions
          size
          alignment
          strength
          dexterity
          constitution
          intelligence
          wisdom
          charisma
          armorClass
          speed
          skills
          senses
          languages
          behaviour
        }
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

export const UNSEALSCENARIO = gql`
  mutation unsealScenario($unsealScenarioId: Float!) {
    unsealScenario(id: $unsealScenarioId)
  }
`;
