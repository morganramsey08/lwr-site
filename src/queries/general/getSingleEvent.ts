export const GetSingleEventQuery = `
  query GetSingleEventBySlug($id: ID!) {
    event(id: $id, idType: SLUG) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventDetails {
        eventDate
        startTime
        endTime
        shortDescription
        capacityText
        eventCategory
        facilitatorName
        locationName
        price
        bringItems
      }
    }
  }
`;