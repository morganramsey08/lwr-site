"use client";
import React from 'react';
import { Clock, Users, Leaf, Heart, Flower2 } from 'lucide-react';
import styles from './EventCard.module.scss';

export default function EventCard({ event }: { event: any }) {
  const { title, eventDetails } = event;

  // Simple logic to vary icons based on event title
  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('meditation')) return <Leaf size={24} color="white" fill="white" />;
    if (lowerTitle.includes('healing')) return <Heart size={24} color="white" fill="white" />;
    return <Flower2 size={24} color="white" fill="white" />;
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconCircle}>
        {getIcon(title)}
      </div>

      <div className={styles.content}>
        <div className={styles.cardHeader}>
          <h4>{title}</h4>
          <span className={styles.date}>{eventDetails.eventDate}</span>
        </div>

        <p className={styles.description}>{eventDetails.shortDescription}</p>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <Clock size={16} />
            <span>{eventDetails.startTime} - {eventDetails.endTime}</span>
          </div>
          <div className={styles.metaItem}>
            <Users size={16} />
            <span>12 spots available</span>
          </div>
        </div>
      </div>
    </div>
  );
}