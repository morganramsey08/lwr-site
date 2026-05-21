"use client";
import React, { useRef, useState } from "react";
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
    startTime?: string;
    endTime?: string;
    shortDescription?: string;
    repeatType?: any;   // Changed to any temporarily to safely handle object/string variations
    repeatUntil?: string;  
  };
}

interface EventsCalendarProps {
  events: CalendarEvent[];
}

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const formattedEvents: EventInput[] = (events || []).flatMap((event) => {
    const details = event.eventDetails;
    
    const baseEventData = {
      id: event.id,
      title: event.title,
      url: `/offerings/${event.slug}`,
    };

    // Helper to safely strip timezone offsets and force local interpretation
    const getCleanLocalDate = (dateStr: string): Date | null => {
      if (!dateStr) return null;
      try {
        if (dateStr.includes('/')) {
          const [day, month, year] = dateStr.split('/');
          return new Date(`${year}-${month}-${day}T00:00:00`);
        }
        const absoluteDatePart = dateStr.split('T')[0]; 
        return new Date(`${absoluteDatePart}T00:00:00`);
      } catch (e) {
        return null;
      }
    };

    // Helper to format clean bound strings for FullCalendar's internal engines (YYYY-MM-DD)
    const formatRecurBound = (dateStr?: string) => {
      if (!dateStr) return undefined;
      if (dateStr.includes('/')) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
      }
      return dateStr.split('T')[0];
    };

    // Extract our clean timezone-agnostic date instance
    const localDateObj = details?.eventDate ? getCleanLocalDate(details.eventDate) : null;
    const dayOfWeekIndex = localDateObj ? localDateObj.getDay() : 0;

    // --- BULLETPROOF REPEAT TYPE EXTRACTION ---
    let normalizedRepeat = "";
    const rawRepeat = details?.repeatType;

    if (rawRepeat) {
      if (typeof rawRepeat === "string") {
        normalizedRepeat = rawRepeat.toLowerCase();
      } else if (Array.isArray(rawRepeat) && rawRepeat.length > 0) {
        // If it comes back as an array, grab the first element
        const firstItem = rawRepeat[0];
        normalizedRepeat = typeof firstItem === "string" 
          ? firstItem.toLowerCase() 
          : (firstItem?.value || "").toLowerCase();
      } else if (typeof rawRepeat === "object") {
        // If WPGraphQL returned it as a { value, label } choice object
        normalizedRepeat = (rawRepeat.value || rawRepeat.label || "").toLowerCase();
      }
    }

    // 1. WEEKLY RECURRENCE CALCULATIONS
    if (normalizedRepeat === "weekly") {
      const cleanStartBounds = details.eventDate.includes('/') 
        ? details.eventDate.split('/').reverse().join('-') 
        : details.eventDate.split('T')[0];

      return [
        {
          ...baseEventData,
          daysOfWeek: [dayOfWeekIndex], 
          startRecur: cleanStartBounds,
          endRecur: formatRecurBound(details?.repeatUntil),
        }
      ];
    }

    // 2. STANDARD SINGLE EVENT STRUCTURING
    let formattedSingleDate = details?.eventDate;
    if (details?.eventDate) {
      if (details.eventDate.includes('/')) {
        const [day, month, year] = details.eventDate.split('/');
        formattedSingleDate = `${year}-${month}-${day}T00:00:00`;
      } else {
        formattedSingleDate = `${details.eventDate.split('T')[0]}T00:00:00`;
      }
    }

    return [
      {
        ...baseEventData,
        start: formattedSingleDate,
      }
    ];
  });

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