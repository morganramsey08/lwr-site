import gql from "graphql-tag";

export const GetSpecialEventsQuery = gql`
  query GetSpecialEventsQuery($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      title
      content
      featuredImage {
        node {
            sourceUrl
        }
      }
      homePage {
        heroTitle
        heroSubTitle
        heroButtonText
        heroButtonUrl
      }
    }
    events(
      where: { 
        orderby: { field: DATE, order: ASC },
        metaQuery: { key: "is_special_event", value: "true", compare: EQUALS }
      }, 
      first: 100
    ) {
      nodes {
        title
        excerpt
        slug
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        eventDetails {
          eventDate
          eventCategory
          capacityText
          startTime
          endTime
          repeatType
          repeatUntil
        }
      }
    }
  }
`;