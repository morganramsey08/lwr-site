'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Info } from 'lucide-react';
import s from './register.module.scss';

export default function EventRegisterPage() {
  const { slug } = useParams();
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/register-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, ...formData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      // If the backend generated a Valor PayNow URL, redirect the user instantly!
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      // If it's a free event, show the standard success screen
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <div className={s.pageWrapper}>
      <div className={s.formContainer}>
        <Link href={`/offerings/${slug}`} className={s.backLink}>
          <ChevronLeft size={16} /> Back to Event Details
        </Link>
        
        <h1>Register for Event</h1>
        
        {status === 'success' ? (
          <div className={s.successBox}>
            <h3>You're Registered!</h3>
            <p>Thank you, {formData.name}. We've saved your spot and recorded your registration.</p>
            <Link href="/offerings" className={s.primaryBtn}>Return to Offerings</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={s.registerForm}>
            <div className={s.fieldGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="Jane Doe"
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              />
            </div>
            <div className={s.fieldGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="jane@example.com"
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              />
            </div>
            <div className={s.fieldGroup}>
              <label>Phone Number (Optional)</label>
              <input 
                type="tel" 
                placeholder="(555) 000-0000"
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              />
            </div>

            {/* Disclosure Note for Card Fee */}
            <div className={s.feeNotice}>
              <Info size={16} />
              <span>Note: Online card registrations include a 4% processing surcharge.</span>
            </div>

            {status === 'error' && <p className={s.errorText}>{errorMessage}</p>}
            
            <button type="submit" disabled={status === 'submitting'} className={s.submitBtn}>
              {status === 'submitting' ? 'Securing your spot...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}