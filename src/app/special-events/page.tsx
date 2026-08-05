import { fetchGraphQL } from "@/utils/fetchGraphQL";
import s from "./specialEvents.module.scss";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

export default async function SpecialEventsPage() {
  // 1. Fetch all events including eventDate and startTime
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
            eventDate
            startTime
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

  // Helper to reliably format WP dates to UTC string (e.g., "Jun 15, 2026")
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "Date Pending";
    const [datePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={s.pageWrapper}>
      <h1>Special Offerings & Events</h1>
      <div className={s.eventGrid}>
        {events.length === 0 ? (
          <p>No special events currently scheduled. Check back soon!</p>
        ) : (
          events.map((event: any, index: number) => {
            const details = event.eventDetails || {};
            const formattedDate = formatDisplayDate(details.eventDate);
            const timeStr = details.startTime || "";

            return (
              <div key={index} className={s.eventCard}>
                {event.featuredImage?.node?.sourceUrl && (
                  <img src={event.featuredImage.node.sourceUrl} alt={event.title} />
                )}
                <div className={s.cardContent}>
                  <h3>{event.title}</h3>
                  
                  {details.eventDate && (
                    <div className={s.eventMeta}>
                      <span className={s.metaItem}>
                        <Calendar size={14} /> {formattedDate}
                      </span>
                      {timeStr && (
                        <span className={s.metaItem}>
                          <Clock size={14} /> {timeStr}
                        </span>
                      )}
                    </div>
                  )}

                  <Link href={`/offerings/${event.slug}`} className={s.registerBtn}>
                    View & Register
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}