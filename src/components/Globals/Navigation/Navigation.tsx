import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Lightworker Ranch
        </Link>
        
        <div className={styles.menuTrigger}>
          <span className={styles.menuText}>Menu</span>
          <div className={styles.hamburger}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;