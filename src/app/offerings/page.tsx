import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { EventsPageQuery } from "@/queries/general/getEventsPage";
import { GetNewsletterSettings } from "@/queries/general/getNewsletter"; // Added import
import Hero from "@/components/Hero/Hero";
import EventCard from "@/components/Events/EventCard";
import EventsCalendar from "@/components/Events/EventCalendar";
import Newsletter from "@/components/Newsletter/Newsletter"; // Added import
import styles from "./Events.module.scss";
import CommunityCTA from "@/components/CommunityCTA/CommunityCTA";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function EventsPage() {

  function getQueryString(query: any): string {
    if (typeof query === 'string') return query;
    return query?.loc?.source?.body || "";
  }

  // 1. Fetch Events Page Content
  const data = await fetchGraphQL(getQueryString(EventsPageQuery), {
    id: "97", 
    idType: "DATABASE_ID"
  });

  // 2. Fetch Newsletter/Community Settings from Options Page
  let newsletterData = null;
  try {
    const newsletterRes = await fetchGraphQL(GetNewsletterSettings);
    // Map from page instead of acfOptionsPage (matching homepage logic)
    newsletterData = newsletterRes?.page?.globalSettings;
  } catch (error) {
    console.error("Newsletter query failed on Events page:", error);
  }

  const page = data?.page;
  const events = data?.events?.nodes || [];
console.log("Events data passed to calendar:", JSON.stringify(events, null, 2));
  return (
    <main>
      <Hero 
        title={page?.title || "Upcoming Events"}
        subtitle="Explore our upcoming sessions, workshops, and gatherings."
        bgImage={page?.featuredImage?.node?.sourceUrl}
        buttonText={page?.homePage?.heroButtonText || ""} 
        buttonLink={page?.homePage?.heroButtonUrl || "#"}
        isShort
        bgPosition="center"
      />
      
      <div className="container">
        {/* DYNAMIC HEADER SECTION */}
        <div className={styles.pageHeader}>
        </div>

        <div className={styles.eventsLayout}>
          {/* Child 1: Calendar */}
          <div className={styles.calendarContainer}>
            <EventsCalendar events={events}  />
          </div>

          {/* Child 2: Sidebar List */}
          <section className={styles.upcomingSection}>
            <h3>Upcoming Offerings</h3>
            {events.map((event: any, index: number) => (
              <EventCard 
                key={event.id || index} 
                event={event} 
              />
            ))}
          </section>
        </div>
      </div>

      {/* Renders dynamic email and WhatsApp invitations from WordPress settings */}
      {newsletterData && <Newsletter data={newsletterData} />}
            
      <CommunityCTA />
    </main>
  );
}