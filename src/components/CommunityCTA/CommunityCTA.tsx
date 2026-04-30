"use client";
import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './CommunityCTA.module.scss';

// Variables for quick access
const TITLE = "Join Our WhatsApp Community";
const DESCRIPTION = "Receive daily inspiration, weekly wellness reminders, and stay connected with our community of mindful souls.";
const BUTTON_TEXT = "Join WhatsApp Group";
const WHATSAPP_LINK = "#"; 

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