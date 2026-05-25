export const HealingHandsPageQuery = `
  query GetHealingHandsAndPageData {
    page(id: "healing-hands", idType: URI) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    healingHandsPractitioners(where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        # This matches the "GraphQL Type Name" from your ACF settings screenshot
        healingHandsPractitioners { 
          practitionerTitle
          socialMediaInstagram
          socialMediaFacebook
        }
      }
    }
  }
`;