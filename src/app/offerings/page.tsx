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
  const events = data?.events?.nodes || [];

  // Helper to ensure we sort by consistent UTC dates
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.eventDetails.eventDate.includes('T') ? a.eventDetails.eventDate : `${a.eventDetails.eventDate}T00:00:00Z`).getTime();
    const dateB = new Date(b.eventDetails.eventDate.includes('T') ? b.eventDetails.eventDate : `${b.eventDetails.eventDate}T00:00:00Z`).getTime();
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
          {/* Child 1: Calendar - uses sorted events */}
          <div className={styles.calendarContainer}>
            <EventsCalendar events={sortedEvents} />
          </div>

          {/* Child 2: Sidebar List - uses sorted events */}
          <section className={styles.upcomingSection}>
            <h3>Upcoming Offerings</h3>
            {sortedEvents.map((event: any, index: number) => (
              <EventCard key={event.id || index} event={event} />
            ))}
          </section>
        </div>
      </div>

      {newsletterData && <Newsletter data={newsletterData} />}
      <CommunityCTA />
    </main>
  );
}