import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { EventsPageQuery } from "@/queries/general/getEventsPage";
import Hero from "@/components/Hero/Hero";
import EventCard from "@/components/Events/EventCard";
import EventsCalendar from "@/components/Events/EventCalendar";
import styles from "./Events.module.scss";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function EventsPage() {

  function getQueryString(query: any): string {
    if (typeof query === 'string') return query;
    return query?.loc?.source?.body || "";
  }

  const data = await fetchGraphQL(getQueryString(EventsPageQuery), {
    id: "35", 
    idType: "DATABASE_ID"
  });

  const page = data?.page;
  const events = data?.events?.nodes || [];

  return (
    <main>
      <Hero 
        title={page?.homePage?.heroTitle || "Upcoming Events"}
        subtitle={page?.homePage?.heroSubTitle}
        bgImage={page?.featuredImage?.node?.sourceUrl}
        buttonText={page?.homePage?.heroButtonText || ""} 
        buttonLink={page?.homePage?.heroButtonUrl || "#"}
      />
      
      <div className="container">
        {/* DYNAMIC HEADER SECTION */}
        <div className={styles.pageHeader}>
          <h1>{page?.title || "Event Calendar"}</h1>
          {page?.content && (
            <div 
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: page.content }} 
            />
          )}
        </div>

        <div className={styles.eventsLayout}>
          {/* Child 1: Calendar */}
          <div className={styles.calendarContainer}>
            <EventsCalendar events={events} />
          </div>

          {/* Child 2: Sidebar List */}
          <section className={styles.upcomingSection}>
            <h3>Upcoming Events</h3>
            {events.map((event: any, index: number) => (
              <EventCard 
                key={event.id || index} 
                event={event} 
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}