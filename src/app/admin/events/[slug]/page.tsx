import { fetchGraphQL } from "@/utils/fetchGraphQL";
import Link from "next/link";
import { ChevronLeft, Users } from "lucide-react";
import s from "./admin.module.scss";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminEventRegistrantsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Query using registrantsData on type RegistrantsData
  const data = await fetchGraphQL(
    `
    query GetRegistrants($id: ID!) {
      event(id: $id, idType: SLUG) {
        title
        registrantsData {
          registrantsData
        }
      }
    }
  `,
    { id: slug }
  );

  const event = data?.event;

  if (!event) {
    return (
      <div className={s.pageWrapper}>
        <div className={s.container}>
          <h1>Event Not Found</h1>
          <p>We couldn't find an event with the slug: {slug}</p>
        </div>
      </div>
    );
  }

  // Extract raw JSON string from registrantsData wrapper
  const rawJson = event.registrantsData?.registrantsData;

  let registrants: Array<{
    name: string;
    email: string;
    phone?: string;
    registeredAt?: string;
  }> = [];

  if (rawJson) {
    try {
      registrants = JSON.parse(rawJson);
    } catch (e) {
      console.error("Failed to parse registrants JSON", e);
    }
  }

  return (
    <div className={s.pageWrapper}>
      <div className={s.container}>
        <Link href="/admin/events" className={s.backLink}>
          <ChevronLeft size={16} /> Back to Special Events
        </Link>

        <header className={s.header}>
          <div>
            <span className={s.adminLabel}>Admin View</span>
            <h1>{event.title}</h1>
          </div>
          <div className={s.statsBadge}>
            <Users size={18} />
            <span>{registrants.length} Registered</span>
          </div>
        </header>

        <main className={s.tableContainer}>
          {registrants.length === 0 ? (
            <div className={s.emptyState}>
              <p>No one has registered for this event yet.</p>
            </div>
          ) : (
            <table className={s.registrantTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {registrants.map((person, index) => (
                  <tr key={index}>
                    <td className={s.nameCell}>{person.name}</td>
                    <td>
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    </td>
                    <td>{person.phone || "—"}</td>
                    <td className={s.dateCell}>
                      {person.registeredAt
                        ? new Date(person.registeredAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}