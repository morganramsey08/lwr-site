'use client';

import { useState } from 'react';
import styles from './Newsletter.module.scss';

interface NewsletterProps {
  data: {
    newsletterTitle?: string;
    newsletterSubtitle?: string;
    newsletterButtonText?: string;
    newsletterBackground?: { node: { sourceUrl: string } };
  };
}

export default function Newsletter({ data }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Here you would connect to your provider (Mailchimp, ConvertKit, etc.)
    // via a Next.js API route
    try {
      // const res = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section 
      className={styles.newsletter} 
      style={{backgroundImage: `url(${data?.newsletterBackground?.node?.sourceUrl})`}}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h2 className={styles.title}>{data?.newsletterTitle || 'Ignite Your Light'}</h2>
          <p className={styles.subtitle}>{data?.newsletterSubtitle}</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : (data?.newsletterButtonText || 'Subscribe')}
            </button>
          </form>
          
          {status === 'success' && <p className={styles.message}>Thank you for joining our community!</p>}
        </div>
      </div>
    </section>
  );
}