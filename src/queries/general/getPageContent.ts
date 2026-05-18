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
  query GetMembershipsContent($id: ID!, $parentId: ID!) {
    # Get the text content
    page(id: $id, idType: DATABASE_ID) {
      title
      content
    }
    # Get the images associated with this page ID
    mediaItems(where: { parent: $parentId }, first: 1) {
      nodes {
        sourceUrl
      }
    }
  }
`;