import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { EventsPageQuery } from "@/queries/general/getEventsPage";
import { GetNewsletterSettings } from "@/queries/general/getNewsletter";
import Hero from "@/components/Hero/Hero";
import EventCard from "@/components/Events/EventCard";
import EventsCalendar from "@/components/Events/EventCalendar";
import Newsletter from "@/components/Newsletter/Newsletter";
import styles from "./Events.module.scss";
import CommunityCTA from "@/components/CommunityCTA/CommunityCTA";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

// Helper to reliably parse WP dates to UTC
const parseWPDate = (dateStr: string) => {
  return new Date(dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00Z`);
};

export default async function EventsPage() {
  function getQueryString(query: any): string {
    if (typeof query === 'string') return query;
    return query?.loc?.source?.body || "";
  }

  const data = await fetchGraphQL(getQueryString(EventsPageQuery), {
    id: "97", 
    idType: "DATABASE_ID"
  });

  let newsletterData = null;
  try {
    const newsletterRes = await fetchGraphQL(GetNewsletterSettings);
    newsletterData = newsletterRes?.page?.globalSettings;
  } catch (error) {
    console.error("Newsletter query failed on Events page:", error);
  }

  const page = data?.page;
  const rawEvents = data?.events?.nodes || [];

  // --- NEW LOGIC: Calculate Next Instances & 4-Week Window ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate day comparison
  
  const fourWeeksFromNow = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000);

  const processedEvents = rawEvents.reduce((acc: any[], event: any) => {
    const details = event.eventDetails;
    const startDate = parseWPDate(details.eventDate);
    
    const rawRepeat = Array.isArray(details.repeatType) ? details.repeatType[0] : details.repeatType;
    const isRepeating = rawRepeat && rawRepeat.toLowerCase() !== "none";

    if (!isRepeating) {
      // For single events, just check if they fall in our 4-week window
      if (startDate >= today && startDate <= fourWeeksFromNow) {
        acc.push({ ...event, displayDate: details.eventDate });
      }
    } else {
      // For repeating events, find the NEXT valid occurrence
      const endDate = details.repeatUntil ? parseWPDate(details.repeatUntil) : new Date('2099-01-01');
      
      if (endDate >= today) {
        let nextDate = new Date(startDate);
        
        // Fast-forward to the next upcoming date (assuming weekly repeats)
        while (nextDate < today && nextDate <= endDate) {
          nextDate.setDate(nextDate.getDate() + 7);
        }

        // If that next occurrence is within 4 weeks, add it to the sidebar
        if (nextDate >= today && nextDate <= fourWeeksFromNow && nextDate <= endDate) {
          // Format back to YYYY-MM-DD for the EventCard to consume
          const displayDateStr = nextDate.toISOString().split('T')[0];
          acc.push({ ...event, displayDate: displayDateStr });
        }
      }
    }
    return acc;
  }, []);

  // Sort chronologically based on the newly calculated display dates
  const sortedUpcomingEvents = processedEvents.sort((a, b) => {
    return parseWPDate(a.displayDate).getTime() - parseWPDate(b.displayDate).getTime();
  });

  return (
    <main>
      <Hero 
        title={page?.title || "Upcoming Events"}
        subtitle="Explore our upcoming classes, workshops, and gatherings."
        bgImage={page?.featuredImage?.node?.sourceUrl}
        buttonText={page?.homePage?.heroButtonText || ""} 
        buttonLink={page?.homePage?.heroButtonUrl || "#"}
        isShort
        bgPosition="center"
      />
      
      <div className="container">
        <div className={styles.pageHeader}></div>

        <div className={styles.eventsLayout}>
          <div className={styles.calendarContainer}>
            {/* The calendar still gets the raw events to handle its own complex rendering */}
            <EventsCalendar events={rawEvents} />
          </div>

          <section className={styles.upcomingSection}>
            <h3>Upcoming Offerings</h3>
            {sortedUpcomingEvents.length > 0 ? (
              sortedUpcomingEvents.map((event: any, index: number) => {
                // Pass the calculated 'displayDate' into the card by temporarily overriding eventDate
                const eventForCard = {
                  ...event,
                  eventDetails: { ...event.eventDetails, eventDate: event.displayDate }
                };
                return <EventCard key={`${event.id}-${index}`} event={eventForCard} />;
              })
            ) : (
              <p>No upcoming events in the next 4 weeks.</p>
            )}
          </section>
        </div>
      </div>

      {newsletterData && <Newsletter data={newsletterData} />}
      <CommunityCTA />
    </main>
  );
}