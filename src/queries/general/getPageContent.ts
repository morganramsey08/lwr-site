export const PageContentQuery = `
  query GetPageContent($id: ID!, $idType: PageIdType = URI) {
    page(id: $id, idType: $idType) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export const MembershipsPageQuery = `
  query GetMembershipsContent($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;