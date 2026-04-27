'use client'; // Required for useState in Next.js App Router

import { useState, useEffect } from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }

    // Cleanup function: ensures scrolling is restored if the 
    // component unmounts unexpectedly
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.wrap}`}>
        <Link href="/" className={styles.logo}>
          Lightworker
        </Link>
        
        {/* The button toggles the state on click */}
        <button 
          className={`${styles.menuTrigger} ${isOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={styles.menuText}>
            {isOpen ? 'Close' : 'Menu'}
          </span>
          
          <div className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Example Overlay Menu (Shows when isOpen is true) */}
      <div className={`${styles.fullMenu} ${isOpen ? styles.menuVisible : ''}`}>
         {/* Add your WordPress menu links here */}
         <Link href="/about" onClick={toggleMenu}>About</Link>
         <Link href="/visit" onClick={toggleMenu}>Visit</Link>
      </div>
    </nav>
  );
};

export default Navigation;