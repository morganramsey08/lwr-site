export const AboutPageQuery = `
  query AboutPageQuery($id: ID!, $idType: PageIdType!) {
    page(id: $id, idType: $idType) {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      aboutPage {
        heroTitle
        heroSubtitle
        heroButtonText
        heroButtonLink
        missionTitle
        missionSection
        valueOneTitle
        valueOneText
        valueOneIcon
        valueTwoTitle
        valueTwoText
        valueTwoIcon
        valueThreeTitle
        valueThreeText
        valueThreeIcon
        introTitle
        introText
        introImage {
          node {
            sourceUrl
          }
        }
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