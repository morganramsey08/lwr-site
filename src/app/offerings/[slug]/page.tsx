import React from 'react';
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GetSingleEventQuery } from "@/queries/general/getSingleEvent";
import Hero from "@/components/Hero/Hero";
import Link from "next/link";
import s from "./eventSingle.module.scss";

import { ChevronLeft, Calendar, MapPin, Plus, Award, Heart, Leaf, Users, Ticket } from 'lucide-react';

interface PageParams {
  params: Promise<{ slug: string; }>;
}

interface CalendarEvent {
  eventDetails: {
    eventDate: string;
    startTime?: string | null;
    locationName?: string;
    facilitatorName?: string;
    capacityText?: string;
    price?: string;
    shortDescription?: string;
    eventCategory?: string;
    bringItems?: string;
    isSpecialEvent?: boolean; 
  };
  registrantsData?: {
    registrantsData?: string;
  };
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function SingleEventPage({ params }: PageParams) {
  const { slug } = await params;
  const response = await fetchGraphQL(GetSingleEventQuery, { id: slug });
  const event = response?.event;

  if (!event) {
    return (
      <div className={s.pageWrapper} style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Offerings entry not found</h2>
        <Link href="/offerings" className={s.backLink} style={{ marginTop: '20px' }}>
          <ChevronLeft size={16} /> Back to Offerings Calendar
        </Link>
      </div>
    );
  }

  const { title, content, featuredImage, eventDetails } = event;

  // ==========================================
  // CAPACITY & REGISTRANT MATH
  // ==========================================
  const rawJson = event.registrantsData?.registrantsData;
  let registeredCount = 0;
  
  if (rawJson) {
    try {
      const parsedArray = JSON.parse(rawJson);
      registeredCount = Array.isArray(parsedArray) ? parsedArray.length : 0;
    } catch(e) {
      console.error("Failed to parse registrants on single event page:", e);
    }
  }

  const capacityStr = eventDetails?.capacityText;
  let maxCapacity = NaN;
  let spotsRemaining = 0;
  let isFull = false;

  if (capacityStr) {
    maxCapacity = parseInt(capacityStr, 10);
    if (!isNaN(maxCapacity)) {
      spotsRemaining = Math.max(0, maxCapacity - registeredCount);
      isFull = spotsRemaining === 0;
    }
  }

  // ==========================================
  // GENERAL DATA FORMATTING
  // ==========================================
  const bringText = eventDetails?.bringItems || "";
  const dynamicItems = bringText.split('\n').filter((item: string) => item.trim() !== "");
  const defaultList = ["Comfortable clothing", "A reusable water bottle", "Journal (optional)", "An open heart"];
  const itemsList = dynamicItems.length > 0 ? dynamicItems : defaultList;

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "Date Pending";
    const [datePart] = dateString.split('T'); 
    const [year, month, day] = datePart.split('-');
    const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
    return date.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const dateStr = formatDisplayDate(eventDetails?.eventDate);
  const timeStr = eventDetails?.startTime || "Time Pending";
  const locationStr = eventDetails?.locationName || "";
  const facilitatorName = eventDetails?.facilitatorName || "";
  const priceVal = eventDetails?.price || ""; 
  const heroBackground = featuredImage?.node?.sourceUrl || "/img/homepage-hero.jpg";
  const plainTextDescription = eventDetails?.shortDescription ? eventDetails.shortDescription.replace(/<[^>]*>/g, '') : "Join us in our garden sanctuary for a transformative experience.";
  const isSpecial = eventDetails?.isSpecialEvent === true || eventDetails?.isSpecialEvent === "1";

  const categoryMap: Record<string, { label: string; icon: React.ReactNode }> = {
    meditation: { label: "Meditation & Mindfulness", icon: <Leaf size={18} className={s.icon} /> },
    healing: { label: "Healing Sessions", icon: <Heart size={18} className={s.icon} /> },
    yoga: { label: "Yoga & Movement", icon: <Leaf size={18} className={s.icon} /> },
    workshops: { label: "Workshops", icon: <Award size={18} className={s.icon} /> }
  };

  const selectedCategory = categoryMap[eventDetails?.eventCategory] || { label: "Special Offering", icon: <Award size={18} className={s.icon} /> };

  const generateIcsAction = async () => {
    'use server';
    const cleanTitle = title.replace(/,/g, '\\,');
    const cleanDesc = plainTextDescription.replace(/,/g, '\\,');
    let normalizedDate = "20260101";
    if (eventDetails?.eventDate) {
      normalizedDate = eventDetails.eventDate.split('T')[0].replace(/-/g, '');
    }
    const icsContent = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Living Water Retreat//NONSGML Offering//EN", "BEGIN:VEVENT",
      `SUMMARY:${cleanTitle}`, `DESCRIPTION:${cleanDesc}`, `LOCATION:${locationStr}`,
      `DTSTART:${normalizedDate}T070000`, `DTEND:${normalizedDate}T080000`, "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  const icsDownloadUrl = await generateIcsAction();

  return (
    <div className={s.pageWrapper}>
      <Hero title={title} subtitle={`${dateStr} | ${timeStr} | ${locationStr}`} bgImage={heroBackground} isShort />
      <div className={s.contentContainer}>
        <Link href="/offerings" className={s.backLink}>
          <ChevronLeft size={16} /> Back to Calendar
        </Link>
        <div className={s.splitLayout}>
          <main className={s.mainArticle}>
            <h2>About this Session</h2>
            {eventDetails?.shortDescription ? (
              <div className={s.richContent} dangerouslySetInnerHTML={{ __html: eventDetails.shortDescription }} />
            ) : content ? (
              <div className={s.richContent} dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className={s.richContent}><p>Join us for this special gathering.</p></div>
            )}
            <div className={s.facilitatorBox}>
              <div className={s.avatarWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#dca565', color: 'white', fontWeight: 700 }}>
                {facilitatorName.charAt(0)}
              </div>
              <div className={s.facilitatorMeta}>
                <span>Facilitator</span>
                <h4>{facilitatorName}</h4>
              </div>
            </div>
            <section className={s.bringSection}>
              <h3>What to bring</h3>
              <div className={s.bringGrid}>
                {itemsList.map((item: string, idx: number) => (
                  <div key={idx} className={s.bringItem}>
                    <div className={s.bullet} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </main>
          <aside>
            <div className={s.sidebarCard}>
              <div className={s.investmentRow}>
                {capacityStr && (
                  <span className={s.spotsBadge}>
                    <Users size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {capacityStr} {!isNaN(maxCapacity) && <span>({spotsRemaining} spots left)</span>}
                  </span>
                )}
                <div className={s.priceContainer}>
                  <span className={s.amount}>{priceVal}</span>
                  <span className={s.suffix}>/ person</span>
                </div>
              </div>
              <div className={s.detailsList}>
                <div className={s.detailRowItem}>{selectedCategory.icon}<span>{selectedCategory.label}</span></div>
                <div className={s.detailRowItem}><Calendar className={s.icon} size={18} /><span>{dateStr} · {timeStr}</span></div>
                <div className={s.detailRowItem}><MapPin className={s.icon} size={18} /><span>{locationStr}</span></div>
              </div>

              {/* Conditional Registration Button for Special Events */}
              {isSpecial && (
                isFull ? (
                  <span 
                    className={s.registerActionBtn} 
                    style={{ opacity: 0.6, cursor: 'not-allowed', backgroundColor: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Ticket size={18} /> Event Full
                  </span>
                ) : (
                  <Link href={`/offerings/${slug}/register`} className={s.registerActionBtn}>
                    <Ticket size={18} /> Register for Event
                  </Link>
                )
              )}

              <a href={icsDownloadUrl} download={`${slug}-event.ics`} className={s.calendarButton}>
                <Plus size={18} /> Add to Calendar
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}