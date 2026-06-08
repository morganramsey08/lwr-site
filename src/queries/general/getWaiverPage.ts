export const GET_WAIVER_PAGE = `
  query GetWaiverPage($uri: String!) {
    pageBy(uri: $uri) {
      content(format: RENDERED)
      title
    }
  }
`;