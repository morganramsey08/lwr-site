export const GetNewsletterSettings = `
  query GetNewsletterSettings {
    page(id: "14", idType: DATABASE_ID) {
      globalSettings {
        newsletterTitle
        newsletterSubtitle
        newsletterButtonText
        newsletterBackground {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;