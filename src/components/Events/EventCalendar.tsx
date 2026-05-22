"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

import styles from "./EventCalendar.module.scss";

interface CalendarEvent {
  id: string;
  title: string;
  slug: string;
  eventDetails: {
    eventDate: string;
    startTime?: string | null;
    endTime?: string | null;
    repeatType?: any;
    repeatUntil?: string;
  };
}

interface EventsCalendarProps {
  events: CalendarEvent[];
}

// 1. Memoized inner calendar component to prevent unnecessary re-renders
const CalendarRenderer = React.memo(({ 
  calendarRef, 
  events, 
  onDatesSet 
}: { 
  calendarRef: React.RefObject<FullCalendar>, 
  events: EventInput[], 
  onDatesSet: (arg: any) => void 
}) => (
  <FullCalendar
    ref={calendarRef}
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    events={events}
    headerToolbar={false}
    datesSet={onDatesSet}
    eventTimeFormat={{
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    }}
    displayEventTime={true}
    eventDisplay="block"
    dayMaxEvents={false}
  />
));

CalendarRenderer.displayName = 'CalendarRenderer';

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");

  // 2. Memoize events to maintain a stable reference
  const formattedEvents = useMemo(() => (events || []).map((event) => {
    const details = event.eventDetails;
    const startDateStr = details.eventDate.split('T')[0];
    return {
      id: event.id,
      title: event.title,
      url: `/offerings/${event.slug}`,
      allDay: !details.startTime,
      start: startDateStr,
      end: startDateStr,
    };
  }), [events]);

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.customHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.navigationButtons}>
            <button className={styles.navBtn} onClick={() => calendarRef.current?.getApi().prev()}>&lt;</button>
            <button className={styles.navBtn} onClick={() => calendarRef.current?.getApi().next()}>&gt;</button>
          </div>
          <h2 className={styles.monthTitle}>{currentTitle}</h2>
        </div>
        <div className={styles.viewSwitcher}>
          {['dayGridMonth', 'timeGridWeek', 'timeGridDay'].map((view) => (
            <button 
              key={view}
              className={currentView === view ? styles.active : ''} 
              onClick={() => {
                calendarRef.current?.getApi().changeView(view);
                setCurrentView(view);
              }}
            >
              {view.replace('dayGrid', '').replace('timeGrid', '')}
            </button>
          ))}
        </div>
      </div>

      <CalendarRenderer 
        calendarRef={calendarRef}
        events={formattedEvents}
        onDatesSet={(arg) => setCurrentTitle(arg.view.title)}
      />
    </div>
  );
}