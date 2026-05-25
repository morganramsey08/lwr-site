"use client";
import React from 'react';
import { Clock, Users, Leaf, Heart, Flower2 } from 'lucide-react';
import styles from './EventCard.module.scss';
import Link from 'next/link';

export default function EventCard({ event }: { event: any }) {
  const { title, eventDetails } = event;

  // Simple logic to vary icons based on event title
  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('meditation')) return <Leaf size={24} color="white" fill="white" />;
    if (lowerTitle.includes('healing')) return <Heart size={24} color="white" fill="white" />;
    return <Flower2 size={24} color="white" fill="white" />;
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "Date Pending";
    
    // 1. Split string to get just YYYY-MM-DD
    const [datePart] = dateString.split('T'); 
    const [year, month, day] = datePart.split('-');

    // 2. Create the date using UTC to ensure it never shifts
    const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));

    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Safely check if the event is repeating
  const rawRepeat = Array.isArray(eventDetails?.repeatType) 
    ? eventDetails.repeatType[0] 
    : eventDetails?.repeatType;
  const isRepeating = rawRepeat && rawRepeat.toLowerCase() !== "none";

  return (
    <Link href={`/offerings/${event.slug}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          {getIcon(title)}
        </div>

        <div className={styles.content}>
          <div className={styles.cardHeader}>
            <div className={styles.titleWrapper}>
              <h4>{title}</h4>
              {isRepeating && (
                <span className={styles.repeatBadge}>Weekly</span>
              )}
            </div>
            <span className={styles.date}>
              {formatDisplayDate(eventDetails?.eventDate)}
            </span>
          </div>

          {eventDetails?.shortDescription && (
            <p 
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: eventDetails.shortDescription }}
            />
          )}

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>
                {eventDetails?.startTime || "Time Pending"}
              </span>
            </div>
            {eventDetails?.capacityText && (
              <div className={styles.metaItem}>
                <Users size={16} />
                <span>{eventDetails.capacityText}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}