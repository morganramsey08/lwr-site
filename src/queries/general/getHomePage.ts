import gql from "graphql-tag";

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
        # Hero Section
        heroTitle
        heroSubTitle
        heroButtonText
        heroButtonUrl
        
        # About Section
        title
        content
        buttonLabel
        aboutImage {
          node {
            sourceUrl
            altText
          }
        }

        # Sanctuary Section
        sanctuaryTitle
        sanctuarySubtitle
        address
        phone
        email
        hours
      }
    }
  }
`;