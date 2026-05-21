"use client";
import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './CommunityCTA.module.scss';

// Variables for quick access
const TITLE = "Join Our WhatsApp Community";
const DESCRIPTION = "LightWorkers! This community is for class reminders, cancelations, and prayer requests.";
const BUTTON_TEXT = "Join WhatsApp Group";
const WHATSAPP_LINK = "https://chat.whatsapp.com/JnZYHFGlCUABogDbEXDpZG?mode=gi_t"; 

export default function CommunityCTA() {
  return (
    <section className={styles.ctaWrapper}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.iconCircle}>
            <MessageCircle size={32} color="white" strokeWidth={1.5} />
          </div>
          
          <h2 className={styles.title}>{TITLE}</h2>
          
          <p className={styles.description}>
            {DESCRIPTION}
          </p>
          
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.ctaButton}
          >
            {BUTTON_TEXT}
          </a>
        </div>
      </div>
    </section>
  );
}