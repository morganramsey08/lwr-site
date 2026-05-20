import React from 'react';
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GetSingleEventQuery } from "@/queries/general/getSingleEvent";
import Hero from "@/components/Hero/Hero";
import Link from "next/link";
import s from "./eventSingle.module.scss";

// Lucide structural assets
import { ChevronLeft, Calendar, MapPin, Gift, Award, Heart, Leaf, Users, ShieldAlert } from 'lucide-react';

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function SingleEventPage({ params }: PageParams) {
  const { slug } = await params;

  // Retrieve data matching our verified WPGraphQL camelCase properties
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
  
  // Map out fallback variables directly from the clean GraphQL fields
  const dateStr = eventDetails?.eventDate || "Date Pending";
  const timeStr = eventDetails?.startTime && eventDetails?.endTime 
    ? `${eventDetails.startTime} - ${eventDetails.endTime}`
    : "Hours Pending";
  
  const locationStr = eventDetails?.locationName || "Garden Sanctuary";
  const facilitatorName = eventDetails?.facilitatorName || "Sarah Jenkins";
  const capacityStr = eventDetails?.capacityText || "12 spots available";
  const heroBackground = featuredImage?.node?.sourceUrl || "/img/homepage-hero.jpg";

  // Hardcode investment prices if not explicitly assigned in schema yet
  const priceVal = "$25"; 

  // Format short descriptions for use in rich metadata tags (strips HTML paragraph elements if returned from WYSIWYG)
  const plainTextDescription = eventDetails?.shortDescription 
    ? eventDetails.shortDescription.replace(/<[^>]*>/g, '') 
    : "Join us in our garden sanctuary for a transformative experience.";

  // Handle dynamic vector styling maps matching the category choices
  const categoryMap: Record<string, { label: string; icon: React.ReactNode }> = {
    meditation: { label: "Meditation & Mindfulness", icon: <Leaf size={18} className={s.icon} /> },
    healing: { label: "Healing Sessions", icon: <Heart size={18} className={s.icon} /> },
    yoga: { label: "Yoga & Movement", icon: <Leaf size={18} className={s.icon} /> },
    workshops: { label: "Workshops", icon: <Award size={18} className={s.icon} /> }
  };

  const selectedCategory = categoryMap[eventDetails?.eventCategory] || {
    label: "Special Offering",
    icon: <Award size={18} className={s.icon} />
  };

  // Safe split parsing for static list data grids
  const itemsList = [
    "Comfortable clothing",
    "A reusable water bottle",
    "Journal (optional)",
    "An open heart"
  ];

  // NATIVE DEVICE CALENDAR EXPORT LOGIC (.ics formatting)
  const generateIcsAction = async () => {
    'use server';
    const cleanTitle = title.replace(/,/g, '\\,');
    const cleanDesc = plainTextDescription.replace(/,/g, '\\,');
    
    // Sanitize dates to clean ICS string standard formats (YYYYMMDD)
    const normalizedDate = dateStr.split('/').reverse().join(''); 

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Living Water Retreat//NONSGML Offering//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${cleanTitle}`,
      `DESCRIPTION:${cleanDesc}`,
      `LOCATION:${locationStr}`,
      `DTSTART:${normalizedDate}T070000`, 
      `DTEND:${normalizedDate}T080000`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  const icsDownloadUrl = await generateIcsAction();

  return (
    <div className={s.pageWrapper}>
      {/* 1. Page Header Dynamic Hero Section */}
      <Hero 
        title={title}
        subtitle={`${dateStr} | ${timeStr} | ${locationStr}`}
        bgImage={heroBackground}
      />

      {/* 2. Content Layout Grid */}
      <div className={s.contentContainer}>
        
        <Link href="/offerings" className={s.backLink}>
          <ChevronLeft size={16} /> Back to Calendar
        </Link>

        <div className={s.splitLayout}>
          
          {/* Left Column: Rich Main Text Details */}
          <main className={s.mainArticle}>
            <h2>About this Session</h2>
            
            {eventDetails?.shortDescription ? (
              <div 
                className={s.richContent}
                dangerouslySetInnerHTML={{ __html: eventDetails.shortDescription }}
              />
            ) : content ? (
              <div 
                className={s.richContent}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className={s.richContent}>
                <p>Join us for this special gathering layout focused on grounding energy layouts and collective group mindfulness routines.</p>
              </div>
            )}

            {/* Facilitator Context Component Box */}
            <div className={s.facilitatorBox}>
              <div className={s.avatarWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#dca565', color: 'white', fontWeight: 700 }}>
                {facilitatorName.charAt(0)}
              </div>
              <div className={s.facilitatorMeta}>
                <span>Facilitator</span>
                <h4>{facilitatorName}</h4>
              </div>
            </div>

            {/* Preparation Checklists area */}
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

          {/* Right Column: Informational Sticky Cards */}
          <aside>
            <div className={s.sidebarCard}>
              
              {/* Investment price calculations display row */}
              <div className={s.investmentRow}>
                <span className={s.priceLabel}>Investment</span>
                <div className={s.priceContainer}>
                  <span className={s.amount}>{priceVal}</span>
                  <span className={s.suffix}>/ person</span>
                </div>
              </div>

              {/* Dynamic Capacity Badges */}
              <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                <span className={s.spotsBadge}>
                  <Users size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {capacityStr}
                </span>
              </div>

              {/* Hardcoded Informational Property Data Arrays */}
              <div className={s.detailsList}>
                <div className={s.detailRowItem}>
                  {selectedCategory.icon}
                  <span>{selectedCategory.label}</span>
                </div>
                <div className={s.detailRowItem}>
                  <Calendar className={s.icon} size={18} />
                  <span>{dateStr} · {eventDetails?.startTime || "7:00 AM"}</span>
                </div>
                <div className={s.detailRowItem}>
                  <MapPin className={s.icon} size={18} />
                  <span>{locationStr}</span>
                </div>
              </div>

              {/* Add to Native Smartphone Devices */}
              <a 
                href={icsDownloadUrl} 
                download={`${slug}-event.ics`}
                className={s.calendarButton}
              >
                <Gift size={18} /> Add to Calendar
              </a>

              {/* Membership Benefits Label Container */}
              <div className={s.memberNotice}>
                <span>🎁 Available for members at 20% off</span>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}