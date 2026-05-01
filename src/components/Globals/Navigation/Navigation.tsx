'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';

const Navigation = ({ menuItems }: { menuItems: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    // Add the scrolled class dynamically
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.wrap}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          Lightworker
        </Link>
        
        <button 
          className={`${styles.menuTrigger} ${isOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
        >
          <span className={styles.menuText}>{isOpen ? 'Close' : 'Menu'}</span>
          <div className={styles.hamburger}>
            <span></span><span></span><span></span>
          </div>
        </button>
      </div>

      <div className={`${styles.fullMenu} ${isOpen ? styles.menuVisible : ''}`}>
        <div className={styles.menuLinks}>
          {menuItems.map((item) => (
            <Link key={item.id} href={item.uri} onClick={toggleMenu} className={styles.menuLink}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;