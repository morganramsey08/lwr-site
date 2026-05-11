export const TeachersPageQuery = `
  query GetTeachers {
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