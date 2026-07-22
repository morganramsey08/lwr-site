import { fetchGraphQL } from "@/utils/fetchGraphQL";
import s from "./specialEvents.module.scss";
import Link from "next/link";

export default async function SpecialEventsPage() {
  // 1. Fetch all events using only the camelCase field name in GraphQL
  const data = await fetchGraphQL(`
    query GetSpecialEvents {
      events(where: { orderby: { field: DATE, order: ASC } }, first: 100) {
        nodes {
          title
          slug
          uri
          featuredImage {
            node {
              sourceUrl
            }
          }
          eventDetails {
            isSpecialEvent
          }
        }
      }
    }
  `);

  const allEvents = data?.events?.nodes || [];

  // 2. Filter programmatically for special events
  const events = allEvents.filter((event: any) => {
    const details = event.eventDetails;
    if (!details) return false;
    return details.isSpecialEvent === true || details.isSpecialEvent === "1";
  });

  return (
    <div className={s.pageWrapper}>
      <h1>Special Offerings & Events</h1>
      <div className={s.eventGrid}>
        {events.length === 0 ? (
          <p>No special events currently scheduled. Check back soon!</p>
        ) : (
          events.map((event: any, index: number) => (
            <div key={index} className={s.eventCard}>
              {event.featuredImage?.node?.sourceUrl && (
                <img src={event.featuredImage.node.sourceUrl} alt={event.title} />
              )}
              <h3>{event.title}</h3>
              <Link href={`/offerings/${event.slug}`} className={s.registerBtn}>
                View & Register
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}