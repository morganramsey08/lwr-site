import gql from "graphql-tag";

export const HomeHeroQuery = gql`
  query HomeHeroQuery($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      title
      featuredImage {
        node { sourceUrl }
      }
      homePage {
        # Hero Fields
        heroTitle
        heroSubTitle
        heroButtonText
        # About Section Fields (from your JSON)
        title
        content
        buttonLabel
      }
    }
  }
`;