export const PageContentQuery = `
  query GetPageContent($id: ID!) {
    page(id: $id, idType: URI) {
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