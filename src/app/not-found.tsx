import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ 
      backgroundColor: '#f9f7f2', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      color: '#2d3e2f',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '300' }}>404 - Page Not Found</h1>
      <p style={{ marginTop: '10px', opacity: 0.8 }}>
        We couldn't find the sanctuary page you were looking for.
      </p>
      <Link href="/" style={{ 
        marginTop: '30px', 
        color: '#4caf50', 
        textDecoration: 'underline',
        fontSize: '1rem' 
      }}>
        Return to Lightworker Ranch
      </Link>
    </main>
  );
}