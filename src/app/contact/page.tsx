'use client';

import React, { useState } from 'react';
import Hero from "@/components/Hero/Hero";
import s from "./Contact.module.scss";
// Import the Lucide Icons
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const CONTACT_CONTENT = {
  hero: {
    title: "Contact Us",
    subtitle: "Reach out to us with any questions about our retreat, sessions, or events. We're here to support your journey.",
    bgImage: "https://admin.lightworkerranch.com/wp-content/uploads/2026/05/IMG_1171.jpg"
  },
  formSection: {
    title: "Send us a Message",
    subtitle: "Fill out the form below and our team will get back to you shortly."
  },
  infoSection: {
    title: "Get in Touch",
    subtitle: "We look forward to connecting with you in person.",
    items: [
      {
        icon: MapPin, // Pass the component reference directly
        label: "Location",
        line1: "898 County Road 1260",
        line2: "Quitman, Texas 75783"
      },
      {
        icon: Phone,
        label: "Phone",
        line1: "(903) 638-4087"
      },
      {
        icon: Mail,
        label: "Email",
        line1: "dani@lightworkerranch.com"
      },
      {
        icon: Clock,
        label: "Hours",
        line1: "Hours Fluctuate - see calendar for current offerings",
        line2: "Closed on Sundays"
      }
    ]
  },
  map: {
    address: "898 County Road 1260, Quitman, Texas 75783"
  }
};

export default function ContactPage() {
  const c = CONTACT_CONTENT;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Correct URL encoding template syntax
  const addressMap = `898 County Road 1260, Quitman, Texas 75783`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressMap)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://admin.lightworkerranch.com/wp-json/contact-form-7/v1/contact-forms/YOUR_FORM_ID/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'your-name': name,
          'your-email': email,
          'your-subject': subject,
          'your-message': message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form transmission error:", error);
      setStatus('error');
    }
  };

  return (
    <div className={s.pageWrapper}>
      <Hero 
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        bgImage={c.hero.bgImage}
        isShort
      />

      <div className={s.contentContainer}>
        <div className={s.splitLayout}>
          
          {/* Left Column: Form */}
          <div>
            <h2 className={s.sectionTitle}>{c.formSection.title}</h2>
            <p className={s.sectionSubtitle}>{c.formSection.subtitle}</p>
            
            <form onSubmit={handleSubmit} className={s.contactForm}>
              <div className={s.formGroup}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="How can we help?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required 
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required 
                />
              </div>

              <button 
                type="submit" 
                className={s.submitButton}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className={s.successMessage}>
                  ✨ Thank you! Your message has been safely sent through the light waves.
                </div>
              )}
              {status === 'error' && (
                <div className={s.errorMessage}>
                  ❌ Something went wrong while transmitting. Please try again directly via email.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Contact Info using Lucide */}
          <div>
            <h2 className={s.sectionTitle}>{c.infoSection.title}</h2>
            <p className={s.sectionSubtitle}>{c.infoSection.subtitle}</p>

            <div className={s.infoList}>
              {c.infoSection.items.map((item, i) => {
                const IconComponent = item.icon; // Assign to uppercase identifier for JSX rendering
                return (
                  <div key={i} className={s.infoItem}>
                    <div className={s.iconWrapper}>
                      <IconComponent size={20} strokeWidth={2} />
                    </div>
                    <div className={s.infoContent}>
                      <h4>{item.label}</h4>
                      <p>{item.line1}</p>
                      {item.line2 && <p>{item.line2}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 3. Embedded Map */}
        <div className={s.mapContainer}>
          <iframe
            title="LightWorker Ranch Map Location"
            src={mapUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
}