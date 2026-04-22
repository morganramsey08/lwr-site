import gql from "graphql-tag";

// Change $idType: PageIdTypeEnum to $idType: PageIdType
export const HomeHeroQuery = gql`
  query HomeHeroQuery($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      homePage {
        heroTitle
        heroSubTitle
        heroButtonText
      }
    }
  }
`;