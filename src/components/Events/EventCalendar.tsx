"use client";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import styles from "./EventCalendar.module.scss";

interface CalendarEvent {
  id: string;
  title: string;
  slug: string;
  eventDetails: {
    eventDate: string;
    startTime?: string;
    endTime?: string;
    shortDescription?: string;
  };
}

interface EventsCalendarProps {
  events: CalendarEvent[];
}

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const formattedEvents = events?.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.eventDetails?.eventDate,
    url: `/events/${event.slug}`,
  }));

  const handleDatesSet = (arg: any) => {
    setCurrentTitle(arg.view.title);
  };

  const handleChangeView = (viewType: string) => {
    const api = calendarRef.current?.getApi();
    if (api) {
      api.changeView(viewType);
      setCurrentView(viewType);
    }
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.customHeader}>
        {/* Left Side: Navigation and Title */}
        <div className={styles.headerLeft}>
          <div className={styles.navigationButtons}>
            <button 
              className={styles.navBtn} 
              onClick={() => calendarRef.current?.getApi().prev()}
            >
              &lt;
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => calendarRef.current?.getApi().next()}
            >
              &gt;
            </button>
          </div>
          
          <h2 className={styles.monthTitle}>
            {currentTitle}
          </h2>
        </div>
        
        {/* Right Side: View Switcher */}
        <div className={styles.viewSwitcher}>
          <button 
            className={currentView === 'dayGridMonth' ? styles.active : ''} 
            onClick={() => handleChangeView('dayGridMonth')}
          >
            Month
          </button>
          <button 
            className={currentView === 'timeGridWeek' ? styles.active : ''} 
            onClick={() => handleChangeView('timeGridWeek')}
          >
            Week
          </button>
          <button 
            className={currentView === 'timeGridDay' ? styles.active : ''} 
            onClick={() => handleChangeView('timeGridDay')}
          >
            Day
          </button>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        events={formattedEvents}
        datesSet={handleDatesSet}
        height="auto"
        dayMaxEvents={true}
        eventDisplay="block"
      />
    </div>
  );
}