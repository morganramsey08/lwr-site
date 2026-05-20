export const TeachersPageQuery = `
  query GetTeachersAndPageData {
    # 1. Fetch the parent page metadata for the Hero Background
    page(id: "99", idType: DATABASE_ID) {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    teachers(first: 100) {
      nodes {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        teachers { 
          teacherTitle
          socialMediaInstagram
          socialMediaFacebook
        }
      }
    }
  }
`;