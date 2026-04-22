import React from 'react';

export default function Page() {
  return (
    <main style={{ 
      backgroundColor: '#f9f7f2', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      color: '#2d3e2f' 
    }}>
      {/* This is a temporary "Hero" to get you live */}
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '300', 
          letterSpacing: '-1px',
          marginBottom: '10px' 
        }}>
          Wellness Immersed in Nature
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Lightworker Ranch | East Texas Sanctuary
        </p>
      </div>

      <div style={{ marginTop: '40px', fontSize: '0.9rem', color: '#888' }}>
        Site Connection: <span style={{ color: '#4caf50' }}>● Live</span>
      </div>
    </main>
  );
}