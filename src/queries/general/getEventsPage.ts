import gql from "graphql-tag";

export const EventsPageQuery = gql`

  query EventsPageQuery($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      title
      content
      featuredImage {
        node {
            sourceUrl
        }
      }
      # Assuming you added Hero fields to the Events page too
      homePage {
        heroTitle
        heroSubTitle
        heroButtonText
        heroButtonUrl
      }
    }
    events(where: { orderby: { field: DATE, order: ASC } }, first: 100) {
      nodes {
        title
        excerpt
        slug
        eventDetails {
          eventDate
          eventCategory
          capacityText
        }
      }
    }
  }
`;