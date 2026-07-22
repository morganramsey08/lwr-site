import { fetchGraphQL } from "@/utils/fetchGraphQL";
import Link from "next/link";
import { Calendar, ChevronRight, Ticket } from "lucide-react";
import s from "./admin.module.scss";

// Ensure this page always fetches fresh data and never caches an old list
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GET_ALL_ADMIN_EVENTS = `
  query GetAllAdminEvents {
    events(first: 100) {
      nodes {
        title
        slug
        eventDetails {
          eventDate
          isSpecialEvent
        }
      }
    }
  }
`;

export default async function AdminEventsIndexPage() {
  let events = [];

  try {
    const data = await fetchGraphQL(GET_ALL_ADMIN_EVENTS);
    events = data?.events?.nodes || [];
  } catch (error) {
    console.error("Error fetching admin events list:", error);
  }

  // 1. Filter to ONLY include special events
  const specialEvents = events.filter((event: any) => {
    return (
      event.eventDetails?.isSpecialEvent === true || 
      event.eventDetails?.isSpecialEvent === "1"
    );
  });

  // 2. Sort those special events so upcoming ones appear at the top
  const sortedEvents = [...specialEvents].sort((a, b) => {
    const dateA = new Date(a.eventDetails?.eventDate || "2099-01-01").getTime();
    const dateB = new Date(b.eventDetails?.eventDate || "2099-01-01").getTime();
    return dateA - dateB;
  });

  return (
    <div className={s.pageWrapper}>
      <div className={s.container}>
        <header className={s.header}>
          <div>
            <span className={s.adminLabel}>Admin Dashboard</span>
            <h1>Special Events Registrations</h1>
            <p>Select a special event below to view its registered attendees.</p>
          </div>
        </header>

        <main className={s.eventList}>
          {sortedEvents.length === 0 ? (
            <div className={s.emptyState}>
              <p>No special events with open registrations found.</p>
            </div>
          ) : (
            sortedEvents.map((event, idx) => {
              const eventDate = event.eventDetails?.eventDate 
                ? new Date(event.eventDetails.eventDate.split('T')[0]).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Date Pending";

              return (
                <Link 
                  href={`/admin/events/${event.slug}`} 
                  key={idx} 
                  className={s.eventRow}
                >
                  <div className={s.eventInfo}>
                    <h2>{event.title}</h2>
                    <div className={s.eventMeta}>
                      <span className={s.dateTag}>
                        <Calendar size={14} /> {eventDate}
                      </span>
                      <span className={s.specialTag}>
                        <Ticket size={14} /> Registration Open
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className={s.chevron} />
                </Link>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}