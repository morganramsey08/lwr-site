import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { EventsPageQuery } from "@/queries/general/getEventsPage";
import { GetNewsletterSettings } from "@/queries/general/getNewsletter";
import Hero from "@/components/Hero/Hero";
import EventCard from "@/components/Events/EventCard";
import EventsCalendar from "@/components/Events/EventCalendar";
import Newsletter from "@/components/Newsletter/Newsletter";
import styles from "./Events.module.scss";
import CommunityCTA from "@/components/CommunityCTA/CommunityCTA";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

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

  // --- Calculate Next Instances & 4-Week Window ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate day comparison
  
  const fourWeeksFromNow = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000);

  const processedEvents = rawEvents.reduce((acc: any[], event: any) => {
    const details = event.eventDetails;
    const startDate = parseWPDate(details.eventDate);
    
    const rawRepeat = Array.isArray(details.repeatType) ? details.repeatType[0] : details.repeatType;
    const isRepeating = rawRepeat && rawRepeat.toLowerCase() !== "none";

    if (!isRepeating) {
      // For single events, check if they fall in our 4-week window
      if (startDate >= today && startDate <= fourWeeksFromNow) {
        acc.push({ ...event, displayDate: details.eventDate });
      }
    } else {
      // For repeating events, find the NEXT valid occurrence
      const endDate = details.repeatUntil ? parseWPDate(details.repeatUntil) : new Date('2099-01-01');
      
      if (endDate >= today) {
        let nextDate = new Date(startDate);
        
        while (nextDate < today && nextDate <= endDate) {
          nextDate.setDate(nextDate.getDate() + 7);
        }

        if (nextDate >= today && nextDate <= fourWeeksFromNow && nextDate <= endDate) {
          const displayDateStr = nextDate.toISOString().split('T')[0];
          acc.push({ ...event, displayDate: displayDateStr });
        }
      }
    }
    return acc;
  }, []);

  // Sort chronologically based on the newly calculated display dates
  const sortedUpcomingEvents = processedEvents.sort((a, b) => {
    const timeToMinutes = (timeStr?: string) => {
      if (!timeStr) return 0;
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier?.toLowerCase() === 'pm' && hours !== 12) hours += 12;
      if (modifier?.toLowerCase() === 'am' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const dateA = parseWPDate(a.displayDate).getTime() + (timeToMinutes(a.eventDetails?.startTime) * 60000);
    const dateB = parseWPDate(b.displayDate).getTime() + (timeToMinutes(b.eventDetails?.startTime) * 60000);

    return dateA - dateB;
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
            {/* Full calendar view */}
            <EventsCalendar events={rawEvents} />
          </div>

          <section className={styles.upcomingSection}>
            {/* SPECIAL EVENTS CALLOUT BANNER */}
            <div className={styles.specialEventsCta}>
              <div className={styles.ctaHeader}>
                <Sparkles className={styles.sparkleIcon} size={20} />
                <span>Featured Experiences</span>
              </div>
              <h4>Looking for Special Events & Workshops?</h4>
              <p>Explore our upcoming sound journeys, special workshops, and guest practitioner sessions with online registration.</p>
              <Link href="/special-events" className={styles.ctaButton}>
                <span>View Special Events</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <h3>Upcoming Offerings</h3>
            {sortedUpcomingEvents.length > 0 ? (
              sortedUpcomingEvents.map((event: any, index: number) => {
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