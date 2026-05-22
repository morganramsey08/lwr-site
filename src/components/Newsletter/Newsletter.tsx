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

    // Pack the data into FormData exactly how Contact Form 7 expects it
    const formData = new FormData();
    formData.append('_wpcf7', '375');
    formData.append('_wpcf7_unit_tag', 'wpcf7-f375-o1');
    formData.append('your-email', email);

    try {
      const response = await fetch('https://admin.lightworkerranch.com/wp-json/contact-form-7/v1/contact-forms/375/feedback', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      // Verify that the server processing status evaluates to an absolute success
      if (response.ok && result.status === 'mail_sent') {
        setStatus('success');
        setEmail('');
      } else {
        console.error("Contact Form 7 newsletter submission error:", result);
        setStatus('error');
      }
    } catch (err) {
      console.error("Newsletter submission network error:", err);
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
          {status === 'error' && <p className={styles.errorMessage} style={{ color: '#ff4d4d', marginTop: '1rem' }}>Something went wrong. Please try again.</p>}
        </div>
      </div>
    </section>
  );
}