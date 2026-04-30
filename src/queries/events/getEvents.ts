import gql from "graphql-tag";

export const GetEventsQuery = gql`
  query GetEventsQuery {
    events(first: 100) {
      nodes {
        id
        title
        slug
        eventDetails {
          eventDate      # e.g., 2026-03-12
          startTime
          endTime
          shortDescription
        }
      }
    }
  }
`;